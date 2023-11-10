---
link: https://www.bilibili.com/video/BV1rT411f7Up
---

# 训练
## 先决条件
- [环境配置](https://colab.research.google.com/github/ultralytics/yolov5/blob/master/tutorial.ipynb)
- [准备训练数据集](标注工具_LabelImg&Label_Studio)
- 名称一一对应置于不同文件夹(最好)

## 操作

- 在yolo主目录下:
	1. `model/*.yaml`复制一份并重命名
		- 将`nc`改为class数量
	2. `data/*.yaml`复制一份并重命名
		- 修改`path|train|val|names`参数为对应值(路径指定)
		- yolo格式数据集使用`coco128.yaml`模板
	1. `train.py`->`parse_opt`函数中
		1. `cfg`:`default="path/to/model/xxx.yaml"`
		2. `data`:`default=path/to/data/xxx.yaml`
		3. `epochs`:修改为合适的训练轮数
		4. `devices`:`0`是GPU

## 注意

- 若需更改其他训练配置,在`train.py`中的`parse_opt`中查看
- 对`detect.py`等同理
- 输出:`runs/train/`
	- `.pt`文件是权重参数文件

# 使用

## 操作
- 配置(yolo主目录下)
	1. 粘贴训练好的`.pt`权重文件
	2. 修改`detect.py`-`parse_opt`-`weights`路径为权重文件路径
	3. 修改`data`路径为自己设定的`.yaml`文件
	4. 修改`conf-tres`路径为所需置信度(高于此则标记)
- 识别

	```shell
	python detect.py [--source path/to/img]
	```
	- 默认路径:data/images