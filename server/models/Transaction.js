import mongoose from "mongoose"; // 导入 Mongoose 模块
import {loadType} from "mongoose-currency"; // 从 Mongoose 中导入 loadType 函数，用于加载自定义的数据类型。

// 创建一个 Mongoose 架构对象，用于定义数据模型的结构。
const Schema = mongoose.Schema;

// 调用 loadType 函数加载自定义的数据类型，这是为了支持 Mongoose 的 Currency 数据类型。
loadType(mongoose);


const TransactionSchema = new Schema(
    {
        buyer: {
            type: String,
            required: true,
        },
        amount: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        productIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",
        }],

    },

    // timestamps:true 表示自动为文档添加创建时间和更新时间字段
    { timestamps: true, toJSON: { getters: true } }
);



// 使用 mongoose.model() 方法创建了一个名为 Transaction 的模型。
// 第一个参数 "Transaction" 是模型的名称，用于在数据库中标识这个模型。
// 第二个参数 TransactionSchema 是之前定义的 Schema，它规定了模型的数据结构和字段约束。
const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;