import json
from time import time
from urllib import response
from datetime import datetime
import bcrypt
from flask import Flask, request
from database.dbHelper import dbHelper
from flask import Flask, jsonify
from flask_cors import CORS
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

@app.route('/break', methods=['GET', 'POST'])
def start_break():
    post_data = json.loads(request.data)
    breakType = post_data['breakType']
    shiftID = post_data['shiftID']
    emp_id = post_data['token']
    res = db.insert_break(breakType, emp_id)
    response_body = {
        "status": 200,
        "breakType": breakType,
        "shiftID": shiftID,
        "emp_id": emp_id,
        "breakID": res
    }
    response = build_response(response_body)
    return response

@app.route('/breakEnd', methods=['GET', 'POST'])
def end_break():
    print("hereeee")
    post_data = json.loads(request.data)
    breakType = post_data['breakType']
    shiftID = post_data['shiftID']
    emp_id = post_data['token']
    breakID = post_data["breakID"]
    res = db.end_break(breakID)
    print(breakType + " 1")
    update_res = db.count_update_breaks(shiftID, breakType)
    response_body = {
        "status": 200,
        "breakType": breakType,
        "breakID": breakID,
        "shiftID": shiftID,
        "emp_id": emp_id,
        "total": res,
    }
    response = build_response(response_body)
    return response

@app.route('/timesheet', methods=['GET', 'POST'])
def get_all():
    print(request.data)
    post_data = json.loads(request.data)
    emp_id = post_data['token']
    print(emp_id)
    res = db.get_all_shift(emp_id)
    new_res = parse_res(res)
    response_body = {
        "res": json.dumps(new_res)
    }
    response = build_response(response_body)
    return response

def parse_res(res):
    new_res = []
    for shift in res:
        date = shift[3].strftime('%m/%d/%Y')
        start_time = shift[4].strftime('%H:%M:%S')
        end_time = ""
        if(shift[5] != None):
            end_time = shift[5].strftime('%H:%M:%S')
        total_work_time = shift[6]
        total_lunches = shift[7]
        total_breaks = shift[8]
        if total_breaks == None: 
            total_breaks = 0
        if total_lunches == None:
            total_lunches = 0
        if total_work_time == None:
            total_work_time = ""
        temp = {
            "date": date,
            "s_time": start_time,
            "e_time": end_time,
            "total_hours": total_work_time,
            "total_lunches": total_lunches,
            "total_breaks": total_breaks
        }
        new_res.append(temp)
    return new_res
        
if __name__ == "__main__":
    app.debug = True
    app.run()