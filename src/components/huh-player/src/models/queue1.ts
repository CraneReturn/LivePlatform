export class Queue<T> {
    private _queue: T[];
    private _isRunning: boolean;
    private _isPaused: boolean;
    private _isStopped: boolean;
    private _isFinished: boolean;
    private _isDestroyed: boolean;
    private _isDestroyedPromise: Promise<void>;
    private _isDestroyedPromiseResolve: (() => void) | undefined;
    private _isDestroyedPromiseReject: (() => void) | undefined;

    constructor() {
        this._queue = [];
        this._isRunning = false;
        this._isPaused = false;
        this._isStopped = false;
        this._isFinished = false;
        this._isDestroyed = false;

        // 初始化销毁Promise及对应的resolve/reject函数
        this._isDestroyedPromise = new Promise((resolve, reject) => {
            this._isDestroyedPromiseResolve = resolve;
            this._isDestroyedPromiseReject = reject;
        });
    }

    // 添加任务到队列
    enqueue(item: T): void {
        this._queue.push(item);
        if (!this._isRunning && !this._isStopped) {
            this._start();
        }
    }

    // 移除并返回队首任务（如果存在）
    dequeue(): T | undefined {
        return this._queue.shift();
    }

    // 开始处理队列中的任务
    private _start(): void {
        if (this._isRunning || this._isStopped || this._isFinished || this._queue.length === 0) {
            return;
        }

        this._isRunning = true;
        this._processNextItem();
    }

    // 处理下一个任务
    private async _processNextItem(): Promise<void> {
        if (this._isPaused || this._isStopped || this._queue.length === 0) {
            this._isRunning = false;
            return;
        }

        const item = this.dequeue();
        if (!item) {
            this._finish();
            return;
        }

        try {
            // 这里模拟任务处理过程，实际应用中应替换为具体的任务处理逻辑
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 如果在任务处理过程中队列被暂停、停止或销毁，则不再处理后续任务
            if (this._isPaused || this._isStopped || this._isDestroyed) {
                return;
            }

            this._processNextItem();
        } catch (error) {
            // 处理任务时出现的错误，可根据需要进行错误处理
            console.error('Error processing queue item:', error);
        }
    }

    // 标记队列为完成状态
    private _finish(): void {
        this._isFinished = true;
        this._isRunning = false;
    }

    // 暂停队列任务处理
    pause(): void {
        this._isPaused = true;
    }

    // 继续队列任务处理
    resume(): void {
        if (this._isPaused && !this._isStopped && !this._isFinished) {
            this._isPaused = false;
            this._start();
        }
    }

    // 停止队列任务处理
    stop(): void {
        this._isStopped = true;
    }

    // 销毁队列，清除所有状态并触发销毁Promise的resolve
    destroy(): void {
        if (!this._isDestroyed) {
            this._isDestroyed = true;
            this._queue.length = 0;
            // this._isDestroyedPromiseResolve();
        }
    }

    // 获取销毁Promise，用于外部等待队列销毁完成
    get destroyed(): Promise<void> {
        return this._isDestroyedPromise;
    }
}