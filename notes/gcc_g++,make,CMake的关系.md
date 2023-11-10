---
link: https://www.bysimon.top/?p=61
---
- GCC: Gnu Compiler Collection,编译器集合
- [gcc/g++](https://www.zhihu.com/question/20940822/answer/1942335273): GCC中的编译命令
	- 实际上是driver(驱动器)
	- 负责调用(真)编译器等工具,将源码转为机器码
		- C--cc1编译器
		- C++--cc1plus编译器
	- gcc/g++区别:调用的编译器以及传递的参数不同
		- g++
			1. 将`.c .cpp`当作C++语言,调用cc1plus
			2. 默认链接C++标准库(通过调用链接器)
		- gcc
			1. 将`.c`当作C语言,调用cc1
			2. 默认不链接C++标准库
	- driver一般会根据文件后缀确定源码语言
	- gcc/g++的不足
		- 每条命令需要手敲,太麻烦
		- 项目过多的依赖项会很棘手
- make
	- 功能:调用gcc/g++的批处理工具
	- Makefile
		- 文本文件,包含要执行的gcc/g++命令
		- 不足
			- 每个目录下都需要写一遍
			- 跨平台需重写
- CMake
	- 功能:方便地生成Makefile
	- CMakeList.txt
		- 是一系列命令的合集
		- 用于调用make工具生成Makefile
		- 需要手写
- IDE
	- 有的IDE可以自动生成CMakeList.txt文件

- 总结
	- [[gcc,make和cmake关系图.canvas|gcc,make和cmake关系图]]