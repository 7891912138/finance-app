import express from 'express'; // 导入 Express 框架
import Product from "../models/Product.js" // 导入 Product 模型，用于与数据库中的 Product 数据进行交互。

const router = express.Router(); // 创建一个 Express 路由器实例，用于定义和组织路由。

/* 定义一个 GET 请求处理器，当客户端向 /products 路径发起 GET 请求时，执行指定的回调函数。
回调函数接收 req（请求对象）和 res（响应对象）作为参数。 */
router.get("/products", async (req, res) => {
    try {
        // 使用 Product 模型的 find() 方法从数据库中查询所有的 Product 数据，并将结果赋值给变量 products。
        const products = await Product.find();

        // 使用响应对象的 status() 方法设置响应状态码为 200（成功）
        // 然后调用 json() 方法将查询到的 Product 数据以 JSON 格式发送给客户端。
        res.status(200).json(products);
    } catch (error) {

        // 使用响应对象的 status() 方法设置响应状态码为 404（未找到）
        // 然后调用 json() 方法将包含错误消息的 JSON 对象发送给客户端。
        res.status(404).json({message: error.message});
    }
});

export default router;