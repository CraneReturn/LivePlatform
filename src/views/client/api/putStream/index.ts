// VideoStream.js
export default class VideoStream {
    putId!: String;
    roomId!: String;
    localDevice = {
        audioIn: [],
        videoIn: [],
        audioOut: []
    }
    stream: any
    video!:HTMLVideoElement
    formLine:any
    getFormLine(formInline:any){
        this.formLine=formInline
    }
    getVideo() {
        let constraints = { video: true, audio: true };

        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
            console.log("浏览器不支持获取媒体设备");
            return;
        }

        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            stream.getTracks().forEach((track) => {
                track.stop();
            });

            navigator.mediaDevices.enumerateDevices().then((devices) => {
                devices.forEach((device) => {
                    let obj = {
                        id: device.deviceId,
                        kind: device.kind,
                        label: device.label
                    };

                    if (device.kind === "audioinput") {
                        if (this.localDevice.audioIn.filter(e => e.id === device.deviceId).length === 0) {
                            this.localDevice.audioIn.push(obj);
                        }
                    } else if (device.kind === "audiooutput") {
                        if (this.localDevice.audioOut.filter(e => e.id === device.deviceId).length === 0) {
                            this.localDevice.audioOut.push(obj);
                        }
                    } else if (device.kind === "videoinput") {
                        if (this.localDevice.videoIn.filter(e => e.id === device.deviceId).length === 0) {
                            this.localDevice.videoIn.push(obj);
                        }
                    }
                });
            });
        }).catch((error) => {
            console.error('摄像头无法使用', error);
        });
    }
    handleError(error: any) {
        console.log('摄像头无法使用', error);
    }
    getVideoNow(video:any){
        console.log(video);
        
        this.video=video
    }
    onSubmit(){
        this.stream=this.video.srcObject
        if(this.stream){
            this.stream.getAudioTracks.forEach((e: any)=>{
                this.stream.removeTrack(e)
            })
            this.stream.getVideoTrack().forEach((e: any)=>{
                this.stream.removeTrack(e)
            })
        }
        let newstream= this.getTargetDeviceMedia(this.formLine.videoId,this.formLine.audio)
        this.stream=newstream
        // this.video.srcObject=newstream
        // this.video.muted.muted=true
        return newstream
    }
    getTargetDeviceMedia(videoId: any,audioId: any) {
        const constraints = {
            audio: { deviceId: audioId ? { exact: audioId } : undefined },
            video: {
                deviceId: videoId ? { exact: videoId } : undefined,
                width: this.formLine.width,
                height: this.formLine.height,
                frameRate: { ideal: this.formLine.frameRate, max: 24 }
            }
        }
        return this.getLocalUserMedia(constraints).catch(this.handleError)
    }
    getLocalUserMedia(constraints: 
        { audio: { deviceId: { exact: any; } | undefined; }; video: { deviceId: { exact: any; } | undefined; width: any; height: any; frameRate: { ideal: any; max: number; }; }; }) {
       return navigator.mediaDevices.getUserMedia(constraints)
    }
}
