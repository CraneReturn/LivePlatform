

export async function startPush() {
    const pc = new RTCPeerConnection();

    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(async stream => {
            stream.getTracks().forEach(track => {
                pc.addTrack(track, stream);
            });

            pc.onicecandidate = event => {
                if (event.candidate) {
                    // console.log("ICE candidate:", event.candidate);
                }
            };

            const offer = await pc.createOffer();

            await pc.setLocalDescription(offer);

            fetch("http://localhost:1985/rtc/v1/whip/?app=live&stream=livestream", {
                method: "POST",
                headers: {
                    "Content-type": "application/sdp",
                },
                body: offer.sdp,
            }).then(res => {
                console.log(res);
                
            });
        });
}
