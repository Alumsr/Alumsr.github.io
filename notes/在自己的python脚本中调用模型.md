

1. Pytorch: `torch.hub.load()`
	- 位置:torch/hub.py/load()
	- 使用方法

		```python
		model = torch.hub.load(repo/path, source="github"|"local", **kwargs)  
		```
		- 详见`load()`函数的[docstring](docstring_python对象的说明文档)

1. Yolo: `hubconf.py` docstring如下

	```python
	"""
	
	PyTorch Hub models https://pytorch.org/hub/ultralytics_yolov5
	
	  
	
	Usage:
	
	    import torch
	
	    model = torch.hub.load('ultralytics/yolov5', 'yolov5s')  
	    # official model
	
	    model = torch.hub.load('ultralytics/yolov5:master', 'yolov5s')  
	    # from branch
	
	    model = torch.hub.load('ultralytics/yolov5', 'custom', 'yolov5s.pt')  
	    # custom/local model
	
	    model = torch.hub.load('.', 'custom', 'yolov5s.pt', source='local')  
	    # local repo
	    '.'->yolo path
	
	"""
	```
