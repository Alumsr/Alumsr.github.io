## 总结
### Client (Request-srv)
- 定义请求
	```cpp
	// declare
	auto myRequest = std::make_shared<srvType>();
	// define
	request->data = "apple";
```
- 发送请求(class 内)
	```cpp
	// declare
	rclcpp::Client<srvType> myClient;
	// define
	myClient = node->create_client<msgType>("srvName");
	// wait for the service to be available
	while(!myClient->wait_for_service(time)){}
	// service available, send request
	myClient->async_send_request(myRequest)
```
	- 客户端定义-请求定义-发送请求
	- 每个请求都唤起服务的回调函数
### Service (Response-srv; CallBack/SpinNeeded)
- 定义服务(响应)
```cpp
// declare
rclcpp::Service<srvType>::SharedPtr myService;
// define
myService = node->create_service<srvType>("srvName", callBack);
```
- 服务定义-回调定义-等待请求后执行回调
### Publisher (Topic-msg)
- 消息定义
	```cpp
	// declare
	auto myMsg = msgType();
	// define
	myMsg.data = "apple"; 
```
- 消息发布
	```cpp
	// declare
	rclcpp::Publisher<msgType>::SharedPtr myPublisher;
	// define
	myPublisher = this->create_publisher<msgType>(topicName, queueSize);
	// publish
	myPublisher->publish(msg);
```
	- 节点定义- 发布者定义-消息定义-发布消息
	- 每条消息被接收到后都唤起订阅者的回调函数
### Subscriber (Topic-msg; CallBack/SpinNeeded)
```cpp
// declare(private)
rclcpp::Subscription<msgType>::SharedPtr mySubscriber;
// call back func define(private)
type callBack(){...}
// define(public)
mySubscriber = this->create_subscription<msgType>(topic, queueSize, callBack)
```
- spin needed to dynamically update
- 订阅者定义-回调定义-收到发布者的消息时调用回调函数
### Spin Nodes (with subscriber)
```cpp
int main(){
	// define a node
	std::shared_ptr<nodeType> myNode = nodeType::make_shared(nodeName) 
	// spin node
	rclcpp::spin(node);
	rclcpp::shutdown;
	return;
}
```
 - 作用: 执行构造函数一次, 并在**收到消息时**执行回调函数
 - 只有使用了回调函数的node才需要使用spin()或spin_some()
 - spin()会阻塞进程(直至)
 - spin_some()非阻塞, 会查看当前缓冲区是否存在待处理信息, **只处理第一条回调**; 若无则跳过这个函数
 - 缓冲区大小(回调队列长度)可以指定: 越大信息越不易丢失, 但实时性下降; 反之亦然
 -
 
## Summarized by GPT

User

---
总结一下ROS 2 节点创建订阅者/订阅消息,创建发布者/发布消息,创建客户端/请求, 创建服务端/响应的方法

ChatGPT

---
创建订阅者:

- `rclcpp::Node::create_subscription`
- SPAN here(MUST)

订阅消息:

- 回调函数处理接收到的消息

创建发布者:

- `rclcpp::Node::create_publisher`

发布消息:

- 使用发布者对象的 `publish` 方法
- SPAN here

创建客户端:

- `rclcpp::Node::create_client`

发出请求:

- 使用客户端对象的 `async_send_request` 方法
- SPAN here

创建服务端:

- `rclcpp::Node::create_service`
- SPAN here(MUST)

处理请求:

- 设置回调函数处理接收到的请求
## 注意事项
- 添加依赖
	- .vscode中includePath
		- ![[Pasted image 20231023214148.png]]

## 参数parameter
```cpp
// Set a parameter
node->set_parameter(rclcpp::Parameter("my_parameter", 42));
// Get a parameter
if ( node->has_parameter("my_parameter") ) 
{
	auto parameter = node->get_parameter("my_parameter");
	RCLCPP_INFO(rclcpp::get_logger("ParameterNode"), "Parameter value: %d", parameter.as_int());
}
```
## 动作
- 同样需要接口,格式为:action
```cpp
#include "rclcpp/rclcpp.hpp"
#include "example_interfaces/action/fibonacci.hpp"

void goalCallback
(   rclcpp_action::ClientGoalHandle<example_interfaces::action::Fibonacci>::SharedPtr goal_handle
) 
{
    RCLCPP_INFO(rclcpp::get_logger("ActionClient"), "Goal accepted");
}

void resultCallback
(
const example_interfaces::action::Fibonacci::Result::SharedPtr result
) 
{
    RCLCPP_INFO(rclcpp::get_logger("ActionClient"), "Result: %d", result->sequence.back());
}

int main(int argc, char **argv) {
    rclcpp::init(argc, argv);
    auto node = rclcpp::Node::make_shared("action_client");
    auto action_client = rclcpp_action::create_client<example_interfaces::action::Fibonacci>(node, "fibonacci");

    action_client->wait_for_server();

    auto goal_msg = example_interfaces::action::Fibonacci::Goal();
    goal_msg.order = 10;

    auto goal_handle_future = action_client->async_send_goal(goal_msg, goalCallback);

    rclcpp::spin(node);

    auto result = goal_handle_future.get();

    if (result.code == rclcpp_action::ResultCode::SUCCEEDED) {
        RCLCPP_INFO(rclcpp::get_logger("ActionClient"), "Action completed successfully");
        RCLCPP_INFO(rclcpp::get_logger("ActionClient"), "Result: %d", result.result->sequence.back());
    } else {
        RCLCPP_ERROR(rclcpp::get_logger("ActionClient"), "Action failed");
    }

    rclcpp::shutdown();

    return 0;
}

```