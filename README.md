# Vue 3 + Vite2 + phaser 学习官网 demo

- 基于[https://github.com/ningbnii/vite2_vue3_base](https://github.com/ningbnii/vite2_vue3_base)
- phaser 官网 demo(https://phaser.io/examples/v3)

## 安装测试

```
// 进入目录
yarn
// 启动server
yarn dev
// 打包
yarn build
```

### actions

- actions/grid-align
- actions/inc-x-layers 设置坐标，旋转角度
- actions/place-on-a-circle-multi 沿着一个圆旋转
- actions/place-on-a-circle-reversed 沿着一个圆倒着转
- actions/place-on-circle 放在圆上
- actions/place-on-ellipse 放在椭圆上
- actions/place-on-line 放在一条线上
- actions/place-on-part-of-a-circle 放在圆的一部分
- actions/place-on-rectangle-shift 放在矩形移位上
- actions/place-on-rectangle 放在一个正方形上
- actions/place-on-triangle 放在三角形上
- actions/random-circle 随机圈
- actions/random-ellipse 随机椭圆
- actions/random-line 随机线
- actions/random-rectangle 随机矩形
- actions/random-triangle 随机三角形
- actions/random-around-distance 绕距离旋转
- actions/rotate-around-xy 绕 x y 旋转，随圆内鼠标移动
- actions/rotate 旋转
- actions/rotate-container-facing-point 旋转容器面对点，点击暂停
- actions/set-alpha 设置透明度
- actions/set-xy 设置 xy
- actions/shift-position 移动位置
- actions/wrap-in-camera-bounds 包裹在相机范围内
- actions/wrap-in-rectangle 包裹在矩形中

### animation

- animation/60fps-animation-test 60fps 动画测试
- animation/add-animation-event 添加动画事件
- animation/add-frames-to-existing-animation 向现有动画添加帧
- animation/animation-from-png-sequence 来自 png 序列的动画
- animation/animation-get-progress 动画取得进度
- animation/animation-repeat-event 动画重复事件
- animation/aseprite-animation aseprite 动画
- animation/chained-animation 链式动画
- animation/create-animation-from-canvas-texture 从画布纹理创建动画
- animation/create-animation-from-sprite-sheet 从精灵表创建动画
- animation/create-animation-from-texture-atlas 从纹理图集创建动画
- animation/create-animation-on-sprite 在精灵上创建动画
- animation/create-animation-without-frame-names 创建没有帧名称的动画
- animation/create-from-sprite-config 从精灵配置创建
- animation/cubes 立方体
- animation/export-json 导出 json
- animation/from-animation-json 来自动画 json
- animation/from-json 来自 json
- animation/generate-frame-names 生成帧的名称
- animation/generate-frame-numbers 生成帧号
- animation/git-to-animation gif 转动画
- animation/hide-on-complete 完成后隐藏
- animation/mixed-animation 混合动画
- animation/multi-atlas-animation 多图集动画
- animation/muybridge 迈布里奇
- animation/on-complete-event 监听完成事件
- animation/on-repeat-event 监听重复事件
- animation/on-start-event 监听开始事件
- animation/on-stop-event 监听停止事件
- animation/on-update-event 监听更新事件
- animation/pause-all-animation 暂停所有动画
- animation/pause-animation-instance 暂停动画实例
- animation/pause-animation-instance 延迟播放
- animation/play-after-repeat repeat 结束后播放
- animation/play-animation-with-config 使用配置播放动画
- animation/random-delay 随机延迟
- animation/remove-animation-event 移除动画事件
- animation/reverse-animation 反转动画
- animation/show-animation-play-through 显示动画播放过程
- animation/show-on-start 开始播放时显示
- animation/sprite-animation-events 精灵动画事件
- animation/stagger-play-1 交错播放 1
- animation/stagger-play-2 交错播放 2
- animation/tween-timescale 补间动画时间尺度
- animation/yoyo yoyo

### audio

- audio/html5-audio/loop-delay 循环延迟
- audio/html5-audio/seek 从某个时间点开始播放声音
- audio/volume-mute-rate-detune 音量静音率失谐
- audio/html5-audio/audiosprite 音频精灵
- audio/html5-audio/basic-playback-and-events 基本播放和事件
- audio/html5-audio/markers-pause-resume 标记暂停恢复
- audio/html5-audio/markers-play 标记播放
- audio/html5-audio/play-audio-file 播放音频文件
- audio/html5-audio/play-audio-from-child-scene 从子场景播放音频
- audio/html5-audio/using-same-audio-file 使用相同的音频文件
- audio/html5-audio/using-same-audio-file 播放文件包中的音频
- audio/html5-audio/reuse-audio-context 重用音频上下文

### cache

- cache/json json
- cache/text text
- cache/xml xml

### camera

- camera/basics 基础
- camera/zoom-to 缩放
- camera/world-view 世界视图
- camera/world-coordinate-from-another-scene 来自另一个场景的世界坐标
- camera/world-camera 世界相机
- camera/tile-map-with-camera-shake 带相机抖动的平铺地图
- camera/single-small-camera 单独的小相机
- camera/shake 相机摇晃
- camera/shader-multi-cam-test 着色器多摄像头测试
- camera/set-viewport 设置视口
- camera/set-small-bounds 设置小范围
- camera/set-bounds 设定界限
- camera/set-scroll-factor 设置滚动因子
- camera/select-shader-test 选择着色器测试
- camera/scroll-view 滚动视图
- camera/round-pixels 像素四舍五入为整数
- camera/rotate-camera 旋转相机
- camera/render-to-texture 渲染到纹理
- camera/render-to-texture-shader 渲染到纹理着色器
- camera/remove-camera-on-click 点击移除相机
- camera/pan-to 平移
- camera/overlap 重叠
- camera/origin 起源
- camera/minimap-camera 小地图相机
- camera/ignore 忽略某个对象
- camera/ignore-group-children 忽略一组对象
- camera/get-world-point 获取世界中点的坐标
- camera/game-shader-test-1 游戏着色器测试 1
- camera/follow-zoom 跟随缩放
- camera/follow-zoom-tilemap 跟随缩放瓦片地图
- camera/follow-user-controlled-sprite 跟随用户控制的精灵
- camera/follow-sprite 跟随精灵
- camera/follow-sprite-with-deadzone 跟随精灵在设置 deadzone 的时候
- camera/follow-sprite-small-bounds 跟随精灵在一个小范围内
- camera/follow-offset 设置相机跟随偏移量
- camera/flash 相机闪烁
- camera/fixed-to-camera 不跟随相机移动
- camera/fade 逐渐消失
- camera/cross-scene-object-placement 跨场景放置对象
- camera/change-camera-shader 更改相机着色器
- camera/cameras-from-state-config 来自状态配置的相机
