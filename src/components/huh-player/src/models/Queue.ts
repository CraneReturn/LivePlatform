export class Queue<T> {
    private _queue: T[] = [];
    private _isRunning = false;

    constructor() {}

    public enqueue(item: T) {
        this._queue.push(item);
        if (!this._isRunning) this._start();
    }
    public dequeue(): T | undefined {
        return this._queue.shift();
    }

    private _start() {
        if (this._isRunning) return;
        this.processNextItem();
    }

    private processNextItem() {
        const item = this.dequeue();
        if (!item) {
            this._isRunning = false;
            return;
        }

        return new Promise((resolve, reject) => {
            item();
            resolve();
        }).then(() => {
            this.processNextItem();
        })

    }
}
