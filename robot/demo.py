from socketIO_client import SocketIO
import requests

url = 'http://localhost:3000'
print(1)


def on_connect():
    print('connected')


def on_disconnect():
    print('disconnected')


def get_request(*args):
    print(args)
    data = {"data": "1"}
    r = requests.get(url=url + '/data', params=data)


socketIO = SocketIO('localhost', 3000)
socketIO.on('connect', on_connect)
socketIO.on('disconnect', on_disconnect)
socketIO.on('channel', get_request)
socketIO.emit('sssss')

socketIO.wait()
print(2)