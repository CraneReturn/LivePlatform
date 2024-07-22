// 为礼物添加特效，使用特效
import { Parser, Player, DB } from "svga";
// 利用IndexDB进行持久化缓存已经下载并解析的数据元，可避免重复消耗资源对相同SVGA下载和解析
// 使用类封装一个展示礼物的方法
class AnimationEffect {
  element: HTMLCanvasElement;
  url!: string;
  parser: Parser;
  player: Player;
  constructor(element: HTMLCanvasElement) {
    this.element = element;
    this.parser = new Parser({ isDisableImageBitmapShim: true });
    this.player = new Player({ container: element, loop: 1 });
  }
  //   初始化播放器和svga资源
  async init(url: string) {
    this.url = url;
    const db = new DB();
    let svga = await db.find(this.url);
    if (!svga) {
      svga = await this.parser.load(this.url);
      await db.insert(this.url, svga);
    }
    await this.player.mount(svga);
  }
  //   判断是否结束
  async clearIt() {
    this.player.onEnd = () => {
      console.log("播放结束");
      this.clear();
    };
  }
  //   开始
  start() {
    this.player.start();
  }
  clear() {
    this.player.clear();
  }
  //   销毁
  destroy() {
    this.player.destroy();
    this.parser.destroy();
  }
}
export default AnimationEffect;
