from re import U
import time
from datetime import date, datetime, time
from time import time
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
            self.init_tables()
            self.db_status = 200
        except:
            self.db_status = 500

    def init_tables(self):
        create_employees_table = """CREATE TABLE IF NOT EXISTS employees(
                                    emp_id CHAR(10),
                                    username VARCHAR(18) NOT NULL UNIQUE,
                                    f_name VARCHAR(25) NOT NULL,
                                    l_name VARCHAR(16) NOT NULL,
                                    hash_pw VARCHAR(160) NOT NULL,
                                    emp_type INT NOT NULL,
                                    PRIMARY KEY(emp_id)
                                );"""

        self.cursor.execute(create_employees_table)
        self.connection.commit()
        
        create_timesheet_table = """CREATE TABLE IF NOT EXISTS timesheets(
                                    id SERIAL,
                                    employee_id CHAR(10) REFERENCES employees (emp_id),
                                    active INT DEFAULT 0,
                                    in_date DATE,
                                    clock_in_time TIMESTAMP,
                                    clock_out_time TIMESTAMP,
                                    total_work_time TEXT,
                                    total_lunch_time TEXT,
                                    total_break_time TEXT,
                                    PRIMARY KEY(id)
                                );"""
                                
        self.cursor.execute(create_timesheet_table)
        self.connection.commit()
        create_breaks_table = """CREATE TABLE IF NOT EXISTS breaks(
                                break_id SERIAL,
                                employee_id CHAR(10) REFERENCES employees (emp_id),
                                break_type TEXT,
                                break_start TIME,
                                break_end TIME DEFAULT NULL,
                                break_time TEXT,
                                PRIMARY KEY(break_id)
                            );"""

        self.cursor.execute(create_breaks_table)

        self.connection.commit()

    def test(self):
        return "testing connection"

    def __execute(self, query, parameters):
        try:
            self.cursor.execute(query, parameters)
            self.connection.commit()
            return self.cursor
        except:
            return 500

    def register(self, emp_details):
        query = """INSERT INTO employees(emp_id, username, f_name, l_name, hash_pw, emp_type) 
        VALUES (%s, %s, %s, %s, %s, %s)"""
        cursor = self.__execute(query, emp_details)
        if cursor != 500:
            return 200
        else:
            return cursor

    def login(self, username):
        query = """SELECT * FROM employees WHERE username=%s"""
        vals = (username,)
        cursor = self.__execute(query, vals)
        if cursor != 500:
            return cursor.fetchall()
        else:
            return cursor
    
    def get_current_status(self, emp_id):
        query = "SELECT * FROM timesheets WHERE employee_id=%s AND clock_out_time is NULL"
        vals = (emp_id,)
        cursor = self.__execute(query, vals)
        if cursor != 500:
            return cursor.fetchall()
        else:
            return cursor

    def get_break_status(self, emp_id):
        # break_id, employee_id, break_type, break_start, break_end, break_time
        query = """SELECT * FROM breaks WHERE employee_id=%s AND break_end is NULL"""
        vals = (emp_id,)
        cursor = self.__execute(query, vals)
        if cursor != 500:
            return cursor.fetchall()
        else:
            return cursor

    def clockIn(self, emp_id):
        query = """INSERT INTO timesheets(id, employee_id, active, in_date, clock_in_time, clock_out_time, total_work_time, total_lunch_time, total_break_time)
	    VALUES (DEFAULT, %s, 1, %s, %s, NULL, NULL, NULL, NULL);"""
        today = date.today()
        in_date = today.strftime("%m-%d-%Y")
        clock_in_time = datetime.now()
        vals = (emp_id, in_date, clock_in_time)
        cursor = self.__execute(query, vals)
        if cursor != 500:
            res = self.get_current_status(emp_id)[0]
            res_id = res[0]
            return res_id
        else:
            return cursor
        
    def clockOut(self, emp_id, shiftID):
        clock_out_time = datetime.now()
        res = self.total_work_time(shiftID, clock_out_time)
        query = """
        UPDATE timesheets
        SET active=0, clock_out_time=%s, total_work_time=%s, total_lunch_time=%s, total_break_time=%s
        WHERE id=%s;
        """
        vals=(clock_out_time, res, 0, 0, shiftID)
        res = self.__execute(query, vals)
        if res != 500:
            return 200
        else:
            return res

    
    def total_work_time(self, shiftID, curr_time):
        res = self.get_shift(shiftID)
        start_time = res[0][4]
        time_diff = curr_time - start_time
        return time_diff

    def convert_timedelta(self, duration):
        days, seconds = duration.days, duration.seconds
        hours = days * 24 + seconds // 3600
        minutes = (seconds % 3600) // 60
        seconds = (seconds % 60)
        return hours, minutes, seconds

    def get_shift(self, shiftID):
        query = "SELECT * FROM timesheets WHERE id=%s"
        vals = (shiftID,)
        res = self.__execute(query, vals)
        return res.fetchall()

    def get_timesheets(self, username):
        query = """SELECT * FROM employees WHERE username=%s"""
        vals = (username,)
        cursor = self.__execute(query, vals)
        if cursor != 500:
            return cursor.fetchall()
        else:
            return cursor

