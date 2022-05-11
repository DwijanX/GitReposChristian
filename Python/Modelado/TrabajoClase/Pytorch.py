from random import shuffle
from torch import *
from torchvision import transforms
from torch import nn,optim
import time
from torch.utils.data import Dataset
import h5py
import numpy
import cv2
from torch.utils.data import Dataset
import h5py

class h5DData(Dataset):
    def __init__ (self,File, Transform=None):
        self.archivo = h5py.File(File, 'r')
        self.labels = self.archivo['y']
        self.data = self.archivo['X']
        self.transform = Transform
    def __getitem__(self,index):
        datum = self.data(index)
        if self.transform is not None:
            datum = self.transform(datum)
        return datum, self.labels[index]
    def __len__(self):
        return len(self.labels)
    def close(self):
        self.archivo.close()	

transform=transforms.Compose([transforms.ToTensor(),transforms.Normalize((0.5,),(0.5,))])

train_loader=torch.utils.data.dataLoader(h5DData("digitos.h5",transform),batch_size=64,shuffle=True)
test_loader=torch.utils.data.dataLoader(h5DData("digitos_test.h5",transform),batch_size=64,shuffle=True)


dataiter=iter(train_loader)
images,labels=dataiter.next()



transforms.Normalize()

input_size=784
hidden_sizes=[128,64]
outputSize=10

model=nn.Sequential(nn.Linear(input_size,hidden_sizes[0]),nn.RelU(),
                    nn.Linear(input_size[0],hidden_sizes[1]),nn.RelU(),
                    nn.Linear(input_size[1],outputSize),nn.LogSoftmax(dim=1))


criterion=nn.CrossEntropyLoss()
images,labels=next(iter(train_loader))
images=images.view(images.shape[0],-1)
logps=model(images.float())
loss = criterion(logps, labels)

loss.backward()

optimizer = optim.SGD(model.parameters(), lr=0.003, momentum=0.9)

epochs = 15
for e in range(epochs):
    running_loss = 0
    for images, labels in train_loader:
        images = images.view(images.shape[0], -1)
    
        optimizer.zero_grad()
        
        output = model(images)
        loss = criterion(output, labels)
        
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    else:
        print("Epoch {} - Training loss: {}".format(e, running_loss/len(train_loader)))



