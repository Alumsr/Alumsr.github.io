### TLDR
- PASCAL VOC（Visual Object Classes）是一个经典的**计算机视觉数据集**
- 用于目标检测、语义分割和图像分类等任务
- 它包含了20中常见物体的图像
- 每个图像都标注了物体的边界框和类别标签

### CSDN

##### 一、简介

- 子任务:`Object Classification 、Object Detection、Object Segmentation、Human Layout、Action Classification` 
    - [PASCAL 主页](http://host.robots.ox.ac.uk/pascal/VOC/) 与 [排行榜](http://host.robots.ox.ac.uk:8080/leaderboard/main_bootstrap.php)
    - [PASCAL VOC 2007 挑战赛主页](http://host.robots.ox.ac.uk/pascal/VOC/voc2007/) 
    - [PASCAL VOC 2012 挑战赛主页](http://host.robots.ox.ac.uk/pascal/VOC/voc2012/)
    - [PASCAL VOC Evaluation Server](http://host.robots.ox.ac.uk:8080/)
- PASCAL VOC 2007 和 2012 数据集总共分 4 个大类,20 个小类（加背景 21 类）
	- vehicle、household、animal、person
- 输出:下图粗体
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190301181926237.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L216cG16aw==,size_16,color_FFFFFF,t_70)

---

##### 二、VOC 组织结构

- **常用组合**
	- 目前目标检测常用的是 VOC2007 和 VOC2012 [数据集](https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E9%9B%86&spm=1001.2101.3001.7020)，二者是互斥的

    - **`07+12：`** 使用 VOC2007 和 VOC2012 的 `train+val（16551）` 上训练，然后使用 VOC2007 的 test（4952） 测试
    - **`07++12：`** 使用 VOC2007 的 `train+val+test（9963）` 和 VOC2012的 `train+val（11540）` 训练，然后使用 VOC2012 的 test 测试，这种方法需提交到 [PASCAL VOC Evaluation Server](http://host.robots.ox.ac.uk:8080/) 上评估结果，因为 VOC2012 test 没有公布
    - **`07+12+COCO：`** 先在 MS COCO 的 trainval 上 **预训练**，再使用 VOC2007 和 VOC2012 的 `train+val` **微调训练**，然后使用 VOC2007 的 test 测试
    - **`07++12+COCO：`** 先在 MS COCO 的 trainval 上**预训练**，再使用 VOC2007 的 `train+val+test` 和 VOC2012 的 `train+val`**微调训练**，然后使用 VOC2012 的 test 测试 ，这种方法需提交到 [PASCAL VOC Evaluation Server](http://host.robots.ox.ac.uk:8080/)上评估结果，因为VOC2012 test 没有公布

- **组织结构：** 以 VOC 2007 为例，解压后的文件为：
    
    ```shell
    .
    ├── Annotations 进行 detection 时的标签文件, .xml 形式,文件与图片名对应
    ├── ImageSets
	│   ├── Layout 存放用于 layout 的图片名称
	│   ├── Main 存放用于训练、验证、测试的图片名称
	│   └── Segmentation 存放用于 segmentation 的图片名称
    ├── JPEGImages 存放 .jpg 格式的图片文件
    ├── SegmentationClass 存放按照 class 分割的图片
    └── SegmentationObject 存放按照 object 分割的图片
    
    ├── Main
    │   ├── train.txt 训练图片名称， 共 2501 个
    │   ├── val.txt 验证图片名称，共 2510 个
    │   ├── trainval.txt train与val的合集。共 5011 个
    │   ├── test.txt 测试图片名称，共 4952 个
    ```
    

---

##### 三、标注

- [标注标准](http://host.robots.ox.ac.uk/pascal/VOC/voc2012/guidelines.html)
- 标注信息如下：

    ```xml
    <annotation>
    	<folder>VOC2007</folder>
    	<filename>000001.jpg</filename>  # 文件名 
    	<source>
    		<database>The VOC2007 Database</database>
    		<annotation>PASCAL VOC2007</annotation>
    		<image>flickr</image>
    		<flickrid>341012865</flickrid>
    	</source>
    	<owner>
    		<flickrid>Fried Camels</flickrid>
    		<name>Jinky the Fruit Bat</name>
    	</owner>
    	<size>  # 图像尺寸, 用于对 bbox 左上和右下坐标点做归一化操作
    		<width>353</width>
    		<height>500</height>
    		<depth>3</depth>
    	</size>
    	<segmented>0</segmented>  # 是否用于分割
    	<object>
    		<name>dog</name>  # 物体类别
    		<pose>Left</pose>  # 拍摄角度：front, rear, left, right, unspecified 
    		<truncated>1</truncated>  # 目标是否被截断（比如在图片之外），或者被遮挡（超过15%）
    		<difficult>0</difficult>  # 检测难易程度，这个主要是根据目标的大小，光照变化，图片质量来判断
    		<bndbox>
    			<xmin>48</xmin>
    			<ymin>240</ymin>
    			<xmax>195</xmax>
    			<ymax>371</ymax>
    		</bndbox>
    	</object>
    	<object>
    		<name>person</name>
    		<pose>Left</pose>
    		<truncated>1</truncated>
    		<difficult>0</difficult>
    		<bndbox>
    			<xmin>8</xmin>
    			<ymin>12</ymin>
    			<xmax>352</xmax>
    			<ymax>498</ymax>
    		</bndbox>
    	</object>
    </annotation>
    ```
    

---

##### 四、提交格式

###### 1、Classification Task

- 每一类都有一个 txt 文件，里面每一行都是测试集中的一张图片，前面一列是**图片名称**，后面一列是**预测的分数**。

```
# comp1_cls_test_car.txt, 内容如下

000004 0.702732
000006 0.870849
000008 0.532489
000018 0.477167
000019 0.112426
```

###### 2、Detection Task

- 每一类都有一个 txt 文件，里面每一行都是测试集中的一张图片，每行的格式为：`<image identifier> <confidence> <left> <top> <right> <bottom>`，confidence 用来计算 `mAP`

```
# comp3_det_test_car.txt，内容如下
# comp3：只允许用所给训练数据，comp4：允许使用外部数据

000004 0.702732 89 112 516 466
000006 0.870849 373 168 488 229
000006 0.852346 407 157 500 213
000006 0.914587 2 161 55 221
000008 0.532489 175 184 232 201
```

---

##### 五、评估标准

- AP：Average Precision，平均精度
	- 对于每个类别，计算其 [[precision-recall 曲线]]下的面积，即为 AP
	- AP 越大，说明模型的效果越好
- **mAP**：mean Average Precision，平均精度均值
	- 对于每个类别，计算其 AP，然后对所有类别的 AP 求平均值，即为 mAP


---


### trifles
- 它由英国牛津大学的计算机视觉小组创建并维护。
- 在计算机视觉社区中广泛用于评估目标检测和语义分割算法的性能。
- 许多研究论文都使用PASCAL VOC数据集进行实验和比较。

- PyTorch提供用于加载和处理PASCAL VOC数据集的工具。
	- `torchvision.datasets.VOCDetection`类
		- 用于加载PASCAL VOC数据集。通过实例化这个类并指定数据集的根目录和年份，可以获取数据集的图像和标注信息。
	- `torchvision.transforms`模块
		- 其中包含了一些常用的数据转换函数，如`ToTensor`、`Normalize`和`Compose`等。这些函数可以用于将图像数据转换为张量，并进行归一化等预处理操作。
	- `torchvision.transforms`模块
		- `Compose`函数
	- `torchvision.transforms.functional`模块
		- `resize`
		- `pad`
		- 可以用于对图像和标注进行预处理和增强操作。
	- `torch.utils.data.DataLoader`类
		- 可以用于创建数据加载器，方便对数据集进行批处理和并行加载。