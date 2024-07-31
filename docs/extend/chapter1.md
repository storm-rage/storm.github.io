# webSocket
## 简介
WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。
在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。

1. WebSocket是一种双向通信协议。在建立连接后，WebSocket服务器端和客户端都能主动向对方发送或接收数据，就像Socket一样；
2. WebSocket需要像TCP一样，先建立连接，连接成功后才能相互通信。
## 
```js
//创建一个WebSocket对象
var Socket = new WebSocket(url, [protocol] )
//以上代码中的第一个参数 url, 指定连接的 URL。第二个参数 protocol 是可选的，指定了可接受的子协议。
//url必须以 ws:// 或 wss:// 开头，指明使用的是websocket或安全WebSocket协议
//域名或IP地址：ws://localhost:3000，这是要连接的服务器的地址和端口号。
//路径：最后URL可以包含一个路径，通常用于指定服务器上的特定WEbSocket端点或资源
//例如
ws://localhost:3000/chat://连接到example.com的80端口上的chat端点
wss://localhost:3000/chat://连接到example.com的443端口上的chat端点，使用SSL/TLS加密。
```
## 属性
Socket.readyState
//该只读属性返回一个数字值，表示连接状态：0表示尚未建立连接，1表示连接已建立，2表示连接正在进行关闭，3表示连接已经关闭或者连接不能打开。

## 事件
Soket.onopen //连接建立时触发
Socket.onmessage //消息到达时触发
Socket.onclose //连接关闭时触发
Socket.onerror //连接发生错误时触发
## 方法
Socket.send(data) //向服务器发送数据
Socket.close() //关闭连接

## 示例
```js

var ws = new WebSocket("ws://localhost:3000");
ws.onopen = function() {
    ws.send("Hello, world!")
}
ws.onmessage = function(event) {
    console.log(event.data)
}
ws.onclose = function() {
    console.log("Connection closed")
}
ws.onerror = function() {
    console.log("Connection error")
}
```