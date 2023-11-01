---
link: https://developer.aliyun.com/article/944352
dg-publish: true
---
[到底怎么用???](使用setup.py和requirements.txt(TLDR))

## 依赖关系是什么？

- 依赖项是我们为了完成工作而在我们的 Python 项目中所依赖的外部 Python 包。
- 在 Python 中，这些依赖通常可以在 Python 包索引（PyPI）或其他的管理工具中找到（例如 `Nexus`）。 

- 每一个依赖项本身就是一个 Python 包，它也可能有其他的依赖项。

- 当项目中（至少）有两个依赖项同时依赖于另一个包，而且每一依赖项都需要该外部包的特定版本的情况下，可能会导致**依赖冲突**的出现。

- 一般情况下，我们通过一个 `requirements.txt` 文本文件指定依赖项

## requirements.txt 文件

- `requirements.txt` 只是一个列出一个特定 Python 项目的所有依赖项的文件吗？如前所述，他还可以包含依赖项的依赖项。

- `requirements.txt` 示例

	```python
	matplotlib>=2.2
	numpy>=1.15.0, <1.21.0
	pandas
	pytest==4.0.1
	```

  

- 之后，可以使用以下命令通过 `pip` 安装这些依赖项（通常在虚拟环境中）
	- `pip install -r requirements.txt`

- 使用>=，\==等运算符限定 Python 依赖包的版本。 

- 对于没有限定版本的包，`pip` 通常会安装最新版本。

- `pip freeze`列出所有的包及其指定版本。

- 针对个人项目的开发，通常情况下`requirements.txt` 非常有用。

## Python 中的 setuptools

[setuptools](https://setuptools.pypa.io/en/latest/)包基于 `distutils` 构建

- 它用于开发和发布 Python 包。(另外它还提供了使依赖管理更容易的功能)

- 发布一个包通常需要包的**元数据**，包括**包名称，版本，依赖项，入口点**等。

- 元数据和可选项可以在 `setup.py` 文件中定义,例:

	```python
	
	from setuptools import setup
	
	setup(    
	
	    name='mypackage',
	
	    author='Giorgos Myrianthous',
	
	    version='0.1',    
	
	    install_requires=['pandas','numpy','matplotlib',],    
	
	)
	
	```

  

- 事实上，这被认为是一个糟糕的设计，因为该文件是纯粹的声明性文件。

- 更好的方法
	1. 在 `setup.cfg` 定义这些可选项和元数据
	2. 在 `setup.py` 调用 `setup()` 

- 例子
	- `setup.cfg`：
	
		```python
		[metadata]  # 这行代码代表我们将定义元数据
		name = mypackage
		version = 0.1
		author = Giorgos Myrianthous
		install_requires =
		    pandas
		    numpy
		    matplotlib
		```
	- `setup.py`：
	
		```python
		from setuptools import setup
		if __name__ == "__main__":
		    setup()
		```

- `setup.cfg` 的 `install_requires` 参数是一个**依赖项列表**,可包含**运算符**（包括 `\<`, `>`, `\<=`, `>=`, `==` 和 `!=` 这些运算符）和**版本标识符**。

- 当项目安装时，不在环境中指定的依赖将会从  `PyPI` (默认情况下)下载并安装。

## 我们同时需要 requirements.txt 和 setup.py/setup.cfg 文件吗

1. 在何时仅使用一种?
	- 如果你的包主要用于开发目的，而且你不打算重新发布它，`**requirements.txt**` **是足够的**（即使包是在多台机器上开发的）。
	- 如果软件包仅由你自己开发（即是在单台机器上）但您打算重新发布它，那么 `**setup.py**`**/**`**setup.cfg**`**就足够了**。
	- 如果你的包是在多台机器上开发的并且还需要重新发布它，那么将**同时需要** `**requirements.txt**` **和** `**setup.py**` **/** `**setup.cfg**` **文件**。

2. 同时使用 `requirements.txt` 和 `setup.py`/`setup.cfg` （几乎都是如此）
	- 需要确保不重复。
	- `**setup.py**`（`**setup.cfg**`）需要包含抽象依赖项列表
	- `requirements.txt` 所包含的确切依赖项必须使用`==`来指定限制包版本。

- 发布包是什么意思？
	- 发布包意味着你将你的包发布到 `PyPI` 或者其他的包索引中，以便其他人可以通过 `pip` 包管理器来安装它.

- 差异
	- `install_requires`（例如 `setup.py`）定义了单个项目的依赖关系;[`requirements.txt`](https://pip.pypa.io/en/latest/user_guide/#requirements-files)通常用于定义完整 Python 环境的依赖关系。
	- `install_requires` 要求很少;`requirements.txt` 通常需要包含详尽的固定版本列表，以实现完整环境的可重复安装