import requests
import threading
import time
import asyncio

url = 'https://5407ef99.ngrok.io'
async def loop1_10():
    send_request('e')
    for i in range(1, 11):
        time.sleep(1)
        print(i)


def send_request(param):
    respond = {'data': param}
    r = requests.get(url=url + '/data', params=respond)
    print(r.text)


awloop1_10()


