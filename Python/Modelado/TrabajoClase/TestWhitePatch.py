#%%
import numpy as np
import matplotlib.pyplot as plt
from skimage.io import imread, imshow
from skimage import img_as_ubyte
from matplotlib.patches import Rectangle

#dinner = imread('./Practica_gatos/manos.jpg')
dinner = imread('./Practica_gatos/testmanos2.JPG')

#plt.imshow(dinner, cmap='gray')

fig, ax = plt.subplots(1,2, figsize=(10,6))
ax[0].imshow(dinner)
ax[0].set_title('Original Image')

"""
dinner_max = (dinner*1.0 / dinner.max(axis=(0,1)))
ax[1].imshow(dinner_max);
ax[1].set_title('Whitebalanced Image');
"""


dinner_mean = (dinner*1.0 / dinner.mean(axis=(0,1)))
ax[1].imshow(dinner_mean.clip(0, 1))
ax[1].set_title('Whitebalanced Image');