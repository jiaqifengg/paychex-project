from curses import meta
from tabnanny import check
from time import time
from urllib import response
from datetime import datetime
import bcrypt
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
invalid_response = {"status": 500}

def generateUUID():
    return uuid.uuid4().hex[:10]
    
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
        "name": "Kelly's Paychex app",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "conn": words,
        "status": db.db_status
    }
    response = build_response(response_body)
    return (response)  

@app.route('/register', methods=['POST', 'GET'])
def register():
    print("Testing register!")
    post_data = json.loads(request.data)
    firstName = post_data['firstName']
    lastName = post_data['lastName']
    username = post_data['username']
    password = post_data['password']
    empType = post_data['empType']
    hash_pw = password_hasher(password)

    emp_id = generateUUID()
    status = db.register((emp_id, username, firstName, lastName, hash_pw.decode('utf-8'), empType))
    if status != 500:
        response_body = {
            "status": status,
            "emp_id": emp_id,
            "firstName": firstName,
            "lastName": lastName,
            "username": username,
            "empType": empType,
            "password": password,
            "hashed_pw": hash_pw.decode('utf-8')
        }

        print(response_body)
        response = build_response(response_body)
        return (response)
    else:
        response = build_response(invalid_response)
        return response

@app.route('/login', methods=['POST', 'GET'])
def login():
    post_data = json.loads(request.data)
    username = post_data['username']
    password = post_data['password']
    res = db.login(username)
    print(res)
    if res != 500 and len(res) != 0:
        result = res[0]
        emp_id = result[0]
        res_username = result[1]
        firstName = result[2]
        lastName = result[3]
        hashed_pw = result[4]
        pw_check = check_password(password, hashed_pw)
        if(pw_check):
            response_body = {
                "status": 200,
                "pw_check": pw_check,
                "emp_id": emp_id,
                "username": res_username,
                "firstName": firstName,
                "lastName": lastName
            }

            response = build_response(response_body)
            return response
        else:
            response_body = {
                "status": 500,
                "username": res_username,
            }

            response = build_response(response_body)
            return response

    else:
        response_body = {
            "status": 500,
            "username": username,
        }
        response = build_response(response_body)
        return response

#https://stackoverflow.com/questions/9594125/salt-and-hash-a-password-in-python
def password_hasher(password):
    # Hash a password for the first time
    # (Using bcrypt, the salt is saved into the hash itself)
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def check_password(input_password, hashed_password):
    # Check hashed password. Using bcrypt, the salt is saved into the hash itself
    return bcrypt.checkpw(input_password.encode(), hashed_password.encode())

#checks if employee is working
@app.route('/status', methods=['POST','GET'])
def get_active():
    # TIMESHEET: employee_id, active, in_date, clock_in_time, clock_out_time, total_work_time, total_lunch_time, total_break_time
    # BREAKS: break_id, employee_id, break_type, break_start, break_end, break_time
    post_data = json.loads(request.data)
    print(post_data)
    token = post_data['token'] #emp_id is passed
    res = db.get_current_status(token)
    print(res)
    if len(res)!=0:   
        # if employee is working also check if they are on a break
        break_res = db.get_break_status(token)
        break_active = -1 
        break_type = ""
        print(break_res)
        if len(break_res) == 1:
            break_active = break_res[0][0]
            break_type = break_res[0][2]
        response_body = {
            "shiftID": res[0][0],
            "breakID": break_active,
            "breakType": break_type
        }
        response = build_response(response_body)
        return response
    elif res == 500 or len(res)==0:
        response_body = {
            "shiftID": -1,
            "breakID": -1
        }
        response = build_response(response_body)
        return response

@app.route('/in', methods=['POST', 'GET'])
def clock_in():
    post_data = json.loads(request.data)
    emp_id = post_data['token']
    res = db.clockIn(emp_id)
    print(res)
    response_body = {
        "shiftID": res,
    }
    response = build_response(response_body)
    return response

@app.route('/out', methods=['GET', 'POST'])
def clock_out():
    post_data = json.loads(request.data)
    emp_id = post_data['token']
    shiftID = post_data['shiftID']
    res = db.clockOut(emp_id, shiftID)
    print(res)
    response_body = {
        "status": res
    }

    response = build_response(response_body)
    return response

if __name__ == "__main__":
    app.debug = True
    app.run()