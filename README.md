<!--
 * @Author: 周楠
 * @Description:
 * @Date: 2022-12-27 10:33:58
 * @LastEditTime: 2023-01-04 14:37:04
 * @LastEditors: 周楠
-->
#  成功启动说明

   1.如果报错 `Found 1 errors. Watching for file changes`. 需要关闭 tsconfig.json中的`"isolatedModules": true`选项

   2.如果在启动过程中出现报错 `require() of ES modules is not supported.ts` 证明在package.json文件中存在 `type:module`选项，将此处进行删除可以正常启动

#  项目功能说明

   vue3+vite+electron+tailwindcss 进行开发

#  项目配置说明

   ## 创建一个vue3+ts的项目

   `yarn create vite my-vue-app --template vue-ts` 或者 `npm init vite my-vue-app --template vue-ts` 若在yarn中进行操作，可以使用npm进行操作，如果npm同时报错无需改变环境变量，重新下载npm即可

   ## 安装electron和electron-build

   执行`yarn add electron electron-builder -D`,如果安装electron时报错 timeOut的情况下，需要更改npm源为taobao源，并且必须更换electron的源，具体做法可自行百度

   ## 安装小工具供以下使用

   $$
   kill-port:清理端口

   cross-env:设置环境变量

   npm-run-all 顺序执行script脚本

   concurrently 并行执行script脚本

   tsc-watch:编译ts文件,并在文件修改后重新执行编译

   wait-on 等待文件/端口等变化后执行script脚本
   $$

   `yarn add kill-port  concurrently cross-env npm-run-all tsc-watch wait-on -D`


# 添加项目配置和更改配置

   ## 更改文件目录结构
   在根目录创建types文件夹
   将src下自动生成的 `vite-env.d.ts`移入types
   在types中创建 `electron.d.ts` 文件
   在根目录下创建 `tsconfig.e.json`文件
   在根目录下创建 electron 文件夹
   在electron文件夹中创建
   `main.ts`
   `preload.ts`
   utils文件夹

# electron文件夹梳理
   由于electron有着所谓的上下文隔离，所以我们使用 主进程和渲染进行分离，在electron/main.ts中为主进程
   electron/preload.ts为预加载文件夹，在此处可以进行node语法，例如为桌面直接添加一个文件

#  启动服务
脚本说明


终端运行 `yarn start / npm start` 开始启动项目
start:

清理端口3920`(kill-port 3920)`  然后`(&&) `并行执行`(concurrently -k)`命令`vite` 和 `wait-on tcp:3920 && npm-run-all watch`
`vite`:启动`vite`开发服务器 指定端口3920
`wait-on tcp:3920 && npm-run-all watch`:监听端口3920,连通时执行`npm-run-all watch`

`watch`:

使用`tsc-watch` 将ts文件编译成js文件;  通过配置文件`tsconfig.e.json` 指定只编译`electron`文件夹下的文件,并将js文件输出到`output/build` 文件夹当ts文件编译完成后`(--onSuccess)`,执行命令`npm-run-all start:ect`
启动后`tsc-watch`将持续监听`electron`文件夹,每次文件改动都会重新执行编译并运行`(--onSuccess)`后的命令

`start:ect`:

设置环境变量`cross-env NODE_ENV=development`,`electron`主进程启动时可以拿到此变量(见`electron/utils/createWindow.ts`),并据此判断是加载外部链接还是加载打包后文件
启动`electron app`,指定入口文件`./output/build/main.js`

# 进程通信
   ## 基本配置
   想要在vite+vue项目中更方便的通信,可以使用 `@vueuse/electron`,这个包可以通过`componsitionAPI`的方式使用进程通信,像这样
   `import { useIpcRenderer } from '@vueuse/electron'const ipcRenderer = useIpcRenderer()ipcRenderer.on('custom-event', (event, ...args) => {console.log(args)})`
   编辑`electron/preload.ts`

   `contextBridge.exposeInMainWorld`:将一个对象`ipc:{send:xxx,on:xxx}`挂载到window对象上.
定义一个中转函数`ipc.send`,渲染进程调用`window.ipc.send('事件名', 参数)`,`ipc.send`方法再调用`ipcRenderer.send`方法并传递参数
因为在声明文件中添加了`ipc: import("electron").IpcRenderer;`,所以也拥有代码提示

# 关于依赖
   ## vue3的按需加载组件库
   unplugin-vue-components 这个组件的功能非常强大，你可以只下载element-plus或者antd 并且只需要在 vite.config.ts 配置
   `plugins: [vue(),
    Components({
      resolvers: [ElementPlusResolver()]
  })
  ],`
  即可完成组件的按需引入

  ## 关于element-plus
  值得注意的项是在icon需要单独下载使用 `npm install @element-plus/icons-vue`

# 关于打包
   首先需要下载 `electron-builder`安装依赖
   `yarn add electron-builder -D`

   修改vite.config.ts,打包使用相对路径
   `export default defineConfig({
      base:'./',
      ...
   });`

   编辑package.json 说明
   1.`yarn build` 开始执行打包脚本
   2.`build:vue` 打包vue文件,目录为`output/dist`
   3.`build:tsc`将ts的electron文件编译为js,目录为`output/build`
   4.`build:all`打包两个平台 也可以分别运行`build:vue,build:tsc,build:mac`来打包指定平台
   5."main": `"output/build/main.js"`,:是在`tsconfig.e.json`中指定的,编译ts文件后输出到build目录 `electron-builder`通过它找到打包入口
   6.preview: 使用electron预览打包后的vue文件


   ### 注意
   如果遇到
    `Package "electron-builder" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json.`,
   这是一条错误消息，意思是在你的 package.json 文件中，你将 electron-builder 包放在了 dependencies 节点中，但是它只能在 devDependencies 节点中使用。
   放入devDependencies中，重新执行 `npm i`

