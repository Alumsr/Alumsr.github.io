---
link: https://zhuanlan.zhihu.com/p/550021453
dg-publish: true
---


LabelImg, the popular image annotation tool created by Tzutalin with the help of dozens contributors, is **no longer actively being developed** and has become part of the **Label Studio** community. 

---
# Introduce Label Studio
Check out [Label Studio](https://github.com/heartexlabs/label-studio), the most flexible open source data labeling tool for images, text, hypertext, audio, video and time-series data. [Install](https://labelstud.io/guide/install.html) Label Studio and join the [slack community](https://label-studio.slack.com/) to get started.

# ### Install Label Studio
- Conda
	```bash
	conda create --name label-studio
	conda activate label-studio
	conda install psycopg2
	pip install label-studio
	```
- Pip
	```bash
	# Requires Python >=3.8
	pip install label-studio
	
	# Start the server at http://localhost:8080
	label-studio
	```

### Moreover...
- [x] [Quick start](https://www.bilibili.com/video/BV1dL41147KE/)
- [ ] [Integrate ML framework with Label Studio](https://www.youtube.com/watch?v=43Ph805ukEc)