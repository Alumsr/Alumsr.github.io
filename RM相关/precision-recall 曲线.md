---
link: https://blog.csdn.net/u013249853/article/details/96132766
dg-publish: true
---
- 现有已打标签且已分类的数据集

|Inst#|Class|Score|Inst#|Class|Score|
|---|---|---|---|---|---|
|1|P|0.9|11|P|0.4|
|2|p|0.8|12|n|0.39|
|3|n|0.7|13|P|0.38|
|4|P|0.6|14|n|0.37|
|5|p|0.55|15|n|0.36|
|6|p|0.54|16|n|0.35|
|7|n|0.53|17|p|0.34|
|8|n|0.52|18|n|0.33|
|9|p|0.51|19|P|0.3|
|10|n|0.505|20|n|0.1|

- 列变量解释
	- `Inst#`是样本序号
	- `Class`是 [[基准真相 ground truth]]，p是positive样本（正例）,n是negative（负例）
	- `score`是模型(分类器)对该样本属于正例的可能性的打分。相当于置信度。
- P-R图像的绘制
	- Precision:模型判断正例中正确比率
	- Recall:模型判断正例的数量/总正例数
	- 设置阈值y，≥y标注为正例，<y标注为负例。
	- 设置n个阈值，得到n种标注结果(P-R对)，评判模型好不好使。
	- 最后能得到若干对precision-recall值,将其描点连线,就是P-R曲线
	- P-R曲线
		- ![](https://img-blog.csdn.net/20160721111312507)


---
[参考](https://blog.csdn.net/teminusign/article/details/51982877)[](https://tarangshah.com/blog/2018-01-27/what-is-map-understanding-the-statistic-of-choice-for-comparing-object-detection-models/)

对，其实最终是mAP