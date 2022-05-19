import cv2
import torch
from torch.autograd import Variable
from torchvision import transforms
import torch.nn.functional as rna

transform = transforms.Compose([transforms.ToTensor(), transforms.Normalize((0.5,), (0.5,))])
model_ft = torch.load("modelo/mi_modelo_digitos.pt")

camera = cv2.VideoCapture(0)

while True:
    grabbed, frame = camera.read()
    imagenGris = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    imagenGris = cv2.GaussianBlur(imagenGris, (5, 5), 0)
    ret, imagenBN = cv2.threshold(imagenGris, 90, 255, cv2.THRESH_BINARY_INV)
    grupos, _ = cv2.findContours(imagenBN.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    ventanas = [cv2.boundingRect(g) for g in grupos]
    print(ventanas)
    for g in ventanas:
        cv2.rectangle(frame, (g[0], g[1]), (g[0] + g[2], g[1] + g[3]), (255, 0, 0), 2)
        l = int(g[3] * 1.6)
        p1 = int(g[1] + g[3] // 2) - l // 2
        p2 = int(g[0] + g[2] // 2) - l // 2
        digito = imagenBN[p1: p1 + l, p2: p2 + l]
        if digito.shape[0] > 20 and digito.shape[1] > 20:

            digito = cv2.resize(digito, (28, 28), interpolation=cv2.INTER_AREA)
            digito = cv2.dilate(digito, (3, 3,))

            digito = transform(digito)
            digito.unsqueeze_(dim=0)
            digito = Variable(digito)

            digito = digito.view(digito.shape[0], -1)
            predict = rna.softmax(model_ft(digito), dim=1)

            cv2.putText(frame, str(predict.argmax().item()), (g[0], g[1] - 50), cv2.FONT_HERSHEY_SIMPLEX, 2,(0, 255, 0))

    cv2.imshow('Self', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

camera.release()
cv2.destroyAllWindows()
