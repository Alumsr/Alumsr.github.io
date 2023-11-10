
```c++
#include "stm32f4xx.h"
#include "stm32f4xx_hal.h"

UART_HandleTypeDef huart2;

void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart) {
    if (huart == &huart2) {
        // 数据已接收完毕
        // 在这里编写你的数据解析逻辑
        // 例如，假设你正在接收一个8位数据帧
        uint8_t receivedData = huart2.Instance->DR; // 从数据寄存器中读取接收到的数据
        // 进行数据解析操作
    }
}

int main(void) {
    HAL_Init();

    // 初始化串口配置
    huart2.Instance = USART2;
    huart2.Init.BaudRate = 115200;
    huart2.Init.WordLength = UART_WORDLENGTH_8B;
    huart2.Init.StopBits = UART_STOPBITS_1;
    huart2.Init.Parity = UART_PARITY_NONE;
    huart2.Init.Mode = UART_MODE_RX;
    huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
    huart2.Init.OverSampling = UART_OVERSAMPLING_16;
    if (HAL_UART_Init(&huart2) != HAL_OK) {
        Error_Handler();
    }

    // 启动串口接收中断
    HAL_UART_Receive_IT(&huart2, &receivedData, 1);

    while (1) {
        // 在这里执行其他任务
    }
}
```