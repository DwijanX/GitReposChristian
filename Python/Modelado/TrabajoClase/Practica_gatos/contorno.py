import cv2

image = cv2.imread("manos.jpg")
# convert to RGB
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
# convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)

canny = cv2.Canny(gray, 50, 150)

# show it
cv2.imshow("frame2",canny)
cv2.waitKey(0)
cv2.destroyAllWindows()

(contornos, _) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)


print("He encontrado {} objetos".format(len(contornos)))

cv2.drawContours(image, contornos, -1, (0, 0, 255), 2)
cv2.imshow("contornos", image)

cv2.waitKey(0)
