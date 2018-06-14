import requests

url = 'http://192.168.67.193:3000'
url = 'https://fa93d370.ngrok.io'
data = {"data": "24.3d"}

r = requests.get(url=url + '/data', params=data)
print(r.text)
