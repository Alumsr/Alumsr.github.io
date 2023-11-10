第一次看到live2D估计是群里看到的,第一次看的感觉就是这个动画看起来很奇怪,有点粗糙,搞不懂这种动画怎么都能火,不过看了一段时间以后,简直是越看越顺眼,在今年1月份的时候,萌生了自己也来做一个live2D的想法,没错,你没看错,这里指的是制作live2D,不是制作live2D模型

这里的制作live2D指的是,实现live2D的基础动画功能,完整实现其骨骼,动作追踪,网格建立,[物理模拟](https://www.zhihu.com/search?q=%E7%89%A9%E7%90%86%E6%A8%A1%E6%8B%9F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

到图元[光栅化](https://www.zhihu.com/search?q=%E5%85%89%E6%A0%85%E5%8C%96&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

操作.

其实说困难吧,也不太困难,说不困难吧,算算也将近花了5个月时间来做.

这么一听瞬间高大上了是不是.

为了方便调试,我预先绘制了一个调试用的人设,这部分用[sai](https://www.zhihu.com/search?q=sai&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

就可以了

1.打个线稿

![](https://picx.zhimg.com/80/v2-eac05329ec218cca187fe7eaa52c56dc_1440w.webp?source=2c26e567)

2.调整一下,上个涩

![](https://picx.zhimg.com/80/v2-3e54766af5d9120fb5fe5b55896d0b04_1440w.webp?source=2c26e567)

3.最麻烦的一步,将每一个图层,导出为独立的png图片

![](https://picx.zhimg.com/80/v2-06937a6572a097a0f9b1e4a3f1ed2a50_1440w.webp?source=2c26e567)

准备工作完成,启动Visual Studio

![](https://picx.zhimg.com/80/v2-4fcffb1fecdb5ef2bd29caca2f3a361c_1440w.webp?source=2c26e567)

现在,我们可以开始来愉快的做live2D了

为此,我们先请出我们可爱的大学本科期间的一本基础教材<<[计算机图形学](https://www.zhihu.com/search?q=%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

>>来开始我们Live2D的基础原理说明

![](https://picx.zhimg.com/80/v2-ba4fe8a5db683031badadb6c190a68d0_1440w.webp?source=2c26e567)

我们先来复习一下图形学的基础

首先,我们先对图元做个定义

1. live2D的所有图形由图元分割
2. 每个图元,由三个不共线的顶点构成,为一个三角形
3. 每个顶点包含x,y坐标,每个由一个float32存储
4. 每个顶点包含u,v[纹理坐标](https://www.zhihu.com/search?q=%E7%BA%B9%E7%90%86%E5%9D%90%E6%A0%87&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

- ,每个坐标范围为0-1.0f,超出范围的坐标视为无效映射坐标,每个由一个float32存储.
- 每个顶点包含一个法向量,表示该顶点所处图元的[法向量](https://www.zhihu.com/search?q=%E6%B3%95%E5%90%91%E9%87%8F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

1. ,法向量由一个x,y,z组成,每个由一个float32存储

上面是图形学渲染中一个非常常用的结构,因为在渲染的过程中,live2D的模型不需要额外的投影变换矩阵进行顶点隐射(或者说使用了[仿射变换](https://www.zhihu.com/search?q=%E4%BB%BF%E5%B0%84%E5%8F%98%E6%8D%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

),也不需要额外的ZBuffer来维护每个顶点的深度(因为我直接使用图层的方式对每个live2D图像进行管理,因此我直接使用[画家算法](https://www.zhihu.com/search?q=%E7%94%BB%E5%AE%B6%E7%AE%97%E6%B3%95&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

对图层进行先后绘制即可),因此,我们可以将重点放在图元如何进行渲染中来.

幸好这也并不是什么很复杂的事情,我们直接使用扫描线[填充算法](https://www.zhihu.com/search?q=%E5%A1%AB%E5%85%85%E7%AE%97%E6%B3%95&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

来填充图元就可以了

![](https://picx.zhimg.com/80/v2-4022ac8df72fc20ad66491d5b6064dbd_1440w.webp?source=2c26e567)

对应[伪代码](https://www.zhihu.com/search?q=%E4%BC%AA%E4%BB%A3%E7%A0%81&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

如下

1.首先我们先计算[扫描线](https://www.zhihu.com/search?q=%E6%89%AB%E6%8F%8F%E7%BA%BF&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的y坐标,设 是一个整数,那么

2.计算直线

与[图元三角形](https://www.zhihu.com/search?q=%E5%9B%BE%E5%85%83%E4%B8%89%E8%A7%92%E5%BD%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

左右交点

3.从左交点开始,逐一计算其映射的

坐标,并用该坐标映射到纹理中的像素,绘制扫描线

因此,当我们加载一个图形到live2D的项目中,其最终会依据一个[2D图元](https://www.zhihu.com/search?q=2D%E5%9B%BE%E5%85%83&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的方式将图像最终显示出来

![](https://picx.zhimg.com/80/v2-c7eae9a6a3780bdec179946599748ee0_1440w.webp?source=2c26e567)

纹理贴图(未绑定图元以前)

![](https://pica.zhimg.com/80/v2-c19defbde1e94299b9e446b07a145770_1440w.webp?source=2c26e567)

绑定了图元后

![](https://pica.zhimg.com/80/v2-e224798681f945b76cc7f2fcf887a164_1440w.webp?source=2c26e567)

由2个图元来完整组成该图形

需要值得一提的是,为了进一步提高图元的渲染质量,在进行u,v纹理坐标隐射之前,笔者使用了[双线性插值](https://www.zhihu.com/search?q=%E5%8F%8C%E7%BA%BF%E6%80%A7%E6%8F%92%E5%80%BC&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

滤波,对[纹理映射](https://www.zhihu.com/search?q=%E7%BA%B9%E7%90%86%E6%98%A0%E5%B0%84&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

关系进一步处理

![](https://picx.zhimg.com/80/v2-038ff414fd4c95d17f9a64d20695c120_1440w.webp?source=2c26e567)

未使用插值滤波

![](https://picx.zhimg.com/80/v2-8879bef879373d9a3fbe84ba5b9c7fee_1440w.webp?source=2c26e567)

使用了插值滤波

图元([三角形](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E5%BD%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

)的填充算法,在Live2D的渲染过程中,图元填充(纹理映射)是整个live2D项目的基石,在完成这一个关键步骤之后,所有的变换,都可以通过一些列的平移,旋转,缩放矩阵的级联并最终应用于顶点变换来完成.

![动图封面](https://picx.zhimg.com/50/v2-0b1901ed42f97460e8d2fed8853e45fb_720w.jpg?source=2c26e567)

到了这一步,我们将之前绘制好的所有图层加载进来,并准备为每一个[图层](https://www.zhihu.com/search?q=%E5%9B%BE%E5%B1%82&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

设定网格(mesh)

![](https://picx.zhimg.com/80/v2-1ae21954f6a9cdaa7082adb8fe88b0d7_1440w.webp?source=2c26e567)

到此,除了为每一个图层设定一个z坐标外,首当其冲要解决的是网格建立的问题,为此,不得不聊一聊著名的Delaunary[三角剖分](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E5%89%96%E5%88%86&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

先来看看定义部分(来自[百度百科](https://www.zhihu.com/search?q=%E7%99%BE%E5%BA%A6%E7%99%BE%E7%A7%91&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

)

【定义】三角剖分：假设

是二维实数域上的[有限点集](https://www.zhihu.com/search?q=%E6%9C%89%E9%99%90%E7%82%B9%E9%9B%86&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)，边 是由点集中的点作为[端点](https://www.zhihu.com/search?q=%E7%AB%AF%E7%82%B9&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)构成的封闭线段， 为 的集合。那么该点集 的一个三角剖分 是一个平面图

,该平面图满足条件：

1、除了端点，平面图中的边不包含点集中的任何点。

2、没有相交边。（边和边没有交叉点）

3、平面图中所有的面都是[三角面](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E9%9D%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

，且所有三角面的合集是[散点集V](https://www.zhihu.com/search?q=%E6%95%A3%E7%82%B9%E9%9B%86V&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的凸包。

![](https://pic1.zhimg.com/80/v2-0479a64e9f50a13e67fd39980f3b8c02_1440w.webp?source=2c26e567)

要满足Delaunay三角剖分的定义，必须符合两个重要的准则：

1、空圆特性：Delaunay三角网是唯一的（任意四点不能共圆），在Delaunay三角形网中任一三角形的外接圆范围内不会有其它点存在。如下图所示：

![](https://pic1.zhimg.com/80/v2-5278ed48f83d0835542e7cb3cff17bd2_1440w.webp?source=2c26e567)

2、最大化最小角特性：在散点集可能形成的三角剖分中，Delaunay三角剖分所形成的三角形的最小角最大。从这个意义上讲，Delaunay[三角网](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E7%BD%91&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

是“最接近于规则化的“的三角网。具体的说是指在两个相邻的三角形构成凸四边形的对角线，在相互交换后，六个内角的最小角不再增大。如下图所示：

  

![动图封面](https://picx.zhimg.com/50/v2-899f882b9c11ed742e8fb2341083b1e0_720w.jpg?source=2c26e567)

以下是Delaunay剖分所具备的优异特性：

1.最接近：以最近的三点形成三角形，且各线段(三角形的边)皆不相交。

2.唯一性：不论从区域何处开始构建，最终都将得到一致的结果。

3.最优性：任意两个[相邻三角形](https://www.zhihu.com/search?q=%E7%9B%B8%E9%82%BB%E4%B8%89%E8%A7%92%E5%BD%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

形成的凸四边形的对角线如果可以互换的话，那么两个三角形六个内角中最小的角度不会变大。

4.最规则：如果将三角网中的每个三角形的最小角进行升序排列，则Delaunay三角网的排列得到的数值最大。

5.区域性：新增、删除、移动某一个顶点时只会影响临近的三角形。

6.具有凸四边形的外壳：三角网最外层的边界形成一个[凸多边形](https://www.zhihu.com/search?q=%E5%87%B8%E5%A4%9A%E8%BE%B9%E5%BD%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的外壳。

在Delaunay三角建立算法中,最著名的有_**Lawson**及_**_Bowyer-Watson_算法**,但lawson算法不论是速度还是实际应用的实用度都不如后者,因此在Live2D中笔者使用了后者作为三角剖分算法

其伪代码如下

1. 构造一个超级三角形，包含所有散点，放入[三角形链表](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E5%BD%A2%E9%93%BE%E8%A1%A8&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

1. 。
2. 将点集中的散点依次插入，在三角形链表中找出外接圆包含插入点的三角形（称为该点的影响三角形），删除影响三角形的公共边，将插入点同影响三角形的全部顶点连接起来，完成一个点在Delaunay三角形链表中的插入。
3. 根据优化准则对局部新形成的三角形优化。将形成的三角形放入Delaunay三角形链表。
4. 循环执行上述第2步，直到所有散点插入完毕。
5. 剔除与超级三角顶点有关的三角形

但上述的伪代码是存在问题的,这个问题发生在后面加上的第五步,这可能导致剔除后产生一个非完整的凸包

![](https://picx.zhimg.com/80/v2-a6309069e09830ba78480b0935c1a8a7_1440w.webp?source=2c26e567)

因此,在第五步剔除三角形之后,应该预先每一个有关顶点,在进行一次判断,以让其满足夹角为[锐角](https://www.zhihu.com/search?q=%E9%94%90%E8%A7%92&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的条件,以生成一个完整的凸包

之后,我们需要依据外围顶点的封闭区域,剔除掉封闭区域之外的三角形,最后建立网格

![动图封面](https://pic1.zhimg.com/50/v2-42ba0f2fe2fe70adcd03d981d8867818_720w.jpg?source=2c26e567)

不管如何,当我们最终完成了[三角剖分算法](https://www.zhihu.com/search?q=%E4%B8%89%E8%A7%92%E5%89%96%E5%88%86%E7%AE%97%E6%B3%95&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

后,我们就可以着手将模型加载进来,正如你所见,每一个实际图层都绑定着一套网格

![](https://picx.zhimg.com/80/v2-f55b91638048ad928757521879e0c6fe_1440w.webp?source=2c26e567)

实际上整个live2D模型,也正是基于顶点变换的基础之上的

![](https://pic1.zhimg.com/80/v2-81b252cd77353235805eb84c9eaf2b88_1440w.webp?source=2c26e567)

而基于这点,我们不入Live2D的下一个话题,[骨骼动画](https://www.zhihu.com/search?q=%E9%AA%A8%E9%AA%BC%E5%8A%A8%E7%94%BB&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

,如果我们摸摸自己的身体,很容易总结出一个道理,在人体中的大部分骨骼,由一个关节节点连接到另一个关节节点上,而基于这点的拓展,我们同样可以为每一个图层设置一个关键的[节点](https://www.zhihu.com/search?q=%E8%8A%82%E7%82%B9&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

![](https://picx.zhimg.com/80/v2-89a885e093837d72ec75e896e9c45edf_1440w.webp?source=2c26e567)

为了简化说明下这个流程,笔者创建了一个三个图层组成的样例,每个图层由一条粗线组成

![](https://picx.zhimg.com/80/v2-5f741dc08aa81f399f5500ff96f247f5_1440w.webp?source=2c26e567)

可以看到,每个图层都由一个关键节点进行控制,图层网格中的所有顶点,都围绕着该关键节点进行旋转,平移,[伸缩变换](https://www.zhihu.com/search?q=%E4%BC%B8%E7%BC%A9%E5%8F%98%E6%8D%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

,连接这些关键的节点,形成一个正确的[骨骼系统](https://www.zhihu.com/search?q=%E9%AA%A8%E9%AA%BC%E7%B3%BB%E7%BB%9F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

![](https://pic1.zhimg.com/80/v2-74d486bf69cd0010484302109157ad09_1440w.webp?source=2c26e567)

在live2D中,骨骼系统满足以下条件

1.所有的图层都有且只有一个节点

2.一个节点如果没有父节点,那么这个节点是根节点

3.一个节点可以有多个子节点,但一个节点最多只能有一个父节点

4.图层中所有的顶点以节点为参考点进行旋转平移缩放

5.[父节点](https://www.zhihu.com/search?q=%E7%88%B6%E8%8A%82%E7%82%B9&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

的任何变换将传递影响影响其所有[子节点](https://www.zhihu.com/search?q=%E5%AD%90%E8%8A%82%E7%82%B9&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

于是,在动画系统中,我们可以通过操作骨骼节点,直接对模型进行动作编辑,它可以等效为一系列矩阵的级联操作-------动画由一系列骨骼节点组成,下一个节点的变换相当于上一个节点的变换加上本节点的变换,相当于一些列矩阵相乘起来,

简单来说就是

根节点的[变换矩阵](https://www.zhihu.com/search?q=%E5%8F%98%E6%8D%A2%E7%9F%A9%E9%98%B5&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

--->骨骼节点的变换矩阵--->顶点的变换矩阵-->额外的物理计算矩阵

![动图封面](https://picx.zhimg.com/50/v2-68af72b21d87e983b876209953a4e596_720w.jpg?source=2c26e567)

至此,我们依照这个原理将整个模型的骨骼连接起来

![](https://pica.zhimg.com/80/v2-c107f5f527c28b193b9d2490c146150f_1440w.webp?source=2c26e567)

这个时候,这个Live2D动画系统成为了一个正宗的纸娃娃动画系统,通过对骨骼节点的控制,我们就可以实现一个纸娃娃动画了

![动图封面](https://pica.zhimg.com/50/v2-fcba8a07169f1faf7ea1b0c0bd166406_720w.jpg?source=2c26e567)

![动图封面](https://picx.zhimg.com/50/v2-07f5a75ca31e572c9891a8ada8d56573_720w.jpg?source=2c26e567)

![动图封面](https://pica.zhimg.com/50/v2-754e6246b7ae3e4a3d6183d502f4af73_720w.jpg?source=2c26e567)

当然,当我们实现了一个[纸娃娃系统](https://www.zhihu.com/search?q=%E7%BA%B8%E5%A8%83%E5%A8%83%E7%B3%BB%E7%BB%9F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

,离live2D已经很接近了,但live2D相较于纸娃娃系统在动画中有更多的细节,你可能已经注意到,在上面的动画中,耳朵与头发有轻微幅度的摆动,这就是live2D中,对于某些顶点在物理上有额外的计算与模拟

我将它称之为弹性节点,通过对整个模型的平移,你可以很容易观察到弹性节点对于那些柔软的补位是如何进行物理模拟的

![动图封面](https://picx.zhimg.com/50/v2-208c8518cda1753447ef7bd45e061c6c_720w.jpg?source=2c26e567)

首先我们知道,每个图层的网格由若干个顶点控制,每个顶点互相连接

![](https://pic1.zhimg.com/80/v2-3fb0645383d9c829b75e074300040152_1440w.webp?source=2c26e567)

那么我们可以认为,对于那些弹性顶点,和静态顶点直接由一个可以视作一个弹簧连接,这样,我们可以直接给出[弹性系数](https://www.zhihu.com/search?q=%E5%BC%B9%E6%80%A7%E7%B3%BB%E6%95%B0&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

,来指定该顶点在动画中的运动规律,注意的是,这里的弹性系数和弹簧的弹力公式中的系数并不一致,为0表示这是一个静态顶点(刚体)

![](https://pic1.zhimg.com/80/v2-5dd98735f4b7f34845955eb0e84bd510_1440w.webp?source=2c26e567)

但多顶点之间级联会导致顶点运算变得非常复杂,因此,我们可以简化上述流程,视作每一个顶点与图层节点相连,距离节点越远,弹性系数越大,同时,运动过程中的阻力衰减也越弱

![](https://picx.zhimg.com/80/v2-2c832be1f2b0bcb35add8adf73a66e64_1440w.webp?source=2c26e567)

那么,剩下我们要做的,就是为这个[弹力公式](https://www.zhihu.com/search?q=%E5%BC%B9%E5%8A%9B%E5%85%AC%E5%BC%8F&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

挑选一个合适的[数学模型](https://www.zhihu.com/search?q=%E6%95%B0%E5%AD%A6%E6%A8%A1%E5%9E%8B&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

了.关于这部分,你可以在PainterEngine Live的代码中找到,笔者就不再进一步讨论了

到这里,有了纸娃娃动画,有了弹性节点,我们终于迎来了制作Live2D最后一个功能,我管它叫动作追踪(Action Tracer)

顾名思义,就是能够依据某个输入,完成某一类追踪类动作,例如,下面是一个非常简单的追踪例子,人物跟随着鼠标的运动进行运动,当然,鼠标的运动可以和机器识别相结合,绑定在摄像头中人人物进行联动

![动图封面](https://picx.zhimg.com/50/v2-9f8a063155b37f64e256fe1db300465b_720w.jpg?source=2c26e567)

尽管我们的模型仍然是由一系列的二维图片组成,但3D渲染器的[投影变换](https://www.zhihu.com/search?q=%E6%8A%95%E5%BD%B1%E5%8F%98%E6%8D%A2&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

仍然能够给予我们足够的启发来完成这个让2D图像看起来像3D的功能

例如在上面的例子中,我们可以想象脸部的纹理贴在了一个类似于球面的曲面上,当我们尝试旋转这个球体的时候,当3D顶点坐标投影到[2D坐标](https://www.zhihu.com/search?q=2D%E5%9D%90%E6%A0%87&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

上时,我们可以近似认为这个坐标在保持u,v纹理坐标不变的情况下,在x,y方向上被压缩了

例如,下面的动画是以整个模型进行变换的(仅作为示范,其动画并不准确)

![动图封面](https://picx.zhimg.com/50/v2-c0907d584e38ebe61bef89523352510d_720w.jpg?source=2c26e567)

它能够实现小幅度的整体脸部及身体旋转功能,当然,商用的live2D有着更多的计算来完成这种效果,但对于我们这个简单版本的live2D,倒也足够了

最后说个后记

制作整个Live2D的核心渲染,骨骼框架和额外的弹性模拟与[曲面贴图](https://www.zhihu.com/search?q=%E6%9B%B2%E9%9D%A2%E8%B4%B4%E5%9B%BE&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

,其代码并不复杂大约在2-3k行左右,大约2周时间就完成了,但Live2D的配套的Editor占据了剩下5个月的所有时间

真是配套设施比核芯功能还折腾的多,你可能以为笔者要开始吹一吹在这世间学到了什么,实际上并没有,它涉及的知识,似乎就是你在本科时爱看不看的<<计算机图形学>>里的那堆东东,比起笔者老本行的语音[信号处理](https://www.zhihu.com/search?q=%E4%BF%A1%E5%8F%B7%E5%A4%84%E7%90%86&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

和[nlp](https://www.zhihu.com/search?q=nlp&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

里那些折磨人的玩意,实在是友好的多.

当然,上面的所有代码,都已经开源了,你可以在[http://PainterEngine.com](https://link.zhihu.com/?target=http%3A//PainterEngine.com)中找到editor和PainterEngine Live2D的所有核心和配套[源代码](https://www.zhihu.com/search?q=%E6%BA%90%E4%BB%A3%E7%A0%81&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A1954527067%7D)

如果你喜欢这个项目,别忘了给笔者一个star

[matrixcascade/PainterEngine​](https://link.zhihu.com/?target=https%3A//github.com/matrixcascade/PainterEngine)

[github.com/matrixcascade/PainterEngine![](https://pic2.zhimg.com/v2-f26abff5fc616b03879682ee5c926359_180x120.jpg)](https://link.zhihu.com/?target=https%3A//github.com/matrixcascade/PainterEngine)

[PainterEngine 一个由C语言编写的完整开源的跨平台图形应用框架​](https://link.zhihu.com/?target=http%3A//painterengine.com/)

[painterengine.com/](https://link.zhihu.com/?target=http%3A//painterengine.com/)

最后,随便做的一个live2D动画做结尾吧

![动图封面](https://pica.zhimg.com/50/v2-02a41be961c1dc596b6d30e550106003_720w.jpg?source=2c26e567)

点开下面的链接,可以直接看到这个模型的演示效果

[http://painterengine.com/main/instances/instance2021102701/index.html​](https://link.zhihu.com/?target=http%3A//painterengine.com/main/instances/instance2021102701/index.html)

[painterengine.com/main/instances/instance2021102701/index.html](https://link.zhihu.com/?target=http%3A//painterengine.com/main/instances/instance2021102701/index.html)

[编辑于 2021-11-04 12:54](https://www.zhihu.com/question/374369010/answer/1954527067)