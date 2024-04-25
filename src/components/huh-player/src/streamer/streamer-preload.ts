import { Queue } from "../models/Queue";
import type { Streamer } from "../models/Streamer";

class MediaPreloader {
    private readonly _queue: Queue<() => Promise<void>>; // 异步预加载队列
    private readonly _maxConcurrentLoads: number = 2; // 并发预加载数量限制
    private readonly _cache: Map<string, ArrayBuffer>; // 简化的本地缓存示例
    private _streamer: Streamer;

    constructor(maxConcurrentLoads = 2) {
        this._queue = new Queue(
            this._executeLoad.bind(this),
            maxConcurrentLoads
        );
        this._cache = new Map();
    }

    async loadSegment(
        sourceBuffer: SourceBuffer,
        targetSegment?: number
    ): Promise<void> {
        const loadingSegment = this._getTargetSegment(targetSegment);

        if (
            loadingSegment >= this.mediaSegments.length - 1 ||
            this.isSegmentLoaded(loadingSegment)
        ) {
            return;
        }

        const segment = this.mediaSegments[loadingSegment];
        const cacheKey = `${this._baseURL}${segment.uri}`;

        // 先尝试从缓存中获取数据
        let segmentData = this._cache.get(cacheKey);
        if (!segmentData) {
            // 缓存中不存在，发起网络请求
            try {
                segmentData = await fetch(cacheKey).then(res =>
                    res.arrayBuffer()
                );
                this._cache.set(cacheKey, segmentData); // 将数据存入缓存
            } catch (error) {
                console.error("Error fetching segment:", error);
                // 在这里添加重试逻辑或返回错误
            }
        }

        sourceBuffer.appendBuffer(segmentData);

        this.loadedBuffer.add(segment);
    }

    private _getTargetSegment(targetSegment?: number): number {
        // ...原有逻辑保持不变...
    }

    private isSegmentLoaded(segmentIndex: number): boolean {
        // ...原有逻辑保持不变...
    }

    private async _executeLoad(loadTask: () => Promise<void>): Promise<void> {
        try {
            await loadTask();
        } catch (error) {
            console.error("Error executing load task:", error);
            // 在这里添加重试逻辑或返回错误
        }
    }
}
