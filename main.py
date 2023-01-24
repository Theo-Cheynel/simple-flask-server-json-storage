import json

from flask import Flask, request, redirect, url_for


app = Flask(
    __name__,
    static_url_path='',
    static_folder='./website/',
)


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


@app.route('/data')
def data():
    """
    A route to get the data. The data is stored in a JSON file
    """
    with open('./database/data.json', mode='r') as json_file:
        data = json_file.readlines()

    response = app.response_class(
        response=data,
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/set_color', methods=['POST'])
def set_color():
    """
    Sets the color in the data file (reads the JSON, modifies the color attribute, then writes the output to the JSON)

    Args:
        color (str) : hexadecimal string representing the color to set in the JSON file.
    """
    color = json.loads(request.data)['color']

    with open('./database/data.json', mode='r') as json_file:
        data = json.load(json_file)

    data['color'] = color
    
    with open('./database/data.json', mode='w') as json_file:
        json.dump(data, json_file, indent=0)

    return 'ok'
