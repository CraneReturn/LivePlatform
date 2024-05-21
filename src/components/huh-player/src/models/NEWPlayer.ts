class Player {
    videoElement: HTMLVideoElement = document.createElement('video');
    canvasElement: HTMLCanvasElement = document.createElement('canvas');
    constructor() {
        
    }

    initCanvas() {
        const ratio = devicePixelRatio;
        this.canvasElement.width = this.canvasElement.width * ratio;
        this.canvasElement.height = this.canvasElement.height * ratio;
    }

    initVideo() {
        this.videoElement.autoplay = true;
    }
}