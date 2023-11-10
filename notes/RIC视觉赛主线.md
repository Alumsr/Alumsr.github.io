

# 基础概念

1. [x] pip和conda是？区别在？
	- pip
		- Python默认包(库)管理工具
	- conda
		- 包管理工具
		- 可管理多个语言的包和依赖关系
		- 功能更强大,处理复杂依赖关系
		- 常用于数据科学
1. [x] python多环境管理
	- 概念:将**不同Python项目**的**依赖项**隔离开来，以避免冲突和混乱的方法
	- 方式:创建虚拟环境
		- 每个虚拟环境都包含特定项目所需的Python版本和包
	- 步骤
		1. 安装虚拟环境工具(如venv/conda)
		2. 配置虚拟环境
1. [x] anaconda miniconda的安装与用法
2. [x] requirements.txt是什么？
	- 作用:依赖项清单文件,用于自动安装依赖项
	- 使用:`pip install -r requirements.txt`
	- 格式:每行包含一个依赖项的**名称**和版本**约束条件**
	- 例:`requirement.txt`

	```
	numpy==1.18.5
	torch>=1.7.0
	matplotlib
	```

1. setup.py是什么？
	- [[setup.py和setup.cfg简介]] 
	- [[setup.py和requirements.txt对比介绍]]
	- TLDR
		- 作用:自动安装Python包
		- 依赖:使用`setuptools`库定义包的信息
		- 使用:`pip install .`



---
- 常见的目标检测[数据集](数据集和数据标注)
   - [[PASCAL_VOC简介]]
   - MSCOCO
	   - MSCOCO规模更大,包含各种现实物体
	   - 有image dataset和caption dataset
	   - 每个图像数据有对应的边界框,类别标签,[[语义分割掩码]],文本描述。
- Pytorch和YOLO
	- YOLO是一种模型
	- PyTorch是一个深度学习框架
	- PT可以用于实现YL

# 构建数据集

- [x] 在Windows下自行安装Labelimg，学会使用Labelimg工具进行矩形框标注（使用方法见度娘）
	- [[标注工具_LabelImg&Label_Studio]] 

# 训练模型

- [ ] [yolo5项目地址](https://github.com/ultralytics/yolov5)
- [ ] [[YOLO_配置方法(训练和使用前要做的..)]]

- 其他
	- [评价指标](模型的评估_AP和mA)
	- [调整超参](模型选择与调教指导)

# 部署模型
- TensorRTX
	- TensorRTx aims to implement deep learning networks with **TensorRT network definition API**.
	- [tensorrtx项目地址](https://github.com/wang-xinyu/tensorrtx)
	- [[用TensorRTX部署YoloV5]]
- TensorRT
	- [[物体检测_yolo+RoboFlow流程]]:第四部分
	- [Runing on Jetson Nano(Using TensorRT&DeepStream)](https://docs.ultralytics.com/yolov5/tutorials/running_on_jetson_nano)
- 为什么要使用TensorRT部署模型
	1. 针对相应平台优化,速度快
	2. 其实用python pytorch也能跑

# 使用模型

- TLDR:YOLO模型使用方法
	1. 安装miniconda
	2. 安装pytorch
	3. clone yoloV5,配置requirement.txt
	4. 修改`parse_opt`函数
	5. 推理:`python detect.py`
		- 输出至run/detect/exp
	6. 训练:`python train.py`
- [[YOLO_配置方法(训练和使用前要做的..)]]

# 其他

- 全流程演示:[[物体检测_yolo+RoboFlow流程]]
- 如何[[实时获取摄像头图像]]
- Python库安装:[OpenCV](OpenCV安装方法)和[Pytorch](https://pytorch.org/get-started/locally/)