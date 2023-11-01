- 使用`imshow()`函数：
	- 参数`cmap`控制颜色的映射
		- **viridis**（默认）：从紫色到黄色渐变。
		- **cividis**：从紫色到黄色渐变，适合色盲。
		- **plasma**：从蓝色到红色渐变。
		- **coolwarm**：适用于显示正负数据值的差异，颜色从蓝色到红色渐变。
		- **gray**：单通道（灰度）图像，从黑到白。

```python
import numpy as np
import matplotlib.pyplot as plt

# 创建一个示例的NumPy数组表示图像
image_data = np.array([[0, 1, 2, 3],
                      [4, 5, 6, 7],
                      [8, 9, 10, 11],
                      [12, 13, 14, 15]])

# 使用imshow函数显示图像
plt.imshow(image_data, cmap='viridis')  # cmap参数用于指定颜色映射

# 显示图像
plt.show()
```