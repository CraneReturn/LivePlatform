import type { MediaSegment } from "../models/Streamer";

function fetchM3U8(url: string): Promise<string> {
    // 发起 HTTP 请求
    const res = fetch(url)
    // 将响应内容转换为文本
    const data = res.then(res => res.text());
    
    // 返回解析结果
    return data;
}

function parseM3U8(data: string): MediaSegment[] {
    // 将文本内容按行分割成数组
    const lines = data.split("\n");

    // 定义存储解析结果的数组
    const segments: MediaSegment[] = [];

    // 遍历每一行，解析出视频片段的地址
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        // 如果是以 #EXTINF 开头的行，则表示一个视频片段
        if (line.startsWith("#EXTINF")) {
            // 解析片段时长和 URI
            const durationMatch = /#EXTINF:(\d+(?:\.\d+)?),/.exec(line);
            const duration = durationMatch ? parseFloat(durationMatch[1]) : null;

            // URI 在下一行，但需要确保下一行不是以 "#" 开头（确保是 URL，而不是其他描述行）
            let j = i + 1;
            while (j < lines.length && lines[j].startsWith("#")) {
                j += 1;
            }

            const uri = j < lines.length ? lines[j] : null;

            // 将解析出的片段信息保存到数组中
            if (duration !== null && uri) {
                segments.push({ duration, uri });
            }
        }
    }
    return segments;
}



export async function getSegments(url: string): Promise<MediaSegment[]> {
  
    // 获取m3u8文件内容
    const data = await fetchM3U8(url);
    // 解析m3u8文件返回的片段信息
    const segments = parseM3U8(data);

    // 返回包含片段名和片段时长的数组
    return segments;
};

