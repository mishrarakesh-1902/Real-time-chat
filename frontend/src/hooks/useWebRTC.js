import { useRef } from "react";

export function useWebRTC(socket, remoteUserId) {
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);

  const createPeer = (onTrack) => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peer.ontrack = onTrack;

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

  const getMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStreamRef.current = stream;
    return stream;
  };

  return {
    peerRef,
    localStreamRef,
    createPeer,
    getMedia,
  };
}
