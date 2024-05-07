import { io } from "socket.io-client";

export async function initLiveStreamer() {
    const socket = io("http://localhost:3000").connect();
    socket.on("connection", socket => {
        console.log(socket.id);
    });

    socket.on("connect", () => {
        console.log(socket.id);
    });

    socket.on("disconnect", () => {
        console.log(socket.id);
    });

    const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: "stun:stun.voipbuster.com ",
            },
            {
                urls: "stun:stun.l.google.com:19301",
            },
            {
                urls: "turn:turn.ap-southeast-1.aliyuncs.com:443?transport=tcp",
                username: "test",
                credential: "test",
            },
        ],
    });

    
    const remotePC = new RTCPeerConnection();

    socket.on("offer", async description => {
        await remotePC.setRemoteDescription(description);

        const answer = await remotePC.createAnswer();

        await remotePC.setLocalDescription(answer);

        socket.emit("answer", remotePC.localDescription);
    });

    navigator.mediaDevices
        .getUserMedia({
            video: true,
        })
        .then(stream => {
            stream.getTracks().forEach(track => {
                peerConnection.addTrack(track, stream);
            });

            const localVideo = document.querySelector(
                ".local"
            ) as HTMLVideoElement;
            localVideo.srcObject = stream;
        });

    peerConnection.ontrack = track => {
        console.log(track);

        const remoteVideo = document.querySelector(
            ".remote"
        ) as HTMLVideoElement;
        remoteVideo.srcObject = track.streams[0];
    };

    const offer = await peerConnection.createOffer();

    await peerConnection.setLocalDescription(offer);


    socket.emit("offer", peerConnection.localDescription);


}
