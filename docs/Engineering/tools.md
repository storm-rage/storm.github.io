# 常用工具
## 1.git
- 常用命令
```sh
#配置命令
git config --global user.name "lidu"
git config --global user.email "lidu@example.com"
#创建ssh-key，将公钥添加到github等网站上
ssh-keygen -t rsa -C "youremail@example.com"
git init

#可查所有配置包括分支关联情况
git config --list

#关联本地分支和远程分支
1. 远程分支如dev，本地分支如dev，用 git branch --set-upstream dev origin/dev 建立连接；
2. 本地创建分支如dev，用 git push -u origin dev，将本地分支上传到远程仓库，并关联起来，如果远程没有dev分支，则会自动创建；
3. 抓取远程分支并在本地建立关联的分支，用git checkout -b local-branchname origin/remote_branchname
eg: git checkout -b dev origin/dev，前提：需存在远程分支dev

#丢弃工作区的修改
git checkout -- readme.txt   #丢弃单个文件
git checkout . #丢弃所有工作区的修改
若已经add，先git reset HEAD <file> 先撤销add，再丢弃修改
若已经commit了，可以用git reset --hard HEAD^ 进行回退到上一个版本
git rm <file> #从版本库中删除某文件

#commit提交规范：angular规范
<type>(<scope>):<subject>
<blank line>
<body>
<blank line>
<footer>

1. type：类型
feat: 新功能
fix: 修复问题
docs: 修改文档
style: 修改代码格式，不影响代码逻辑
refactor: 重构代码，理论上不影响现有功能
perf: 提升性能
test: 增加修改测试用例
chore: 修改工具相关（包括但不限于文档、代码生成等）
deps: 升级依赖

2. scope
修复文件范围（包括不限制于doc，middleware，proxy，core，config）

3. subject
修改主题

4. body
补充subject，适当增加原因、目的等相关因素，也可不写

5. footer
当有非兼容修改时可在这里描述清楚
关联相关issue，如Close #1
功能点有新增或修改的，还要关联MR，如xxx

eg：
fix($compile): couple of unit tests for ie9
xxxx
Close #393
```
## 2.npm
```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm cache clean

//配置设置
npm config set registry https://registry.npm.taobao.org
npm config get registry
npm config list

//安装模块
npm install
npm uninstall express
npm update express
npm install moduleName   
# 安装模块到项目目录下
npm install -g moduleName 
# -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。
npm install --save moduleName 
# --save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。
npm install --save-dev moduleName 
# --save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。


//查看模块
npm -g list --depth=1 //查看全局安装模块

//发布模块
npm init
npm login
npm search xxx
npm publish
//报错put 400 bad request
//需在package.json中添加publishConfig: {registry: 发布地址}
npm unpublish

//scope：@somescope/somepackagename
npm install -g @vue/cli

//程序包链接，用于本地npm包测试
npm link
npm unlink

//全局包查看
npm root -g  //  /usr/local/lib/node_modules
npm list -g  //  全局安装的包查看

//本地包查看
npm root  //  /Users/jian/workspace/vue-project-ssr/node_modules
npm list  //  全局安装的包查看
```
## 3.yarn
```shell
* 全部安装：yarn install
* 添加：yarn add xx@xx ｜ yarn add xx --dev | yarn golbal add xx
* 更新：yarn up xx@xx
* 移除：yarn remove xx
* 运行：yarn xx
```