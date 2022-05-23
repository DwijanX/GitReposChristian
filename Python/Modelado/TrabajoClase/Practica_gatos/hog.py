
from skimage.io import imread
from skimage.feature import hog
import matplotlib.pyplot as plt
import h5py

img = imread('manos.jpg')
plt.imshow(img)
plt.show()

fd, hog_image = hog(img, orientations=9, pixels_per_cell=(8, 8),
                	cells_per_block=(5, 5), visualize=True, multichannel=True)

plt.imshow(hog_image, cmap="gray")
plt.show()



