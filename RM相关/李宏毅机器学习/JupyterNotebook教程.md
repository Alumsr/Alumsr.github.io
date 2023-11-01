---
link: https://blog.csdn.net/qq_27825451/article/details/84427269
dg-publish: true
---
- 当你执行一个单元格后，其变量和函数定义会被保存在内存中。
- 当单元格经过编辑/文件重新打开以后,该单元格生成并储存的所有变量丢失,需要重新执行
- “清除输出”选项不会使单元格中定义的变量丢失。
- 快捷键
	- `<c-cr>` excute code block
	- `<m-cr>` create a code block below
	- `<c-s-cr>` create a code block above
	- 导航: in `<esc>` normal mode
		- `<J> <K>` previous/next block
		- `<M>` markdown mode
		- `<Y>` code mode
		- `<cr>` insert mode
- Jupyter notebook 安装
	- miniconda自带Jupyter依赖项,但不含本体,需要另外安装
	- 方法1
		1. 进入虚拟环境 `conda active env_name`
		2. 安装Jupyter `conda install jupyter notebook` (pip也行)
		3. 启动Jupyter `jupyter notebook`
	- 方法2:使用VScode的Jupyter插件(集成Jupyter notebook,可在VScode中编辑`.ipynb`)
- 