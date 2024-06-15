import express from 'express'; // express：用于创建服务器和处理 HTTP 请求。
import bodyParser from 'body-parser'; // bodyParser：用于解析请求体。
import mongoose from 'mongoose'; // mongoose：用于连接和操作 MongoDB 数据库。
import cors from 'cors'; // cors：用于处理跨域资源共享。
import dotenv from 'dotenv'; // dotenv：用于加载环境变量。
import helmet from 'helmet'; // helmet：用于增加 HTTP 头的安全性。
import morgan from "morgan"; // morgan：用于日志记录 HTTP 请求。
import kpiRoutes from './routes/kpi.js'; // kpiRoutes：导入 KPI 路由。
import productRoutes from './routes/product.js';
import transactionRoutes from './routes/transaction.js';
import Product from './models/Product.js';
import KPI from "./models/KPI.js" // KPI：导入 KPI 模型。
import {kpis, products, transactions} from "./data/data.js"
import Transaction from "./models/Transaction.js"; // kpis：导入初始数据。

/* CONFIGUIRATIONS */
dotenv.config(); // 加载 .env 文件中的环境变量。

const app = express(); // 创建一个 Express 应用程序实例。

app.use(express.json()); // 解析 JSON 格式的请求体。
app.use(helmet()); // 增加应用程序的安全性。
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // 设置跨域资源策略。
app.use(morgan("common")); // 记录 HTTP 请求日志。
app.use(bodyParser.json()); // 解析 JSON 格式的请求体（与 express.json() 功能类似）。
app.use(bodyParser.urlencoded({extended: false})); //解析 URL 编码格式的请求体。
app.use(cors()); // 启用所有 CORS 请求。


/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
// 获取端口号，优先使用环境变量中的端口号，没有则使用 9000。
const PORT = process.env.PORT || 9000;
mongoose
    // 连接到 MongoDB 数据库
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => { // 异步操作
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`)); // 服务器监听指定端口。

        // ADD DATA ONE TIME ONLY OR AS NEEDED
        await mongoose.connection.db.dropDatabase();
        // 删除当前数据库中的所有数据。
        KPI.insertMany(kpis);
        // 插入初始 KPI 数据
        Product.insertMany(products);
        Transaction.insertMany(transactions);
    })
    // 连接失败时输出错误信息。
    .catch((error) => console.log(`${error} did not connect`));
