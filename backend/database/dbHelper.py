import psycopg2
import hashlib
from dotenv import load_dotenv
load_dotenv()
import os

class dbHelper():
    def __init__(self):
        self.db_status = 200
        try:
            self.connection = psycopg2.connect(user='postgres',
            password='0107kf', host='localhost',dbname='paychexDB')
            self.cursor = self.connection.cursor()

            create_employees_table = """CREATE TABLE IF NOT EXISTS employees(
                                        empid CHAR(8) PRIMARY KEY,
                                        username VARCHAR(18) NOT NULL UNIQUE,
                                        f_name VARCHAR(25) NOT NULL,
                                        l_name VARCHAR(16) NOT NULL,
                                        hash_pw VARCHAR(160) NOT NULL,
                                        salt VARCHAR(160) NOT NULL
                                    );"""

            self.cursor.execute(create_employees_table)

            create_timesheet_table = """CREATE TABLE IF NOT EXISTS timesheets(
                                        employee_id CHAR(8),
                                        
                                    );"""
            self.connection.commit()
            self.db_status = 200
        except:
            self.db_status = 500

    def test(self):
        return "testing connection"