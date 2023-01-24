# Simple demo of file server with a JSON storage

## Contents

This is a very simple version of a webserver that does three things :
- Serves a static HTML website (located in website/ folder)
- Stores data in a JSON file (located in database/ folder)
- Provides an API to interact with this JSON file via two routes : one to get the content of the database, the other one to update the content of the database.

## How to run
The webserver uses Flask, which is a light Python framework that serves to create a very simple server.
Simply run :
```
pip install flask
./run.sh
```

Then, the website is available locally using one of the two URLs that appear in your console.
Once hosted, the 0.0.0.0 route makes it possible for the website to be accessed from outside the host.
