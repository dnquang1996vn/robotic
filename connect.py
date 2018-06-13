import requests

url = 'http://192.168.0.103:3000'
data = {"data": "24.3d"}

r = requests.get(url=url + '/data', params=data)
print(r.text)
