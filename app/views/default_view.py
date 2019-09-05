'''
########################################################
# Name Project: Attendance List                        #
# Developer Name: Mário Wessen                         #
# Contact: mrfwn@cin.ufpe.br                           #
# Date last Modify:  24/06/2019                        #
# Description File: This is Controller ,               #
# for access pages                                     #
########################################################
'''
from app import app
from flask import Flask, render_template, url_for, redirect, request
from flask_wtf import FlaskForm
from flask_wtf import Form
from werkzeug.utils import secure_filename
from flask_wtf.file import FileField
from wtforms import StringField, PasswordField
from app.services.contact_service import Contact
from flask import jsonify

class UploadForm(FlaskForm):
    email = StringField('Email')
    password = PasswordField('Senha')
    file = FileField()

@app.route("/index")
@app.route("/")
@app.route("/home")
def home():
    contacts = Contact()
    presence = contacts.countPresence()
    agencyCount = contacts.countAgence()
    return render_template('home_template.html', presence=presence, agencyCount=agencyCount, agencys=contacts.agencys)

@app.route('/upload', methods=['GET', 'POST', 'DELETE'])
def upload():
    alert = None
    contacts = Contact()
    obj = contacts.getListUser()
    if request.method == "DELETE":
        contacts = Contact()
        contacts.clearList()
    form = UploadForm()
    if form.validate_on_submit():
        my_id = request.form.get("my_id","")
        if my_id == "1":
            if(form.file.data):
                filename = secure_filename(form.file.data.filename)
                form.file.data.save('app/uploads/' + filename)
                contacts = Contact()
                contacts.loadList(filename)
                alert = True
            else:
                alert = False
                code = 400
                msg = 'Arquivo vázio'
                return msg, code
            #return redirect(url_for('upload'))
            return render_template('list_template.html',my_id=my_id, form=form,obj=obj,alert=alert)
        elif my_id == "2":
            email = Contact()
            contacts = Contact()
            #contacts.generateInvit()
            try:
              email.sendEmail()
              alert = True
            except:
              alert = False
            #return redirect(url_for('upload'))
            return render_template('list_template.html',my_id=my_id, form=form,obj=obj,alert=alert)
        elif my_id == "3":
            contacts = Contact()
            contacts.clearList()
            alert = True
            #return redirect(url_for('upload'))
            return render_template('list_template.html',my_id=my_id, form=form,obj=obj,alert=alert)
    return render_template('list_template.html', form=form,obj=obj,alert=alert)

@app.route('/lista', methods=['GET', 'POST'])
def lista():
    form = UploadForm()
    contacts = Contact()
    obj = contacts.getListUser()
    if form.validate_on_submit():
        email = Contact()
        contacts = Contact()
        contacts.generateInvit()
        email.sendEmail()
        return redirect(url_for('lista'))
    return render_template('list_template.html', form=form,obj=obj)

@app.route('/json', methods=['GET', 'POST'])
def json():
    contacts = Contact()
    obj = contacts.getListUser()
    return jsonify(obj)