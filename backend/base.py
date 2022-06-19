import hashlib
from flask import Flask, render_template, render_template_string, request
from database.dbHelper import dbHelper
import json
from flask import Flask, jsonify
import random
import os

app = Flask(__name__)
db = dbHelper()

@app.route('/', methods=['GET'])
def index():
    words = db.test()
    response_body = {
        "name": "Kelly",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "conn": words,
        "status": db.db_status
    }
    return (response_body)  

# @app.route('/test', methods=['GET'])
# def tester():
#     words = db.test()
#     response_body = {
#         "name": "Kelly",
#         "about" :"Second Test",
#         "conn": words
#     }
#     return (response_body)  

# @app.route('/register', methods=['POST', 'GET'])
# def register():
#     salt = os.urandom(32)
#     input_username = request.args.get('username')
#     input_password = request.args.get('password')
#     f_name = request.args.get('First Name')
#     l_name = request.args.get('Last Name')

#     hashed_pw = hashlib.pbkdf2_hmac('sha256', input_password.encode('utf-8'), salt , 100000, dklen=128)

#     db.addEmployee(f_name, l_name, )
    
# @app.route('/auth', methods=['GET','POST'])
# def login():
#     # get arguments from post request
#     input_username = request.args.get('username')
#     input_password = request.args.get('password')

#     # get salt 
#     stored_salt = b''
#     stored_key = b''

#     new_password = hashlib.pbkdf2_hmac('sha256', input_password.encode('utf-8'), stored_salt, 100000, dklen=128)

#     if stored_key == new_password:
#         return {"msg": 200}
#     else:
#         return {"msg": 403}

if __name__ == "__main__":
    app.debug = True
    app.run()