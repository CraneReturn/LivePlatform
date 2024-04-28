export class Queue<T> {
    private _queue: T[] = [];
    private _maxSize?: number;

    constructor(maxSize: number) {
        this._maxSize = maxSize;
    }

    public enqueue(item: T) {

        if (this._maxSize && this._queue.length >= this._maxSize) return;
        this._queue.push(item);
    }
    public dequeue(): T | undefined {
        return this._queue.shift();
    }

    public isEmpty(): boolean {
        return this._queue.length === 0;
    }

    public size(): number {
        return this._queue.length;
    }
}
