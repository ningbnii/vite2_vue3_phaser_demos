<template>
  <router-view></router-view>
</template>
<script>
export default {};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  // overflow: hidden;
}

body {
  width: 100%;
  /* 最大宽度 */
  // max-width: 750px;
  // /* 最小宽度 */
  // min-width: 320px;
  margin: 0 auto;
  font-family: -apple-system, Helvetica, sans-serif;
  // -webkit-tap-highlight-color: rba(255, 255, 255, 0);
  // line-height: 1.5;
  // color: #666;
}

/*去掉a标签在移动端中点击会出现蓝色遮罩层的效果  设置为transparent 完成透明*/
a {
  -webkit-tap-highlight-color: transparent;
}

/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
input {
  -webkit-appearance: none;
}

/*禁用长按页面时的弹出菜单*/
img,
a {
  -webkit-touch-callout: none;
}

ul {
  list-style: none;
}

img {
  /* 清除图片底下的空白缝隙 */
  vertical-align: middle;
  width: 100%;
}

input,
button {
  outline: 0;
  border: 0;
}

a {
  display: block;
  color: #666;
  text-decoration: none;
}

a,
button,
input,
textarea {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  // -webkit-user-modify: read-write-plaintext-only; //-webkit-user-modify有个副作用,就是输入法不再能够输入多个字符
}

.canvas_box {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
