import { reactive } from "vue";

// VideoStream.js
export default class VideoStream {
    putId!: String;
    roomId!: String;
    localDevice = {
        audioIn: [],
        videoIn: [],
        audioOut: []
    }
    localoffer: any
    localcandiadate: any
    linkSocket: any
    pc!: RTCPeerConnection
    stream: any
    video!: HTMLVideoElement
    formLine: any
    userInfo:any
    localRtcPc:any
    
    roomUserList:[]=reactive([])
    // constructor(params: {
    //     // socketIo:any
    //     pc:RTCPeerConnection
    //   }) {
    //     // this.linkSocket = params.socketIo;
    //     this.pc=params.pc
    //   }
    getFormLine(formInline: any) {
        this.formLine = formInline
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
    getVideoNow(video: any) {
        console.log(video);

        this.video = video
    }
    onSubmit() {
        this.stream = this.video.srcObject
        if (this.stream) {
            this.stream.getAudioTracks.forEach((e: any) => {
                this.stream.removeTrack(e)
            })
            this.stream.getVideoTrack().forEach((e: any) => {
                this.stream.removeTrack(e)
            })
        }
        let newstream = this.getTargetDeviceMedia(this.formLine.videoId, this.formLine.audio)
        this.stream = newstream
        // this.video.srcObject=newstream
        // this.video.muted.muted=true
        return newstream
    }
    getTargetDeviceMedia(videoId: any, audioId: any) {
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
    //获取本地服务器信令
    getLocalMediaOffer(pc) {
        this.pc = pc
        console.log(this.pc);
        this.Onnegotiationneeded()
    }
    
    Onnegotiationneeded = async () => {
        console.log('4878888');
        this.localoffer = await this.pc.createOffer()
        this.localcandiadate = await this.pc.setLocalDescription(this.localoffer)
        console.log(this.localcandiadate);
        console.log(this.localoffer);
    }
    connection(){
        console.log(this.linkSocket,'999999');
        
        this.linkSocket.on("connect",(e)=>{
            console.log("server init connect success",this.linkSocket)
        })
    }
    setConnect(link){
        this.linkSocket=link
    }
    init(userId,roomId,nickname){
        this.userInfo={
            userId,
            roomId,
            nickname
        }
        this.linkSocket.on('msg',async(e)=>{
            if(e['type']=='join' || e['type']=='leave'){
                setTimeout(()=>{
                    let params={'roomId':this.getParams("roomId")}
                    this.linkSocket.emit('roomUserList',params)
                },1000)
            }
            if(e['type']=='call'){
                await this.onCall(e)
            }
        })
    }
    async onCall(e){
        console.log('远程呼叫',e);
        await this.initCalleeInfor(e.data[targetUid],e.data["userId"])
    }
    async initCalleeInfor(localUid,formUId){
        //初始化pc
        this.localRtcPc=new RTCPeerConnection()
        
        

    }
    getParams(queryname:string){
        let url = window.location.href
		let query = decodeURI(url.split('?')[1]);
		let vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
		  var pair = vars[i].split("=");
		  if (pair[0] === queryname) {
		    return pair[1];
		  }
		}
		return null;
    }
}
