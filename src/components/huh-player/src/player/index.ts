import { Player } from "../models/Player";
import { getSegments } from "../service/get-segments";

/**
 * @param rootEle - 要将 video 添加到的父元素
 */
export async function initPlayer(canvasElement: HTMLCanvasElement): Promise<Player> {

    // 创建 Player 实例 
    const player = new Player(canvasElement);
    // 将 video 添加到父元素
    canvasElement.parentElement?.append(Player.mediaElement); 

    // 获取视频片段
    const segments = await getSegments('https://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8')
    // 将视频片段添加到 player 中
    player.appendSegments(segments);

    // 返回 player 实例
    return player;
    
}