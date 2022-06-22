import hashlib
from flask import Flask, render_template, render_template_string, request
from database.dbHelper import dbHelper
import json
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import random
import os
import uuid

app = Flask(__name__)
CORS(app)
db = dbHelper()

def build_response(response_body):
    response = jsonify(response_body)
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")

    return response

@app.route('/', methods=['GET', 'POST'])
def index():
    words = db.test()
    response_body = {
        "name": "Kelly",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "conn": words,
        "status": db.db_status
    }
    response = build_response(response_body)
    return (response)  

@app.route('/register', methods=['POST', 'GET'])
def tester():
    print("Testing register!")
    emp_id = generateUUID()
    post_data = json.loads(request.data)

    firstName = post_data['firstName']
    lastName = post_data['lastName']
    username = post_data['username']
    password = post_data['password']
    empType = post_data['empType']
    response_body = {
        "msg": 200,
        "emp_id": emp_id,
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "passWord": password,
        "empType": empType
    }
    print(response_body)
    response = build_response(response_body)
    return (response)  

def generateUUID():
    return uuid.uuid4().hex[:10]

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