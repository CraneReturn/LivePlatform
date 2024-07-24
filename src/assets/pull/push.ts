class pusher {
  livePusher: any;
  // 开启本地混流
  videoEffectManager: any;
  deviceManager: any;
  //   设备初始化
  constructor(livePusher: any) {
    this.livePusher = livePusher;
    this.videoEffectManager = livePusher.getVideoEffectManager();
    this.videoEffectManager.enableMixing(true);
    this.videoEffectManager.setMixingConfig({
      videoWidth: 1280,
      videoHeight: 720,
      videoFramerate: 15,
    });
    this.deviceManager = this.livePusher.getDeviceManager();
  }
  // 获取该用户的所有设备信息
  async getVideo(): Promise<{ deviceName: string; deviceId: string }[]> {
    try {
      const data = await this.deviceManager.getDevicesList("video");

      return data.map((item: { deviceName: any; deviceId: any }) => ({
        deviceName: item.deviceName,
        deviceId: item.deviceId,
      }));
    } catch (error) {
      console.error("Error fetching audio devices:", error);
      return [];
    }
  }
  async getAudio(): Promise<{ deviceName: string; deviceId: string }[]> {
    try {
      const data = await this.deviceManager.getDevicesList("audio");

      return data.map((item: { deviceName: any; deviceId: any }) => ({
        deviceName: item.deviceName,
        deviceId: item.deviceId,
      }));
    } catch (error) {
      console.error("Error fetching audio devices:", error);
      return [];
    }
  }
  //  使用摄像头/audio
  useVideo(deviceId: any) {
    this.livePusher
      .startCamera()
      .then((streamId: any) => {
        this.deviceManager.switchCamera(deviceId, streamId);
      })
      .catch((error: { toString: () => string }) => {
        console.log("打开摄像头失败：" + error.toString());
      });
  }
  useAudio(deviceId: any) {
    this.livePusher
      .startMicrophone()
      .then((streamId: string) => {
        this.deviceManager.switchMicrophone(deviceId, streamId);
      })
      .catch((error: { toString: () => string }) => {
        console.log("start microphone error: " + error.toString());
      });
  }
  //   使用屏幕共享
  useCapture() {
    this.livePusher
      .startScreenCapture()
      .then((streamId: string) => {
        console.log("screen stream id is " + streamId);
      })
      .catch((error: { toString: () => string }) => {
        console.log("start screen error: " + error.toString());
      });
  }
  //  使用本地文件
  useLocalFile(file: File) {
    this.livePusher
      .startVirtualCamera(file)
      .then((streamId: string) => {
        console.log("file stream id is " + streamId);
      })
      .catch((error: { toString: () => string }) => {
        console.log("start file error: " + error.toString());
      });
  }
  //   添加文本
  addText(text: string) {
    this.videoEffectManager.setText({
      text: text,
      style: {
        font: "Helvetica",
        font_size: 50,
        font_color: "#00fa8e",
        font_alpha: 100,
        bold: 1,
        italic: 1,
        shadow_color: "#1f095d",
        shadow_alpha: 80,
        stroke_color: "#01aef9",
        stroke_thickness: 2,
        background_color: "#fae500",
        background_alpha: 30,
      },
      x: 640,
      y: 360,
      zOrder: 5,
    });
  }
  //   渲染到video中
  renderView(id: string) {
    this.livePusher.setRenderView(id);
  }
  // 关闭video
  stopCamera() {
    this.livePusher.stopCamera();
  }
  //   关闭麦克风
  stopMic() {
    this.livePusher.stopMicrophone();
  }
  //  关闭屏幕
  stopCapture() {
    this.livePusher.stopScreenCapture();
  }
  //  关闭本地媒体流
  stopLocal(id: any) {
    this.livePusher.stopVirtualCamera(id);
  }
  //   开始推流
  startPush(url: string) {
    this.livePusher
      .startPush(url)
      .then(() => {
        console.log("push stream is successful");
      })
      .catch((error: { name: string; message: string }) => {
        console.log(error.name + ": " + error.message);
      });
  }
  //   停止推流
  stopPush() {
    this.livePusher.stopPush();
  }
  //   销毁所有
  destroy() {
    this.livePusher.destroy();
  }
}
export default pusher;
