---
link: https://blog.csdn.net/beauthy/article/details/127286740
---

brief
---
```python
import cv2
# Open the video capture
cap = cv2.VideoCapture(0)
while True:
	# Read the current frame from the webcam
	ret, frame = cap.read()
	# Display the frame
	cv2.imshow('Webcam', frame)
	# Break the loop if 'q' is pressed
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break
# Release the video capture and close the window
cap.release()
cv2.destroyAllWindows()
```
- `ret`:捕获成功状态
- `frame`:捕获图像的numpy数组,形状是**相机输出分辨率\*3**(R,G,B)
- `cv2.resize(frame,(w,h))` 可以伸缩图像

显示输出
---
- 用`cv2.imshow()`显示图像/视频
	- 用法: `cv2.imshow("title", np_array)`
	- 示例

		```python
			results = model(frame)
			results_with_boxes = results.render()[0]  # Detections对象results -> numpy数组results_with_boxes
			cv2.imshow("Object Detection", frame_with_boxes)
		```
- 用[[Matplotlib绘制图像(from_numpy_or_files)]]