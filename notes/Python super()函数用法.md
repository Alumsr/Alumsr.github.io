---
link: https://www.runoob.com/python/python-func-super.html
---
## 描述

- **super()** 函数是用于**调用父类方法**的函数。
	- 类在继承时,如果重定义某个方法，父类的同名方法会被覆盖

### 语法

```python
super().parentMethod
```

## 实例

```python
class A:
	def add(self, x): 
		y = x+1 print(y) 

class B(A): 
	def add(self, x): 
		super().add(x) 

b = B() 
b.add(2)
```

## 更进一步
- [多继承情况的super()用法](https://blog.csdn.net/wanzew/article/details/106993425)
- [super()到底是什么?](https://mozillazg.com/2016/12/python-super-is-not-as-simple-as-you-thought.html)