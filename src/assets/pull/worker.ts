self.onmessage = function (event) {
  // 创建一个新的 FileReaderSync 示例
  const offscreen = event.data.canvas;
  const mask = event.data.mask;
  const context = offscreen.getContext("2d");
  const reader = new FileReaderSync();
  context.clearRect(0, 0, offscreen.width, offscreen.height);
  context.drawImage(
    // 经验证 即使出现多人，也只有一个 segmentation
    mask,
    0,
    0,
    offscreen.width,
    offscreen.height
  );
  // 设置混合模式
  context.globalCompositeOperation = "source-out";
  // 反向填充黑色
  context.fillRect(0, 0, offscreen.width, offscreen.height);
  // 导出Mask图片，需要的是轮廓，图片质量设为最低
  // 从事件数据中获取文件
  offscreen
    .convertToBlob({
      type: "image/png",
      quality: 0,
    })
    .then((blob: Blob) => {
      const dataURL = reader.readAsDataURL(blob);
      self.postMessage({
        msgType: "mask",
        val: dataURL,
      });
    })
    .catch(console.error);
};
