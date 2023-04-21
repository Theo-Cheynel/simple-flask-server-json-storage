import sqlite3

conn = sqlite3.connect('database/db.sqlite')

cursor_obj = conn.cursor()

cursor_obj.execute('CREATE TABLE IF NOT EXISTS Prompts ( Fbx VARCHAR(255) NOT NULL, Prompt CHAR(255) NOT NULL );')

conn.close()
