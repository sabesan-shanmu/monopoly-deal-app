from monopoly import create_app,socketio

app = create_app()

if __name__ == '__main__':
    socketio.run(debug=app.config['DEBUG'])