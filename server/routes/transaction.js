import express from 'express'; // 导入 Express 框架
import Transaction from "../models/Transaction.js" // 导入 Transaction 模型，用于与数据库中的 Transaction 数据进行交互。

const router = express.Router(); // 创建一个 Express 路由器实例，用于定义和组织路由。

/* 定义一个 GET 请求处理器，当客户端向 /transactions 路径发起 GET 请求时，执行指定的回调函数。
回调函数接收 req（请求对象）和 res（响应对象）作为参数。 */
router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        // 使用响应对象的 status() 方法设置响应状态码为 200（成功）
        // 然后调用 json() 方法将查询到的 Transaction 数据以 JSON 格式发送给客户端。
        res.status(200).json(transactions);
    } catch (error) {

        // 使用响应对象的 status() 方法设置响应状态码为 404（未找到）
        // 然后调用 json() 方法将包含错误消息的 JSON 对象发送给客户端。
        res.status(404).json({message: error.message});
    }
});

export default router;