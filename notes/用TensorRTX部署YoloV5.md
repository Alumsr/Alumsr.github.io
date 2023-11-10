---
link: https://zhuanlan.zhihu.com/p/386881025
---
关联:[Runing on Jetson Nano(Using TensorRT&DeepStream)](https://docs.ultralytics.com/yolov5/tutorials/running_on_jetson_nano)
[[YoloV5_in_Jetson_从训练到部署_各部件关系图.canvas|YoloV5_in_Jetson_从训练到部署_各部件关系图]]

---
## 1.前期准备与说明

- 使用TensorRT的过程，实际就是在其API下复现yolov5的过程。对于任意一个已训练好的神经网络，我们需要得知其**网络结构(backbone, neck等)与训练权重**。
- 训练权重已由系列教程的第二篇中得到
- 网络结构的获取方法主要有以下几种：
	1. 使用TF-TRT，将TensorRT集成在TensorFlow中 
	2. 使用ONNX2TensorRT，即ONNX转换trt的工具 
	3. **手动构造模型结构，然后手动将权重信息挪过去，非常灵活但是时间成本略高：tensorrtx** 
- 其中前两种常常会有遇到不支持的结构/层的情况，解决该问题非常费时。
- 使用TensorRT API手动构造模型结构是最为稳妥、对模型还原度最高、精度损失最少的一种方法。

- 该项目除支持yolov5外，resnet, yolov3, yolov4等均支持，如果使用其他网络结构的同学也可以加以利用。

## 2. 使用流程

- 下载好该项目的项目的源码后，我们仅需要用到其中yolov5的子文件夹，其他为无关项。
- 下载过程中要注意所下载的tensorrtx版本应与所选用的yolov5版本相匹配。

### 2.1 权重转换

打开gen_wts.py文件，修改对应权重路径

![](https://pic1.zhimg.com/v2-e5e4a064beba339549a99f5809046544_b.jpg)

此步将会得到wts格式的yolov5权重，以供下一步生成engine文件

### 2.2 生成TensorRT Engine

```
// put yolov5s.wts into tensorrtx/yolov5
// go to tensorrtx/yolov5
// update CLASS_NUM in yololayer.h if your model is trained on custom dataset
//注意在yololayer.h中改类别数！！

mkdir build
cd build
cmake ..
make //编译完成

//由wts生成engine文件
sudo ./yolov5 -s [.wts] [.engine] [s/m/l/x or c gd gw]  // serialize model to plan file

//利用engine文件进行推理，此处输入图片所在文件夹，即可得到预测输出
sudo ./yolov5 -d [.engine] [image folder]  // deserialize and run inference, the images in [image folder] will be processed.

// For example yolov5s
sudo ./yolov5 -s yolov5s.wts yolov5s.engine s
sudo ./yolov5 -d yolov5s.engine ../samples
// For example Custom model with depth_multiple=0.17, width_multiple=0.25 in yolov5.yaml
sudo ./yolov5 -s yolov5_custom.wts yolov5.engine c 0.17 0.25
sudo ./yolov5 -d yolov5.engine ../samples
```