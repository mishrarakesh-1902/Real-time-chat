// import VideoCallModal from "./VideoCallModal";
// import { useWebRTC } from "../hooks/useWebRTC";
// import { useAuthStore } from "../store/useAuthStore";

// export default function VideoCallWrapper() {
//   const { activeCall } = useAuthStore();

//   const {
//     localStreamRef,
//     remoteStreamRef,
//     toggleMute,
//     toggleCamera,
//     startRecording,
//     stopRecording,
//     cleanup,
//     isMuted,
//     isCameraOff,
//     isRecording,
//   } = useWebRTC();

//   if (!activeCall) return null;

//   return (
//     <VideoCallModal
//       localStream={localStreamRef.current}
//       remoteStream={remoteStreamRef.current}
//       onToggleMute={toggleMute}
//       onToggleCamera={toggleCamera}
//       onStartRecording={startRecording}
//       onStopRecording={stopRecording}
//       isMuted={isMuted}
//       isCameraOff={isCameraOff}
//       isRecording={isRecording}
//       onEnd={cleanup}
//     />
//   );
// }

// import { useRef, useEffect } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import VideoCallModal from "./VideoCallModal";

// export default function VideoCallWrapper() {
//   const {
//     activeCall,
//     localStream,
//     remoteStream,
//     endCall,
//   } = useAuthStore();

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   /* ===================== ATTACH STREAMS ===================== */
//   useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//     }
//   }, [localStream]);

//   useEffect(() => {
//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }
//   }, [remoteStream]);

//   if (!activeCall) return null;

//   return (
//     <VideoCallModal
//       localVideoRef={localVideoRef}
//       remoteVideoRef={remoteVideoRef}
//       onEnd={endCall}
//     />
//   );
// }


import { useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import VideoCallModal from "./VideoCallModal";

export default function VideoCallWrapper() {
  const {
    activeCall,
    localStream,
    remoteStream,
    endCall,
    toggleMute,
    toggleCamera,
    isMuted,
    isCameraOff,
  } = useAuthStore();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  if (!activeCall) return null;

  return (
    <VideoCallModal
      localVideoRef={localVideoRef}
      remoteVideoRef={remoteVideoRef}
      onEnd={endCall}
      onToggleMute={toggleMute}
      onToggleCamera={toggleCamera}
      isMuted={isMuted}
      isCameraOff={isCameraOff}
    />
  );
}
