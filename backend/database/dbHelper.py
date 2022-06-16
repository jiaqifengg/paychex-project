import psycopg2
import hashlib
from dotenv import load_dotenv
load_dotenv()
import os

class dbHelper():
    def __init__(self):
        self.connection = psycopg2.connect(user='postgres',
        password='0107kf', host='localhost',dbname='paychexDB')
        self.cursor = self.connection.cursor()

        create_employees_table = """CREATE TABLE IF NOT EXISTS employees(
                                    empid CHAR(8) PRIMARY KEY,
                                    username VARCHAR(18) NOT NULL UNIQUE,
                                    f_name VARCHAR(25) NOT NULL,
                                    l_name VARCHAR(16) NOT NULL,
                                    password VARCHAR(50) NOT NULL
                                );"""

        self.cursor.execute(create_employees_table)
        self.connection.commit()

    def test(self):
        return "testing connection"