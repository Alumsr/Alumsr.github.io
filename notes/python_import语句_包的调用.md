---
link: https://zhuanlan.zhihu.com/p/63143493
---
关联:[[Python包,库,模块简介]]

---
- 文件结构

	```text
	Tree
	|____ m1.py
	|____ m2.py
	|____ Branch
	     |____m3.py
	     |____m4.py
	```



- 方法一:`import module`
	- python会在两个地方寻找模块
		1. sys.path目录
			- 用`import sys; print(sys.path)`语句列出sys.path目录内容
			- 模块会在**安装**时自动添加到`sys.path`中,直接import即可
		3. 命令执行所在的目录(工作目录)
	- 最好不要用上述方法导入同一目录下的文件
		- 以下例子会执行失败
			- m1.py: `from Branch import m3`
			- m3.py: `import m4`
		- 原因:工作目录始终是`Tree`,无法访问`Branch`

- 方法二:`from... import...`
	1. 从包中导入模块
	2. 从模块中导入对象

- 绝对导入和相对导入
	- 相对导入
		- `.` 表示当前模块所在目录
		- `..`表示上一级目录
		- 例:`import .pkg.module`
	- [[python_运行入口文件]]需要使用绝对导入

- 别名:`import ... as alias`

