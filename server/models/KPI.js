import mongoose from "mongoose"; // 导入 Mongoose 模块
import {loadType} from "mongoose-currency"; // 从 Mongoose 中导入 loadType 函数，用于加载自定义的数据类型。

// 创建一个 Mongoose 架构对象，用于定义数据模型的结构。
const Schema = mongoose.Schema;

// 调用 loadType 函数加载自定义的数据类型，这是为了支持 Mongoose 的 Currency 数据类型。
loadType(mongoose);

// 定义了一个名为 daySchema 的数据模型，用于表示每日的绩效数据
const daySchema = new Schema(
    {
        date: String,
        revenue: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100 // v（以分为单位）除以 100，以得到以美元为单位的金额值
        },
        expenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
    },
    {toJSON: {getters: true}} // Mongoose 在将文档转换为 JSON 格式时会自动调用定义的 getter 函数
)

const monthSchema = new Schema({
        month: String,
        revenue: {
            type: mongoose.Types.Currency,
            currency: 'USD',
            get: (v) => v / 100
        },
        expenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        operationalExpenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
        nonOperationalExpenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100
        },
    },
    {
        toJSON: {getters: true}
    }
)

const KPISchema = new Schema(
    {
        totalProfit: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        totalRevenue: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        totalExpenses: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        expensesByCategory: {
            type: Map,
            of: {
                type: mongoose.Types.Currency,
                currency: "USD",
                get: (v) => v / 100,
            },
        },
        monthlyData: [monthSchema],
        dailyData: [daySchema],
    },

    // timestamps:true 表示自动为文档添加创建时间和更新时间字段
    { timestamps: true, toJSON: { getters: true } }
);



// 使用 mongoose.model() 方法创建了一个名为 KPI 的模型。
// 第一个参数 "KPI" 是模型的名称，用于在数据库中标识这个模型。
// 第二个参数 KPISchema 是之前定义的 Schema，它规定了模型的数据结构和字段约束。
const KPI = mongoose.model("KPI", KPISchema);

export default KPI;