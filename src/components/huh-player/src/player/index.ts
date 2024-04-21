import { Player } from "../models/Player";
import { Streamer } from "../models/Streamer";
import { getSegments } from "../service/get-segments";

/**
 * @param rootEle - 要将 video 添加到的父元素
 */
export async function initPlayer(canvasElement: HTMLCanvasElement) {

    const player = new Player(canvasElement);

    const segments = await getSegments('http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8')

    player.appendSegments(segments);

    return player._mediaElement;
    
}