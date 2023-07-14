# 服务器配置
## nginx配置
## json-server配置
没有接口测试很烦恼？试试`json-server`，不需要具备后端知识。
相关资料：<https://juejin.cn/post/7043424909472563208#heading-4>
### 入门篇
5分钟实现本地搭建和增删改查，满足入门测试使用。
使用json-server需要遵守一定规范
- 数据查询用`GET`
- 新增数据用`POST`
- 删除数据用`DELETE`
- 修改数据用`PUT`和`PATCH`

#### 起步
1. `node`环境安装。
2. 安装 `json-server`。在终端输入以下命令`npm install -g json-server`
3. 创建数据库（一个`json`文件）。例：创建`json-server-demo`文件夹，在其中创建`db.json`文件，添加数据（可以用官方数据，也可以用自己的）
```json
{ 
  "posts": [ 
      { "id": 1, "title": "json-server", "author": "typicode" } 
    ], 
  "comments": [ 
    { "id": 1, "body": "some comment", "postId": 1 } 
  ], 
  "profile": { "name": "typicode" }
}
```
4. 启动服务。进入 `json-server-demo`目录，在终端输入以下命令启动即可， `json-server --watch db.json --port 5000`
### 进阶篇
主要详解常用查询操作，还包括常规配置，静态资源配置等
