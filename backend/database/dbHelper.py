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
                                    salt VARCHAR(160) NOT NULL,
                                    emp_type INT NOT NULL,
                                    PRIMARY KEY(emp_id)
                                );"""

        self.cursor.execute(create_employees_table)
        self.connection.commit()
        
        create_timesheet_table = """CREATE TABLE IF NOT EXISTS timesheets(
                                    id SERIAL,
                                    employee_id CHAR(10) REFERENCES employees (emp_id),
                                    active INT DEFAULT 0,
                                    in_date DATE NOT NULL,
                                    clock_in_time TIME,
                                    clock_out_time TIME,
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