<template>
  <div class="container-fluid">
    <div class="row">
      <van-list finished-text="没有更多了">
        <h1>actions</h1>
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
        <h1>animation</h1>
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
        <van-cell title="交错播放2" is-link to="/animation/stagger-play-2" />
        <van-cell title="补间动画时间尺度" is-link to="/animation/tween-timescale" />
        <van-cell title="yoyo" is-link to="/animation/yoyo" />
        <h1>audio</h1>
        <van-cell title="循环延迟" is-link to="/audio/html5-audio/loop-delay" />
        <van-cell title="从某个时间点开始播放声音" is-link to="/audio/html5-audio/seek" />
        <van-cell title="音量静音率失谐" is-link to="/audio/html5-audio/volume-mute-rate-detune" />
        <van-cell title="音频精灵" is-link to="/audio/html5-audio/audiosprite" />
        <van-cell title="基本播放和事件" is-link to="/audio/html5-audio/basic-playback-and-events" />
        <van-cell title="标记暂停恢复" is-link to="/audio/html5-audio/markers-pause-resume" />
        <van-cell title="标记播放" is-link to="/audio/html5-audio/markers-play" />
        <van-cell title="播放音频文件" is-link to="/audio/html5-audio/play-audio-file" />
        <van-cell title="从子场景播放音频" is-link to="/audio/html5-audio/play-audio-from-child-scene" />
        <van-cell title="使用相同的音频文件" is-link to="/audio/html5-audio/using-same-audio-file" />
        <van-cell title="播放文件包中的音频" is-link to="/audio/html5-audio/play-audio-from-file-pack" />
        <van-cell title="重用音频上下文" is-link to="/audio/html5-audio/reuse-audio-context" />
        <h1>cache</h1>
        <van-cell title="json" is-link to="/cache/json" />
        <van-cell title="text" is-link to="/cache/text" />
        <van-cell title="xml" is-link to="/cache/xml" />
        <h1>camera</h1>
        <van-cell title="相机基础" is-link to="/camera/basics" />
        <van-cell title="缩放" is-link to="/camera/zoom-to" />
        <van-cell title="世界视图" is-link to="/camera/world-view" />
        <van-cell title="来自另一个场景的世界坐标" is-link to="/camera/world-coordinate-from-another-scene" />
        <van-cell title="世界相机" is-link to="/camera/world-camera" />
        <van-cell title="带相机抖动的平铺地图" is-link to="/camera/tile-map-with-camera-shake" />
        <van-cell title="单独的小相机" is-link to="/camera/single-small-camera" />
        <van-cell title="相机摇晃" is-link to="/camera/shake" />
        <van-cell title="着色器多摄像头测试" is-link to="/camera/shader-multi-cam-test" />
        <van-cell title="设置视口" is-link to="/camera/set-viewport" />
        <van-cell title="设置小范围" is-link to="/camera/set-small-bounds" />
        <van-cell title="设置界限" is-link to="/camera/set-bounds" />
        <van-cell title="设置滚动因子" is-link to="/camera/set-scroll-factor" />
        <van-cell title="选择着色器测试" is-link to="/camera/select-shader-test" />
        <van-cell title="滚动视图" is-link to="/camera/scroll-view" />
        <van-cell title="像素四舍五入为整数" is-link to="/camera/round-pixels" />
        <van-cell title="旋转相机" is-link to="/camera/rotate-camera" />
        <van-cell title="渲染到纹理" is-link to="/camera/render-to-texture" />
        <van-cell title="渲染到纹理着色器" is-link to="/camera/render-to-texture-shader" />
        <van-cell title="点击移除相机" is-link to="/camera/remove-camera-on-click" />
        <van-cell title="平移" is-link to="/camera/pan-to" />
        <van-cell title="重叠" is-link to="/camera/overlap" />
        <van-cell title="起源" is-link to="/camera/origin" />
        <van-cell title="小地图相机" is-link to="/camera/minimap-camera" />
        <van-cell title="忽略某个对象" is-link to="/camera/ignore" />
        <van-cell title="忽略一组对象" is-link to="/camera/ignore-group-children" />
        <van-cell title="获取世界中点的坐标" is-link to="/camera/get-world-point" />
        <van-cell title="游戏着色器测试1" is-link to="/camera/game-shader-test-1" />
        <van-cell title="跟随缩放" is-link to="/camera/follow-zoom" />
        <van-cell title="跟随缩放瓦片地图" is-link to="/camera/follow-zoom-tilemap" />
        <van-cell title="跟随精灵" is-link to="/camera/follow-sprite" />
        <van-cell title="跟随精灵在设置deadzone的时候" is-link to="/camera/follow-sprite-with-deadzone" />
        <van-cell title="跟随精灵在一个小范围内" is-link to="/camera/follow-sprite-small-bounds" />
        <van-cell title="设置相机跟随偏移量" is-link to="/camera/follow-offset" />
        <van-cell title="相机闪烁" is-link to="/camera/flash" />
        <van-cell title="不跟随相机移动" is-link to="/camera/fixed-to-camera" />
        <van-cell title="逐渐消失" is-link to="/camera/fade" />
        <van-cell title="跨场景放置对象" is-link to="/camera/cross-scene-object-placement" />
        <van-cell title="更改相机着色器" is-link to="/camera/change-camera-shader" />
        <van-cell title="来自状态配置的相机" is-link to="/camera/cameras-from-state-config" />
        <van-cell title="相机滤镜" is-link to="/camera/camera-filter" />
        <van-cell title="相机淡出和淡入" is-link to="/camera/camera-fade-out-and-in" />
        <van-cell title="相机淡入和淡出" is-link to="/camera/camera-fade-in-and-out" />
        <van-cell title="相机效果" is-link to="/camera/camera-effects" />
        <van-cell title="相机效果回调" is-link to="/camera/camera-effects-callbacks" />
        <van-cell title="相机中心" is-link to="/camera/camera-center-on" />
        <van-cell title="相机模糊着色器" is-link to="/camera/camera-blur-shader" />
        <van-cell title="相机透明度" is-link to="/camera/camera-alpha" />
        <van-cell title="背景颜色插值" is-link to="/camera/background-color-interpolate" />
        <van-cell title="添加相机" is-link to="/camera/add-camera-on-click" />
        <h1>data</h1>
        <van-cell title="设置data的值" is-link to="/data/data-values" />
        <van-cell title="更改data事件" is-link to="/data/change-data-event" />
        <van-cell title="查询数据" is-link to="/data/query-data" />
        <van-cell title="存储场景数据" is-link to="/data/store-scene-data" />
        <h1>demoscene</h1>
        <van-cell title="小鸟南南" is-link to="/demoscene/birdy-nam-nam" />
        <van-cell title="粗大的光栅条" is-link to="/demoscene/chunky-raster-bars" />
        <van-cell title="光栅地毯" is-link to="/demoscene/raster-carpet" />
        <van-cell title="垂直光栅波" is-link to="/demoscene/vertical-raster-wave" />
        <h1>depth sorting</h1>
        <van-cell title="3d深度排序" is-link to="/depth/3d-depth-sort" />
        <van-cell title="深度排序" is-link to="/depth/depth-sorting" />
        <van-cell title="移动到最上层" is-link to="/depth/bring-to-top" />
        <van-cell title="获取最上层的对象" is-link to="/depth/get-top-object" />
        <van-cell title="等距块" is-link to="/depth/isometric-blocks" />
        <van-cell title="等轴测图" is-link to="/depth/isometric-map" />
        <van-cell title="从显示列表中移除" is-link to="/depth/remove-from-display-list" />
        <van-cell title="z轴" is-link to="/depth/z-index" />
        <h1>display</h1>
        <van-cell title="底部中间" is-link to="/display/align/in-bottom-center" />
        <van-cell title="底部透明度" is-link to="/display/alpha/bottom-alpha" />
        <van-cell title="alpha动画" is-link to="/display/alpha/tween-alpha" />
        <van-cell title="混合模式" is-link to="/display/blend-modes/blend-mode-tester" />
        <van-cell title="切出的圆圈" is-link to="/display/blend-modes/circle-cut-out" />
      </van-list>
    </div>
  </div>
</template>
<script setup></script>
<style lang="less" scoped></style>
