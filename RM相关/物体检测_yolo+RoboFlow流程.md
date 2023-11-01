---
link: https://wiki.seeedstudio.com/YOLOv5-Object-Detection-Jetson/
dg-publish: true
---
Few-Shot Object Detection with YOLOv5 and Roboflow

---
## What's YOLOv5

- YOLO is an abbreviation for the term ‘You Only Look Once’. 
- It is an ==algorithm that detects and recognizes various objects in an image in real-time==. 
- it is now ==based on the PyTorch== framework.

## What's few-shot object detection

- Needs only a very ==few training samples==
- ==Transfer learning== to realize it.

## Prerequisites

- Specific Jetson devices 
	- Running latest JetPack v4.6.1
	- SDK components installed 
	- Check [this wiki](https://wiki.seeedstudio.com/reComputer_J1020_A206_Flash_JetPack/) for installation
- Local host PC with Linux, preferably Ubuntu
	- Or Colab

## Overview: Running a project on an [edge device](边缘设备Edge_Device)(tx2)

1. **Collect dataset**
2. **Annotate dataset** (using Roboflow)
3. **Train on local PC (Linux) or Colab**
4. **Inference/evvaluate on Jetson device**

## 1.Dataset

### Collect manually

- It is recommended that:
	- ==Cover all angles== (360 degrees) of the object
	- Place the object in ==different environments, different lighting and different weather conditions==.
- e.g.
	![](https://files.seeedstudio.com/wiki/YOLOV5/pink-flowers-2.gif)	
	1. morning normal weather
	2. morning windy weather
	3. Morning rainy weather
	4. Noon normal weather
	5. Noon windy weather
	6. Noon rainy weather
	7. Evening normal weather
	8. Evening windy weather
	9. Evening rainy weather

**Note:** Later on, we will **convert this video footage into a series of images** to make up the dataset for training.

### Use publicly dataset

You can download a number of publically available datasets such as the [COCO dataset](https://cocodataset.org/), [Pascal VOC dataset](http://host.robots.ox.ac.uk/pascal/VOC) and much more.

## 2.Annotating(video for e.g.)

- Note that:
	- **Annotating** means simply drawing rectangular boxes around each object that we want to detect and assign them labels. 
	- Directly **import the video** footage that we recorded before into Roboflow and it will be **exported into a series of images**.
	- It can easily export the labelled dataset into **YOLOV5 PyTorch format** which is what we need

- Step by step guide to use RoboFlow
	- **Step 3.** **Create Public Project**.
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/20.jpg)
	
	- **Step 4.** Drag and drop the video footage that you recorded before
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/4.jpg)
	
	- **Step 5.** Choose a framerate
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/5.png)
	
	- **Step 6.** Click **Finish Uploading**.
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/6.jpg)
	
	- **Step 7.** Click **Assign Images**
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/7.jpg)
	
	- **Step 8.** Annotate.
	
		![](https://files.seeedstudio.com/wiki/YOLOV5/24.jpg)
	
		- Label assistant can help to predict annotations for the 80 classes mentioned.
			
			- ![](https://files.seeedstudio.com/wiki/YOLOV5/41.png)
			
			- ![](https://files.seeedstudio.com/wiki/YOLOV5/39.png)
			
			- ![](https://files.seeedstudio.com/wiki/YOLOV5/40.png)

	
	- **Step 13.** **Add images to Dataset**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/25.jpg)
	
	- **Step 14.** Next split the images between "Train, Valid and Test".**Add Images**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/26.png)
	
	- **Step 15.** **Generate New Version**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/27.jpg)
	
	- **Step 16.** Now you can add **Preprocessing** and **Augmentation** if you prefer. Here we will **delete** the **Resize** option and keep the original image sizes
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/28.jpg)
	
	- **Step 17.** Next, proceed with the remaining defaults and click **Generate**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/29.jpg)
	
	- **Step 18.** Click **Export**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/17.jpg)
	
	- **Step 19.** Select **download zip to computer**, under "Select a Format" choose **YOLO v5 PyTorch** and click **Continue**
	
	![](https://files.seeedstudio.com/wiki/YOLOV5/18.jpg)
	
	- **Step 20.** After that, a **.zip file** will be downloaded to your computer. We will need this .zip file later for our training.

## 3.Training

### a. [x]Use Google Colab with Ultralytics HUB

[Ultralytics HUB](https://hub.ultralytics.com/) is a platform where you can train your models without having to know a single line of code. Simply upload your data to Ultralytics HUB, train your model and deploy it into the real world! It is fast, simple and easy to use. Anyone can get started!

- **Step 1.** Visit [this link](https://hub.ultralytics.com/) to sign up for a free Ultralytics HUB account
    
- **Step 2.** Enter your credentials and **sign up with email** or sign up directly with a **Google, GitHub or Apple account**
    

![](https://files.seeedstudio.com/wiki/YOLOv5-2/1.png)

After you login to Ultralytics HUB, you will see the dashboard as follows

![](https://files.seeedstudio.com/wiki/YOLOv5-2/2.png)

- **Step 3.** Extract the zip file that we downloaded before from Roboflow and put all the included files inside a new folder
    
- **Step 4.** Make sure your **dataset yaml** and **root folder** (the folder we created before) share the same name. For example, if you name your yaml file as **pinkflowers.yaml**, the root folder should be named as **pinkflowers**.
    
- **Step 5.** Open **pinkflowers.yaml** file and edit **train** and **val** directories as follows
    

```
train: train/imagesval: valid/images
```

- **Step 6.** Compress the root folder as a **.zip** and name it the same as the root folder (**pinkflowers.zip** in this example)

Now we have prepared the dataset which is ready to be uploaded to Ultalytics HUB.

- **Step 7.** Click on the **Datasets** tab and click **Upload Dataset**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/6.jpg)

- **Step 8.** Enter a **Name** for the dataset, enter a **Description** if needed, drag and drop the .zip file that we created before under **Dataset** field and click **Upload Dataset**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/24.png)

- **Step 9.** After the datset is uploaded, click on the dataset to view more insights into the dataset

![](https://files.seeedstudio.com/wiki/YOLOv5-2/25.png)

- **Step 10.** Click on the **Projects** tab and click **Create Project**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/5.jpg)

- **Step 11.** Enter a **Name** for the project, enter a **Description** if needed, add a **cover image** if needed, and click **Create Project**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/26.png)

- **Step 12.** Enter the newly created project and click **Create Model**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/27.png)

- **Step 13.** Enter a **Model name**, choose **YOLOv5n** as the pretrained model, and click **Next**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/28.png)

