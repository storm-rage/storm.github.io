# 自定义首页
1. 创建自定义布局
  在.vuepress文件夹中创建一个components目录，然后创建一个用于首页的自定义布局组件，例如customHome.vue，内容如下：`.vuepress/components/customHome.vue`
2. 编写自定义布局组件
  编辑刚才创建的customHome.vue文件，添加一下示例代码作为起点:
```js
<template>
    <div class="custom-home">
        <header class="hero">
            <h1></h1>
            <p></p>
        </header>
    </div>
</template>
<script>
    export default {
    
}
</script>
<style>
    .custom-home {}
    .hero {}
</style>
```
3. 使用自定义布局
  在markdown文件（通常是readme.md）中指定该布局，在文件顶部加入如下配置：
  --- home:false
  layout: CustomHome
  将home:false设置为false是最重要的，因为默认的首页布局回在设置了home:true的情况下被启用
4. 应用样式和调整布局
  现在可以自由的修改customHome文件的内容，比如添加背景图片，调整布局，添加内容等等。VuePress允许使用vue的功能和webpack加载的任何资源，可以自定义一个独特且功能丰富的首页。