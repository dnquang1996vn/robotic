import sys
# addr ev3dev
# name 00:17:E9:F8:72:06
import bluetooth
import requests
from socketIO_client import SocketIO

serverMACAddress = 'A0:E6:F8:16:31:59'
url = 'http://localhost:3000'
port = 3
s = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
s.connect((serverMACAddress, port))

currentPos = 5
currentAction = 0

mapPos = ['Null', 'A', 'B', 'C', 'D', 'Start', 'End']
mapAc = ['Null', 'Nothing', 'Pick Up', 'Put Down']
command = []

def on_connect():
    print('connected')


def on_disconnect():
    print('disconnected')


def get_request(args):
    print(args)
    global command
    if (args == 1):
        command = [{'A': 'Pick Up'}, {'C': 'Put Down'}]
        apply()
        reset()
    else:
        command = [{'C': 'Pick Up'}, {'A': 'Put Down'}]
        apply()
        reset()
def reset():
    global command
    global currentPos
    global currentAction
    command = []
    currentPos = 0
    currentAction = 0

def apply():
    if (str(command) != "[]"):
        # command = [{'C' : 'Pick Up'}, {'A' : 'Put Down'}]
        print(command)
        print(str(command))
        s.send(str(command))
        done = False
        while not done:
            print("Waiting robot response!")
            data = s.recv(2048)
            if "done" in data.decode('ascii'):
                done = True
                print("Job Done")
            elif "refuse" in data.decode('ascii'):
                done = True
                print("Job Refused")
            else:
                respond = {'data': data.decode('ascii')}
                r = requests.get(url=url + '/data', params=respond)

            reset()
    else:
        print("Define command first")
if __name__ == "__main__":
    socketIO = SocketIO('localhost', 3000)
    socketIO.on('connect', on_connect)
    socketIO.on('disconnect', on_disconnect)
    socketIO.on('channel', get_request)
    socketIO.on('request', get_request)
    print(command)
    socketIO.wait()
    s.close()
    # print("The command should be in this format A|B. It means, go to A")
    # text = input('Command format (A|B):') # Note change to the old (Python 2) raw_input
    # if text == "quit":
    #     break
    # s.send(text)
# sock.close()