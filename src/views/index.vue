<template>
  <div class="container-fluid">
    <div class="row">
      <van-list finished-text="没有更多了">
        <h2>actions</h2>
        <van-cell title="actions/grid-align" is-link to="/actions/grid-align" />
        <van-cell title="actions/inc-x-layers" is-link to="/actions/inc-x-layers" />
        <van-cell title="放在一个圆上" is-link to="/actions/place-on-a-circle-multi" />
        <van-cell title="在一个圆圈上倒着转" is-link to="/actions/place-on-a-circle-reversed" />
        <van-cell title="放在圆上" is-link to="/actions/place-on-circle" />
        <van-cell title="放在椭圆上" is-link to="/actions/place-on-ellipse" />
        <van-cell title="放在一条线上" is-link to="/actions/place-on-line" />
        <van-cell title="放在圆的一部分" is-link to="/actions/place-on-part-of-a-circle" />
        <van-cell title="放在矩形上移位" is-link to="/actions/place-on-rectangle-shift" />
        <van-cell title="放在矩形上" is-link to="/actions/place-on-rectangle" />
        <van-cell title="放在三角形上" is-link to="/actions/place-on-triangle" />
        <van-cell title="随机圈" is-link to="/actions/random-circle" />
        <van-cell title="随机椭圆" is-link to="/actions/random-ellipse" />
        <van-cell title="随机线" is-link to="/actions/random-line" />
        <van-cell title="随机矩形" is-link to="/actions/random-rectangle" />
        <van-cell title="随机三角形" is-link to="/actions/random-triangle" />
        <van-cell title="绕距离旋转" is-link to="/actions/rotate-around-distance" />
        <van-cell title="旋转" is-link to="/actions/rotate-around" />
        <van-cell title="旋转容器面对点，点击暂停" is-link to="/actions/rotate-container-facing-point" />
        <van-cell title="设置透明度" is-link to="/actions/set-alpha" />
        <van-cell title="设置xy" is-link to="/actions/set-xy" />
        <van-cell title="移动位置" is-link to="/actions/shift-position" />
        <van-cell title="扩散" is-link to="/actions/spread" />
        <van-cell title="包裹在相机范围内" is-link to="/actions/wrap-in-camera-bounds" />
        <van-cell title="包裹在矩形中" is-link to="/actions/wrap-in-rectangle" />
        <h2>animation</h2>
        <van-cell title="60fps动画测试" is-link to="/animation/60fps-animation-test" />
        <van-cell title="添加动画事件" is-link to="/animation/add-animation-event" />
        <van-cell title="向现有动画添加帧" is-link to="/animation/add-frames-to-existing-animation" />
        <van-cell title="来自 png 序列的动画" is-link to="/animation/animation-from-png-sequence" />
        <van-cell title="动画取得进度" is-link to="/animation/animation-get-progress" />
        <van-cell title="动画重复事件" is-link to="/animation/animation-repeat-event" />
        <van-cell title="aseprite动画" is-link to="/animation/aseprite-animation" />
        <van-cell title="链式动画" is-link to="/animation/chained-animation" />
        <van-cell title="从画布纹理创建动画" is-link to="/animation/create-animation-from-canvas-texture" />
        <van-cell title="从精灵表创建动画" is-link to="/animation/create-animation-from-sprite-sheet" />
        <van-cell title="从纹理图集创建动画" is-link to="/animation/create-animation-from-texture-atlas" />
        <van-cell title="在精灵上创建动画" is-link to="/animation/create-animation-on-sprite" />
        <van-cell title="创建没有帧名称的动画" is-link to="/animation/create-animation-without-frame-names" />
        <van-cell title="立方体" is-link to="/animation/cubes" />
        <van-cell title="导出json" is-link to="/animation/export-json" />
        <van-cell title="来自动画 json" is-link to="/animation/from-animation-json" />
        <van-cell title="来自 json" is-link to="/animation/from-json" />
        <van-cell title="生成帧的名称" is-link to="/animation/generate-frame-names" />
        <van-cell title="生成帧号" is-link to="/animation/generate-frame-numbers" />
        <van-cell title="gif转动画" is-link to="/animation/gif-to-animation" />
        <van-cell title="完成后隐藏" is-link to="/animation/hide-on-complete" />
        <van-cell title="混合动画" is-link to="/animation/mixed-animation" />
        <van-cell title="多图集动画" is-link to="/animation/multi-atlas-animation" />
        <van-cell title="迈布里奇" is-link to="/animation/muybridge" />
        <van-cell title="监听完成事件" is-link to="/animation/on-complete-event" />
        <van-cell title="监听重复事件" is-link to="/animation/on-repeat-event" />
        <van-cell title="监听开始事件" is-link to="/animation/on-start-event" />
        <van-cell title="监听停止事件" is-link to="/animation/on-stop-event" />
        <van-cell title="监听更新事件" is-link to="/animation/on-update-event" />
        <van-cell title="暂停所有动画" is-link to="/animation/pause-all-animation" />
        <van-cell title="暂停动画实例" is-link to="/animation/pause-animation-instance" />
        <van-cell title="延迟播放" is-link to="/animation/play-after-delay" />
        <van-cell title="repeat结束后播放" is-link to="/animation/play-after-repeat" />
        <van-cell title="使用配置播放动画" is-link to="/animation/play-animation-with-config" />
        <van-cell title="随机延迟" is-link to="/animation/random-delay" />
        <van-cell title="移除动画事件" is-link to="/animation/remove-animation-event" />
        <van-cell title="反转动画" is-link to="/animation/reverse-animation" />
        <van-cell title="显示动画播放过程" is-link to="/animation/show-animation-play-through" />
        <van-cell title="开始播放时显示" is-link to="/animation/show-on-start" />
        <van-cell title="精灵动画事件" is-link to="/animation/sprite-animation-events" />
        <van-cell title="交错播放1" is-link to="/animation/stagger-play-1" />
      </van-list>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped></style>
