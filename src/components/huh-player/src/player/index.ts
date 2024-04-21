import { Streamer } from "../models/Streamer";
import { getSegments } from "../service/get-segments";

/**
 * @param rootEle - 要将 video 添加到的父元素
 */
export async function initPlayer(rootEle: HTMLElement) {

    const mediaSegments = await getSegments('http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8');
    const streamer = new Streamer(mediaSegments);

    rootEle.append(streamer.mediaElement);
    
}