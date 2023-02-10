# ts项目相关
## import path from 'path'报错
原因分析：path模块是node.js内置的功能，但是node.js本身并不支持typescript，所以直接在typescript项目里使用是不行的
解决方案：安装@types/node
第一步
```js
npm install @types\node --save-dev
```
第二步
```js
pnpm i @types\node -D
```
安装pnpm
```js
//第一步
npm install -g pnpm
//第二步
//配置环境变量
//在系统变量添加环境变量 添加路径C:node.js\node_global
//第三步 刷新环境变量
//新开cmd，输入set PATH=C
//关闭这个cmd，再新开一个cmd，输入echo %PATH%
//输入pnpm -v，此时输出版本号即成功
```


问题2：提示模块 ""path"" 只能在使用 "allowSyntheticDefaultImports" 标志时进行默认导入

解决方案：

方式一：在tsconfig.node.json或者tsconfig.json添加"allowSyntheticDefaultImports": true

方式二： 使用解构
```js
import { resolve } form `path`
```
# ts相关
## 


