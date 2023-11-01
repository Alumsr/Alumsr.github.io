---
link: https://zhuanlan.zhihu.com/p/150124330
dg-publish: true
---

# 注意事项

- 安装时的名称`opencv_python`
- 导入`import cv2`
- OpenCV依赖一些库,如numpy等,(可能)需要另外手动安装

# 安装OpenCV的两种方法

### 1、whl安装包

先去[官网](https://link.zhihu.com/?target=https%3A//www.lfd.uci.edu/~gohlke/pythonlibs/%23opencv)下载相应Python版本的OpenCV的whl文件，然后在whl文件所在目录执行:
`pip install opencv_python‑3.4.1‑cp36‑cp36m‑win_amd64.whl`

### 2、pip安装

```
pip install opencv-python
```