import requests

url = 'http://localhost:3000'
data = {"data": "24.3d"}

r = requests.get(url=url + '/data', params=data)
print(r.text)
