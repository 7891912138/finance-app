import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [{find: "@", replacement: path.resolve(__dirname, "src")}],

        /* alias 配置中包含一个对象，该对象有两个属性：find 和 replacement。
           find 属性是一个字符串，用于指定要替换的路径中的字符串。在这里，@ 是要替换的字符串。
           replacement 属性是一个字符串，是要替换为的路径。
           __dirname 是 Node.js 中的一个全局变量，表示当前模块文件所在的目录的绝对路径。
           path.resolve(__dirname, "src") 将当前文件所在的目录和 src 目录合并为一个绝对路径。*/
    }
})
