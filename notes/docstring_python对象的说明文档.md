- python模块的说明文档在文件开头

	```python
	# demo.py
	'''
	模块的说明文档放在这里。
	'''
	```

	- `__doc__`:访问自身的说明文档：
	
		```python
		import demo
		print(demo.__doc__)
		```

- python函数的说明文档在函数定义之后

	```python
	def func():
		'''
		docstring
		'''
		# body
	```

- 在调用对象时,按住\<Ctrl\>+鼠标悬浮可以访问对象的docstring