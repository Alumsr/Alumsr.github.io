

- AP：Average Precision，平均精度
	- 对于每个类别，计算其 [precision-recall 曲线](precision-recall 曲线)下的面积，即为 AP
	- AP 越大，说明模型的效果越好
- **mAP**：mean Average Precision，平均精度均值
	- 对于每个类别，计算其 AP，然后对所有类别的 AP 求平均值，即为 mAP