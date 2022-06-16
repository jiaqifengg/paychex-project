from flask import Flask, render_template, render_template_string
from database.dbHelper import dbHelper
import json
from flask import Flask, jsonify


app = Flask(__name__)
db = dbHelper()

@app.route('/', methods=['GET'])
def index():
    words = db.test()
    response_body = {
        "name": "Kelly",
        "about" :"Hello! I'm a full stack developer that loves python and javascript",
        "conn": words
    }
    return (response_body)  

@app.route('/test', methods=['GET'])
def tester():
    words = db.test()
    response_body = {
        "name": "Kelly",
        "about" :"Second Test",
        "conn": words
    }
    return (response_body)  

if __name__ == "__main__":
    app.debug = True
    app.run()