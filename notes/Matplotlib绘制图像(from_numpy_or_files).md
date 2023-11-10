---
link: https://pyimagesearch.com/2014/11/03/display-matplotlib-rgb-image/
---


# 问题
- 绘制`.png`图像

	```python
	import matplotlib.pyplot as plt
	import matplotlib.image as mpimg
	image = mpimg.imread("chelsea-the-cat.png")
	plt.imshow(image)
	plt.show()
	```
	result:
			![norm_cat](https://pyimagesearch.com/wp-content/uploads/2014/05/matplotlib-rgb-no-axis.jpg)

- 绘制`numpy`图像(opencv)

	```python
	import cv2
	image = cv2.imread("chelsea-the-cat.png")
	plt.axis("off")
	plt.imshow(image)
	plt.show()
	```
	result:
		![abnorm_cat](https://pyimagesearch.com/wp-content/uploads/2014/05/matplotlib-rgb-reversed.jpg)

- 原因:OpenCV represents RGB images as multi-dimensional NumPy arrays…**but in reverse order!**

# 解决
- Convert `'GBR'` to `RGB`.

```python
image = cv2.imread("chelsea-the-cat.png")
imageConved = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
plt.imshow(imageConved)
```