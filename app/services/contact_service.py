'''
########################################################
# Name Project: Attendance List                        #
# Developer Name: Mário Wessen                         #
# Contact: mrfwn@cin.ufpe.br                           #
# Date last Modify:  24/06/2019                        #
# Description File:This is Class for manipuled         #
# Contacts. Methods for automation the system          #
########################################################
'''
import os
from openpyxl import load_workbook 
from app.services.database_service import Database
import qrcode
from qrcode.image.pure import PymagingImage
from PIL import Image ,ImageFont ,ImageDraw 
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
import base64

class Contact:
    UPLOAD_FOLDER = "./app/uploads/"
    BASE_FOLDER = "./app/uploads/imgbase/"
    INVITE_FOLDER = "./app/uploads/invites/"
    DBNAME = "contacts"
    db = None
    agencys = []
    def __init__(self):
        self.db = Database(self.DBNAME)
    
    #Methos for load List the contacts. OBS: Is necessary especific format in file.
    # [name,agency,email,telefone] 
    # The table in file don't have Title
    def loadList(self,fileName):
        fileName = self.UPLOAD_FOLDER + fileName
        listInstance = load_workbook(filename=fileName, read_only=True).active
        line = 1
        contacts = []
        while (listInstance.cell(row=line,column=1).value != None):
            contacts.append(
                {
                    "name":listInstance.cell(row=line,column=2).value, 
                    "agency":listInstance.cell(row=line,column=3).value, 
                    "email":listInstance.cell(row=line,column=4).value, 
                    "tel":listInstance.cell(row=line,column=5).value,
                    "status":0,
                    "regtype":1
                }
            )
            line += 1
        self.db.push_list_data(contacts)
    
    # This Method Generate Invites, is necessary set parameters for positioning images QR,base and Name
    def generateInvit(self):
        areaQR = (220,750)
        areaName = (240,700)
        font = ImageFont.truetype("arial.ttf",45)
        contacts = self.db.get_datas()
        for key in contacts:
            qrcodeImg = qrcode.make(key)
            baseImg = Image.open(self.BASE_FOLDER+'base_conv.png')
            colagem = ImageDraw.Draw(baseImg)
            colagem.text(areaName,contacts[key]['name'],font=font,fill='black')
            baseImg.paste(qrcodeImg,areaQR)
            baseImg.save(self.INVITE_FOLDER+contacts[key]['email']+".png")
    
    # This Method Send Email for any contacts OBS:is necessary generate Invite before
    def sendEmail(self,fromEmail,password):
        contacts = self.db.get_datas()
        for key in contacts:
            toEmail = contacts[key]['email']
            message = 'Olá '+ contacts[key]['name'] + ' gostaria de testar o envio dos convites, obrigado \n Ps:. Obrigado Pelo Teste \n'
            subject = 'Convite de ' + contacts[key]['name'] + ' para prêmio de Mídia' 
            msg = MIMEMultipart()
            msg['From'] = fromEmail
            msg['To'] = toEmail
            msg['Subject'] = subject
            nameImg = self.INVITE_FOLDER + toEmail +'.png' 
            msg.attach(MIMEImage(open(nameImg, 'rb').read(), name=os.path.basename(nameImg))) 
            msg.attach(MIMEText(message.encode('utf-8'), 'plain', 'utf-8'))            
            server = smtplib.SMTP("smtp.office365.com",587)
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(fromEmail,password)
            server.sendmail(fromEmail,toEmail,msg.as_string())
            server.close()
    
    def clearList(self):
        self.db.remove_all_data()

    def countPresence(self):
        presence ={
            'presence': 0,
            'fault': 0
        }
        if self.db.get_datas():
            contacts = self.db.get_datas()  
            for key in contacts:    
                if contacts[key]['status']==0:
                    presence['fault'] += 1
                else:
                    presence['presence'] += 1
        return presence

    def countAgence(self):
        agencyCount =[]
        if self.db.get_datas():
            contacts = self.db.get_datas()
            self.agencys = []
            agencysAll= []
            for key in contacts:
                agencysAll.append(contacts[key]['agency'])
                if contacts[key]['agency'] not in self.agencys:
                    self.agencys.append(contacts[key]['agency'])
            for agency in self.agencys:
                agencyCount.append(agencysAll.count(agency))
        return agencyCount
        





        