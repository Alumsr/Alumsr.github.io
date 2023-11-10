---
link: python中的模块、库、包有什么区别？ - 风影忍着的回答 - 知乎https://www.zhihu.com/question/30082392/answer/2030353759
---
相关:[[包的构建]]

---
- 模块（module）
	- 模块(Modules) 是一个Python程序，即`.py`文件。
	- 其他可作为module的文件类型
		- .so(Linux动态链接库)
		- .pyo
		- .pyc
		- .dll
		- .pyd
	- 作用
		- 有效地避免[命名空间](https://www.zhihu.com/search?q=%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A2030353759%7D)冲突
		- 利于封装和抽象

- 包（package）
	1. 它是一个存放包或模块的文件夹
	2. 含有`__init__.py`模块
	3. 导入包时会导入它的`__init__.py`模块
	4. [[python_import语句_包的调用]]


- 库
	- **库(library)表示可重复利用的代码**。别人写好了，拿过来白嫖一下，我自己也可以写个自定义的库(library)。不管是复杂还是简单，
	- 只要是一个可重复使用的代码，都可以称为库(library)。比如大家常用的re,json,numpy，pandas
