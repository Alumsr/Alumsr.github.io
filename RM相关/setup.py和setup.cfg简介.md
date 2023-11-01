---
link: https://zhuanlan.zhihu.com/p/276461821
dg-publish: true
---
关联:
- [[setup.py和requirements.txt对比介绍]]
- [[使用setup.py和requirements.txt(TLDR)]]


TLDR
---

1. 为什么打包分发项目
	- 方便他人使用,无需关心部署细节
	- 是标准化项目分发方式

2. 包分发的进化
	1. 包分发的始祖:Distutils
		- Python标准库,用于开发、构建和发布Python包
		- 编写setup.py作为指导脚本
	1. 分发工具升级:**Setuptools**(`setup.py`)
		- Distutils升级版,支持更多功能
		- 不在标准库中,需要单独安装
		- 替代Distutils成为主流分发工具
	2. Setuptools的辅助工具:**PBR**(`setup.cfg`)
		- 读取setup.cfg生成setup.py参数
		- 提取元数据自动生成setup信息
	- 总之,`setup.py`和`setup.cfg`:
		- 描述Python项目的元数据和配置,用于项目的构建、安装和部署。
		- `setup.py`负责核心配置和操作
		- `setup.cfg`作为补充提供更多配置选项。

2. 源码包与二进制包区别
	- 源码包:解压编译安装,跨平台但速度慢
	- 二进制包:直接解压运行,针对平台但速度快

3. Eggs与Wheels格式对比
	- Eggs由Setuptools引入,Wheels由PEP427标准化
	- Wheels解决了Eggs部分问题,成为标准格式

4. 使用SetupTools
	1. 使用Setuptools打包项目
		- setup.py描述软件元数据和配置
		- MANIFEST.in控制文件分发
		- 工程结构find_packages自动收集
	
	2. 使用Setuptools构建包
		- sdist源码包
		- bdist_xxx二进制包
		- egg/wheel标准格式包
	
	3. 使用Setuptools安装包
		- python setup.py install 系统安装  
		- python setup.py develop 开发模式安装

5. 将包发布到PyPI
    - 注册账号
    - 测试安装前用register
    - release后使用twine或upload上传源码包