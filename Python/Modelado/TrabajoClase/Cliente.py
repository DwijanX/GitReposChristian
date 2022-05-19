from __future__ import print_function
import requests
import json
import cv2

addr = 'http://c070-190-181-40-231.ngrok.io'
test_url = addr + '/api/test'

content_type = 'image/jpeg'
headers = {'content-type': content_type}

img = cv2.imread('Python\Modelado\Files\test\test03.jpg')
_, img_encoded = cv2.imencode('.jpg', img)
response = requests.post(test_url, data=img_encoded.tobytes(), headers=headers)
print(json.loads(response.text))