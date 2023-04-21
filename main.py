import json
import pathlib
import sqlite3

from flask import Flask, request, redirect, url_for


app = Flask(
    __name__,
    static_url_path='',
    static_folder='./website/',
)


count = 0
FILES = [p for p in pathlib.Path('./website/fbx/').iterdir() if p.is_file()]



@app.route('/')
def main():
    """
    Serves the index.html file present in the static_folder of Flask (see the app variable)
    """
    return redirect(url_for('static', filename='index.html'))


@app.route('/status')
def status():
    """
    A simple route to query status of server.
    """
    return 'server running'


@app.route('/get_fbx')
def get_fbx():
    """
    A route to get a new FBX
    """
    global count
    count = (count+1) % len(FILES)
    
    data = {'fbx' : str(FILES[count].name)}

    response = app.response_class(
            response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/get_all_prompts')
def get_all_prompts():
    """
    A route to get all of the registered prompts
    """
    CONN = sqlite3.connect("database/db.sqlite")
    cur = CONN.cursor()
    cur.execute("SELECT * FROM Prompts;")
    rows = cur.fetchall()
    CONN.close()
    return rows


@app.route('/set_prompt', methods=['POST'])
def set_prompt():
    """
    Sets the prompt in the sqlite db
    """
    fbx = json.loads(request.data)['fbx']
    prompt = json.loads(request.data)['prompt']
    
    CONN = sqlite3.connect("database/db.sqlite")
    cur = CONN.cursor()
    cur.execute("INSERT INTO Prompts(Fbx, Prompt) VALUES (?, ?)", (fbx, prompt))
    CONN.commit()
    CONN.close()
    return 'ok'
