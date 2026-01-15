// import { useRef } from "react";

// export function useWebRTC(socket, remoteUserId) {
//   const peerRef = useRef(null);
//   const localStreamRef = useRef(null);

//   const createPeer = (onTrack) => {
//     const peer = new RTCPeerConnection({
//       iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//     });

//     peer.ontrack = onTrack;

//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", {
//           toUserId: remoteUserId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peerRef.current = peer;
//     return peer;
//   };

//   const getMedia = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//     localStreamRef.current = stream;
//     return stream;
//   };

//   return {
//     peerRef,
//     localStreamRef,
//     createPeer,
//     getMedia,
//   };
// }



import { useRef, useState } from "react";

export function useWebRTC(socket, remoteUserId) {
  /* ===================== REFS ===================== */
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(new MediaStream());
  const recorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  /* ===================== STATE ===================== */
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  /* ===================== CREATE PEER ===================== */
  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    // receive remote tracks
    peer.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStreamRef.current.addTrack(track);
      });
    };

    // send ICE candidates
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          toUserId: remoteUserId,
          candidate: event.candidate,
        });
      }
    };

    peerRef.current = peer;
    return peer;
  };

  /* ===================== GET MEDIA ===================== */
  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    return stream;
  };

  /* ===================== MUTE / UNMUTE ===================== */
  const toggleMute = () => {
    if (!localStreamRef.current) return;

    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = isMuted;
    });

    setIsMuted(!isMuted);
  };

  /* ===================== CAMERA ON / OFF ===================== */
  const toggleCamera = () => {
    if (!localStreamRef.current) return;

    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOff;
    });

    setIsCameraOff(!isCameraOff);
  };

  /* ===================== RECORDING ===================== */
  const startRecording = () => {
    if (!localStreamRef.current || isRecording) return;

    recordedChunksRef.current = [];
    const recorder = new MediaRecorder(localStreamRef.current);

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `call-recording-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    };

    recorder.start();
    recorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!recorderRef.current || !isRecording) return;

    recorderRef.current.stop();
    recorderRef.current = null;
    setIsRecording(false);
  };

  /* ===================== CLEANUP ===================== */
  const cleanup = () => {
    peerRef.current?.close();
    peerRef.current = null;

    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;

    remoteStreamRef.current = new MediaStream();
    setIsMuted(false);
    setIsCameraOff(false);
    setIsRecording(false);
  };

  /* ===================== EXPORT ===================== */
  return {
    peerRef,
    localStreamRef,
    remoteStreamRef,
    createPeer,
    getMedia,
    toggleMute,
    toggleCamera,
    startRecording,
    stopRecording,
    cleanup,
    isMuted,
    isCameraOff,
    isRecording,
  };
}
