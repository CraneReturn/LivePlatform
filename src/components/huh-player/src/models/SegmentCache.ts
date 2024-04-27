class SegmentCache {
    public cache: Map<string, any> = new Map();
    public currentSizeInBytes: number = 0;
    public maxSizeInBytes: number;

    constructor(maxSizeInBytes = 10 * 1024 * 1024) {
        // 默认最大缓存大小为10MB
        this.maxSizeInBytes = maxSizeInBytes;
    }

    /**
     * 添加片段到缓存
     * @param {string} url 片段URL
     * @param {Blob|ArrayBuffer} data 片段二进制数据
     * @param {{pts: number, dts: number}} metadata 片段元数据
     */
    add(url: string, data: Blob | ArrayBuffer, metadata: { pts: number; dts: number }) {
        const fragment = {
            url,
            data,
            metadata,
            isParsed: false, // 假设所有片段初始状态为未解析
            isAppended: false, // 假设所有片段初始状态为未追加
        };

        // 计算新片段加入后缓存总大小
        const newSizeInBytes = this.currentSizeInBytes + data.size;

        // 如果加入新片段后超出最大缓存大小，执行替换策略（此处简单地移除最早添加的片段）
        if (newSizeInBytes > this.maxSizeInBytes) {
            const [firstUrl, firstFragment] = this.cache.entries().next().value;
            this.cache.delete(firstUrl);
            this.currentSizeInBytes -= firstFragment.data.size;
        }

        // 将新片段添加到缓存
        this.cache.set(url, fragment);
        this.currentSizeInBytes += data.size;
    }

    /**
     * 查找并返回下一个可追加的片段
     * @returns {object|null} 可追加的片段对象，或null表示当前无可追加片段
     */
    getNextAppendableFragment(): any {
        // 这里仅简单地返回第一个未追加的片段（实际逻辑应考虑时间戳顺序、优先级等）
        for (const fragment of this.cache.values()) {
            if (!fragment.isAppended) {
                return fragment;
            }
        }

        return null; // 没有未追加的片段
    }

    /**
     * 标记片段为已追加到SourceBuffer
     * @param {string} url 片段URL
     */
    markAsAppended(url: string) {
        const fragment = this.cache.get(url);

        if (fragment) {
            fragment.isAppended = true;
        } else {
            console.warn(`Fragment with URL ${url} not found in cache.`);
        }
    }
}

// // 示例用法：
// const cache = new HLSFragmentCache();

// // 添加片段到缓存
// cache.add(
//     "fragment1.ts",
//     new Blob([
//         /* ... */
//     ]),
//     { pts: 0, dts: 0 }
// );
// cache.add(
//     "fragment2.ts",
//     new Blob([
//         /* ... */
//     ]),
//     { pts: 9000, dts: 7000 }
// );

// // 获取并追加下一个可追加的片段
// const fragmentToAppend = cache.getNextAppendableFragment();
// if (fragmentToAppend) {
//     sourceBuffer.appendBuffer(fragmentToAppend.data);
//     cache.markAsAppended(fragmentToAppend.url);
// }