**Note:** Usually **YOLOv5n6** is preferred as the pretrained model because it is suitable to be used for edge devices such as the Jetson platform. However, Ultralytics HUB still does not have the support for it. So we use **YOLOv5n** which is a slightly similar model.

- **Step 14.** Choose the dataset that we uploaded before and click **Next**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/29.png)

- **Step 15.** Choose **Google Colab** as the training platform and click the **Advanced Options** drop-down menu. Here we can change some settings for training. For example, we will change the number of epochs from 300 to 100 and keep the other settings as they are. Click **Save**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/30.png)

**Note:** You can also choose **Bring your own agent** if you are planning to perform local training

- **Step 16.** Copy the **API key** and click **Open Colab**

![](https://files.seeedstudio.com/wiki/YOLOv5-2/31.png)

- **Step 17.** Replace **MODEL_KEY** with the **API key** that we copied before

![](https://files.seeedstudio.com/wiki/YOLOv5-2/16.jpg)

- **Step 18.** Click `Runtime > Rull All` to run all the code cells and start the training process

![](https://files.seeedstudio.com/wiki/YOLOv5-2/17.jpg)

- **Step 19.** Come back to Ultralytics HUB and click **Done** when it turns blue. You will also see that Colab shows as **Connected**.

![](https://files.seeedstudio.com/wiki/YOLOv5-2/32.png)

Now you will see the training progress on the HUB

![](https://files.seeedstudio.com/wiki/YOLOv5-2/33.png)

- **Step 20.** After the training is finished, click PyTorch to download the trained model in PyTorch format. PyTorch is the format that we need in order to perform inference on the Jetson device

![](https://files.seeedstudio.com/wiki/YOLOv5-2/37.png)

**Note:** You can also export into other formats as well which are displayed under **Formats**

If you go back to Google Colab, you can see more details as follows:

![](https://files.seeedstudio.com/wiki/YOLOv5-2/36.png)

Here the accuracy `mAP@.5` is about 90% and 99.4% for leaf and flower respectively, while the total accuracy `mAP@.5` is about 94.7%.

### b. [x]Use Google Colab with Roboflow api

Here we use a Google Colaboratory environment to perform training on the cloud. Furthermore, we use Roboflow api within Colab to easily download our dataset.

- **Step 1.** Click [here](https://colab.research.google.com/gist/lakshanthad/645de50b7cc5870f4070b720be770f8b/yolov5-training-for-jetson.ipynb) to open an already prepared Google Colab workspace and go through the steps mentioned in the workspace

![](https://files.seeedstudio.com/wiki/YOLOV5/82.png)

After the training is done, you will see an output as follows:

![](https://files.seeedstudio.com/wiki/YOLOV5/37.png)

Here the accuracy `mAP@.5` is about 91.6% and 99.4% for leaf and flower respectively, while the total accuracy `mAP@.5` is about 95.5%.

- **Step 2.** Under **Files** tab, if you navigate to `runs/train/exp/weights`, you will see a file called **best.pt**. This is the generated model from training. Download this file and copy to your Jetson device because this is the model we are going to use later for inferencing on the Jetson device.

![](https://files.seeedstudio.com/wiki/YOLOV5/52.png)

### c. [√]Use local PC

Here you can use a PC with a Linux OS for training. We have used an Ubuntu 20.04 PC for this wiki.

- **Step 1.** Clone the **YOLOv5 repo** and install **requirements.txt** in a **Python>=3.7.0** environment

```
git clone https://github.com/ultralytics/yolov5 cd yolov5pip install -r requirements.txt
```

- **Step 2.** Copy and paste the .zip file that we downloaded before from Roboflow into **yolov5** directory and extract it

```
# examplecp ~/Downloads/pink-flowers.v1i.yolov5pytorch.zip ~/yolov5unzip pink-flowers.v1i.yolov5pytorch.zip
```

- **Step 3.** Open **data.yaml** file and edit **train** and **val** directories as follows

```
train: train/imagesval: valid/images
```

- **Step 4.** Execute the following to start training

```
python3 train.py --data data.yaml --img-size 640 --batch-size -1 --epoch 100 --weights yolov5n6.pt
```

Since our dataset is relatively small (~500 images), **transfer learning** is expected to produce better results than training from scratch. Our model was initialized with weights from a pre-trained COCO model, by passing the name of the model (yolov5n6) to the ‘weights’ argument. Here we used **yolov5n6** because it is ideal for edge devices. Here the **image size** is set to **640x640**. We use **batch-size** as **-1** because that will automatically determine the best batch size. However, if there is an error which says "GPU memory not enough", choose batch size as **32**, or even **16**. You can also change **epoch** according to your preference.

After the training is done, you will see an output as follows:

![](https://files.seeedstudio.com/wiki/YOLOV5/65.png)

Here the accuracy `mAP@.5` is about 90.6% and 99.4% for leaf and flower respectively, while the total accuracy `mAP@.5` is about 95%.

- **Step 5.** If you navigate to `runs/train/exp/weights`, you will see a file called **best.pt**. This is the generated model from training. Copy and paste this file to your Jetson device because this is the model we are going to use later for inferencing on the Jetson device.

![](https://files.seeedstudio.com/wiki/YOLOV5/33.jpg)

## 4.Inference

### Using TensorRT[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#using-tensorrt "Direct link to Using TensorRT")

Now we will use a Jetson device to perform inference (detect objects) on images with the help of the model generated from our training before. Here we will use [NVIDIA TensorRT](https://developer.nvidia.com/tensorrt) to increase the inference performance on the Jetson platform

- **Step 1.** Access the terminal of Jetson device, install pip and upgrade it

```
sudo apt updatesudo apt install -y python3-pippip3 install --upgrade pip
```

- **Step 2.** Clone the following repo

```
git clone https://github.com/ultralytics/yolov5
```

- **Step 3.** Open **requirements.txt**

```
cd yolov5vi requirements.txt
```

- **Step 4.** Edit the following lines. Here you need to press **i** first to enter editing mode. Press **ESC**, then type **:wq** to save and quit

```
matplotlib==3.2.2numpy==1.19.4# torch>=1.7.0# torchvision>=0.8.1
```

**Note:** We include fixed versions for **matplotlib** and **numpy** to make sure there are no errors when running YOLOv5 later. Also, torch and torchvision are excluded for now because they will be installed later.

- **Step 5.** install the below dependency

```
sudo apt install -y libfreetype6-dev
```

- **Step 6.** Install the necessary packages

```
pip3 install -r requirements.txt
```

- **Step 7.** Install torch

```
cd ~sudo apt-get install -y libopenblas-base libopenmpi-devwget https://nvidia.box.com/shared/static/fjtbno0vpo676a25cgvuqc1wty0fkkg6.whl -O torch-1.10.0-cp36-cp36m-linux_aarch64.whlpip3 install torch-1.10.0-cp36-cp36m-linux_aarch64.whl
```

- **Step 8.** Install torchvision

```
sudo apt install -y libjpeg-dev zlib1g-devgit clone --branch v0.9.0 https://github.com/pytorch/vision torchvisioncd torchvisionsudo python3 setup.py install 
```

- **Step 9.** Clone the following repo

```
cd ~git clone https://github.com/wang-xinyu/tensorrtx
```

- **Step 10.** Copy **best.pt** file from previous training into **yolov5** directory
    
- **Step 11.** Copy **gen_wts.py** from **tensorrtx/yolov5** into **yolov5** directory
    

```
cp tensorrtx/yolov5/gen_wts.py yolov5
```

- **Step 12.** Generate **.wts** file from PyTorch with **.pt**

```
cd yolov5python3 gen_wts.py -w best.pt -o best.wts
```

- **Step 13.** Navigate to **tensorrtx/yolov5**

- **Step 14.** Open **yololayer.h** with **vi text editor**

- **Step 15.** Change **CLASS_NUM** to the number of classes your model is trained. In our example, it is 2

- **Step 16.** Create a new **build** directory and navigate inside

- **Step 17.** Copy the previously generated **best.wts** file into this **build** directory

- **Step 18.** Compile it

- **Step 19.** Serialize the model

```
sudo ./yolov5 -s [.wts] [.engine] [n/s/m/l/x/n6/s6/m6/l6/x6 or c/c6 gd gw]#examplesudo ./yolov5 -s best.wts best.engine n6
```

Here we use **n6** because that is recommended for edge devices such as the NVIDIA Jetson platform. However, if you use Ultralytics HUB to set up training, you can only use **n** because **n6** not yet supported by the HUB.

- **Step 20.** Copy the images that you want the model to detect into a new folder such as **tensorrtx/yolov5/images**
    
- **Step 21.** Deserialize and run inference on the images as follows
    

```
sudo ./yolov5 -d best.engine images
```

Below is a comparison of inference time running on Jetson Nano vs Jetson Xavier NX.

#### Jetson Nano[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#jetson-nano "Direct link to Jetson Nano")

Here quantization is set to FP16

![](https://files.seeedstudio.com/wiki/YOLOV5/58.png)

From the above results, we can take the average as about **47ms**. Converting this value to frames per second: 1000/47 = 21.2766 = **21fps**.

#### Jetson Xavier NX[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#jetson-xavier-nx "Direct link to Jetson Xavier NX")

Here quantization is set to FP16

![](https://files.seeedstudio.com/wiki/YOLOV5/59.jpg)

From the above results, we can take the average as about **20ms**. Converting this value to frames per second: 1000/20 = **50fps**.

Also, the output images will be as follows with the objects detected:

![](https://files.seeedstudio.com/wiki/YOLOV5/55.jpg)

![](https://files.seeedstudio.com/wiki/YOLOV5/56.jpg)

### Using TensorRT and DeepStream SDK[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#using-tensorrt-and-deepstream-sdk "Direct link to Using TensorRT and DeepStream SDK")

Here we will use [NVIDIA TensorRT](https://developer.nvidia.com/tensorrt) along with [NVIDIA DeepStream SDK](https://developer.nvidia.com/deepstream-sdk) to perform inference on a video footage

- **Step 1.** Make sure you have properly installed all the **SDK Components** and **DeepStream SDK** on the Jetson device. (check [this wiki](https://wiki.seeedstudio.com/Tutorial-of-A20X-Carrier-Boards) for a reference on installation)

**Note:** It is recommended to use NVIDIA SDK Manager to install all the SDK components and DeepStream SDK

- **Step 2.** Access the terminal of Jetson device, install pip and upgrade it

```
sudo apt updatesudo apt install -y python3-pippip3 install --upgrade pip
```

- **Step 3.** Clone the following repo

```
git clone https://github.com/ultralytics/yolov5
```

- **Step 4.** Open **requirements.txt**

```
cd yolov5vi requirements.txt
```

- **Step 5.** Edit the following lines. Here you need to press **i** first to enter editing mode. Press **ESC**, then type **:wq** to save and quit

```
matplotlib==3.2.2numpy==1.19.4# torch>=1.7.0# torchvision>=0.8.1
```

**Note:** We include fixed versions for **matplotlib** and **numpy** to make sure there are no errors when running YOLOv5 later. Also, torch and torchvision are excluded for now because they will be installed later.

- **Step 6.** install the below dependency

```
sudo apt install -y libfreetype6-dev
```

- **Step 7.** Install the necessary packages

```
pip3 install -r requirements.txt
```

- **Step 8.** Install torch

```
cd ~sudo apt-get install -y libopenblas-base libopenmpi-devwget https://nvidia.box.com/shared/static/fjtbno0vpo676a25cgvuqc1wty0fkkg6.whl -O torch-1.10.0-cp36-cp36m-linux_aarch64.whlpip3 install torch-1.10.0-cp36-cp36m-linux_aarch64.whl
```

- **Step 9.** Install torchvision

```
sudo apt install -y libjpeg-dev zlib1g-devgit clone --branch v0.9.0 https://github.com/pytorch/vision torchvisioncd torchvisionsudo python3 setup.py install 
```

- **Step 10.** Clone the following repo

```
cd ~git clone https://github.com/marcoslucianops/DeepStream-Yolo
```

- **Step 11.** Copy **gen_wts_yoloV5.py** from **DeepStream-Yolo/utils** into **yolov5** directory

```
cp DeepStream-Yolo/utils/gen_wts_yoloV5.py yolov5
```

- **Step 12.** Inside the yolov5 repo, download **pt file** from YOLOv5 releases (example for YOLOv5s 6.1)

```
cd yolov5wget https://github.com/ultralytics/yolov5/releases/download/v6.1/yolov5s.pt
```

- **Step 13.** Generate the **cfg** and **wts** files

```
python3 gen_wts_yoloV5.py -w yolov5s.pt
```

**Note**: To change the inference size (defaut: 640)

```
-s SIZE--size SIZE-s HEIGHT WIDTH--size HEIGHT WIDTHExample for 1280:-s 1280or-s 1280 1280
```

- **Step 14.** Copy the generated **cfg** and **wts** files into the **DeepStream-Yolo** folder

```
cp yolov5s.cfg ~/DeepStream-Yolocp yolov5s.wts ~/DeepStream-Yolo
```

- **Step 15.** Open the **DeepStream-Yolo** folder and compile the library

```
cd ~/DeepStream-Yolo# For DeepStream 6.1CUDA_VER=11.4 make -C nvdsinfer_custom_impl_Yolo# For DeepStream 6.0.1 / 6.0CUDA_VER=10.2 make -C nvdsinfer_custom_impl_Yolo
```

- **Step 16.** Edit the **config_infer_primary_yoloV5.txt** file according to your model

```
[property]...custom-network-config=yolov5s.cfgmodel-file=yolov5s.wts...
```

- **Step 17.** Edit the **deepstream_app_config** file

```
...[primary-gie]...config-file=config_infer_primary_yoloV5.txt
```

- **Step 18.** Run the inference

```
deepstream-app -c deepstream_app_config.txt
```

![](https://files.seeedstudio.com/wiki/YOLOV5/FP32-yolov5s.gif)

The above result is running on **Jetson Xavier NX** with **FP32** and **YOLOv5s 640x640**. We can see that the **FPS** is around **30**.

#### INT8 Calibration[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#int8-calibration "Direct link to INT8 Calibration")

If you want to use INT8 precision for inference, you need to follow the steps below

- **Step 1.** Install OpenCV

```
sudo apt-get install libopencv-dev
```

- **Step 2.** Compile/recompile the **nvdsinfer_custom_impl_Yolo** library with OpenCV support

```
cd ~/DeepStream-Yolo# For DeepStream 6.1CUDA_VER=11.4 OPENCV=1 make -C nvdsinfer_custom_impl_Yolo# For DeepStream 6.0.1 / 6.0CUDA_VER=10.2 OPENCV=1 make -C nvdsinfer_custom_impl_Yolo
```

- **Step 3.** For COCO dataset, download the [val2017](https://drive.google.com/file/d/1gbvfn7mcsGDRZ_luJwtITL-ru2kK99aK/view?usp=sharing), extract, and move to **DeepStream-Yolo** folder
    
- **Step 4.** Make a new directory for calibration images
    

- **Step 5.** Run the following to select 1000 random images from COCO dataset to run calibration

```
for jpg in $(ls -1 val2017/*.jpg | sort -R | head -1000); do \    cp ${jpg} calibration/; \done
```

**Note:** NVIDIA recommends at least 500 images to get a good accuracy. On this example, 1000 images are chosen to get better accuracy (more images = more accuracy). Higher INT8_CALIB_BATCH_SIZE values will result in more accuracy and faster calibration speed. Set it according to you GPU memory. You can set it from **head -1000**. For example, for 2000 images, **head -2000**. This process can take a long time.

- **Step 6.** Create the **calibration.txt** file with all selected images

```
realpath calibration/*jpg > calibration.txt
```

- **Step 7.** Set environment variables

```
export INT8_CALIB_IMG_PATH=calibration.txtexport INT8_CALIB_BATCH_SIZE=1
```

- **Step 8.** Update the **config_infer_primary_yoloV5.txt** file

From

```
...model-engine-file=model_b1_gpu0_fp32.engine#int8-calib-file=calib.table...network-mode=0...
```

To

```
...model-engine-file=model_b1_gpu0_int8.engineint8-calib-file=calib.table...network-mode=1...
```

- **Step 9.** Run the inference

```
deepstream-app -c deepstream_app_config.txt
```

![](https://files.seeedstudio.com/wiki/YOLOV5/INT8-yolov5s.gif)

The above result is running on **Jetson Xavier NX** with **INT8** and **YOLOv5s 640x640**. We can see that the **FPS** is around **60**.

#### Benchmark results[​](about:reader?url=https%3A%2F%2Fwiki.seeedstudio.com%2FYOLOv5-Object-Detection-Jetson%2F#benchmark-results "Direct link to Benchmark results")

The following table summarizes how different models perform on **Jetson Xavier NX**.

|Model Name|Precision|Inference Size|Inference Time (ms)|FPS|
|---|---|---|---|---|
|YOLOv5s|FP32|320x320|16.66|60|
|FP32|640x640|33.33|30|
|INT8|640x640|16.66|60|
|YOLOv5n|FP32|640x640|16.66|60|


## Bonus: Training time comparison

|Dataset|Number of training samples|Training time on Local PC (GTX 1660 Super)|Training time on Google Colab (NVIDIA Tesla K80)|
|---|---|---|---|
|Custom|542|2.2 hours|1.3 hours|
||240|1 hour|42 minutes|
|Pascal VOC 2012|17112|83 hours|15 hours|
|Microsoft COCO 2017|121408|750 hours|125 hours|

