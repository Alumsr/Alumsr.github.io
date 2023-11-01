---
link: https://www.bilibili.com/video/BV1rT411f7Up
---

## 先决条件

- 训练图像
- 训练标签
- 名称一一对应置于不同文件夹(最好)

## 操作

- 在yolo主目录下:
	1. `model/*.yaml`复制一份并重命名
		- 将`nc`改为class数量
	2. `data/*.yaml`复制一份并重命名
		- 修改`path|train|val|names`参数为对应值(路径指定)
	1. `train.py`->`parse_opt`函数中
		1. `cfg`:`default="path/to/model/xxx.yaml"`
		2. `data`:`default=path/to/data/xxx.yaml`
		3. `epochs`:修改为合适的训练轮数
		4. `devices`:`0`是GPU

## 注意

- 若需更改其他训练配置,在`train.py`中的`parse_opt`中查看
- 对`detect.py`等同理