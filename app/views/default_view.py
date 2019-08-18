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


@app.route('/teste', methods=['POST'])
def teste():
    print("TESTE")
    form = UploadForm()
    return render_template('upload_template.html', form=form)


@app.route('/upload', methods=['GET', 'POST', 'DELETE'])
def upload():
    if request.method == "DELETE":
        print("DELETE")
        contacts = Contact()
        contacts.clearList()
    form = UploadForm()
    if form.validate_on_submit():
        if(form.file.data):
            filename = secure_filename(form.file.data.filename)
            form.file.data.save('app/uploads/' + filename)
            contacts = Contact()
            contacts.loadList(filename)
        else:
            code = 400
            msg = 'Arquivo vázio'
            return msg, code
        return redirect(url_for('upload'))
    return render_template('upload_template.html', form=form)

@app.route('/preemail', methods=['GET', 'POST'])
def preemail():
    form = UploadForm()
    if form.validate_on_submit():
        email = Contact()
        email.sendEmailWithoutQR(form.email.data, form.password.data)
        print("Entrou aq")
        return redirect(url_for('preemail'))
    return render_template('sendPreEmail_template.html', form=form)


@app.route('/email', methods=['GET', 'POST'])
def email():
    form = UploadForm()
    if form.validate_on_submit():
        email = Contact()
        email.generateInvit()
        email.sendEmail(form.email.data, form.password.data)
        return redirect(url_for('email'))
    return render_template('sendEmail_template.html', form=form)
