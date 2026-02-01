// import { useEffect, useRef } from "react";

// export default function VideoCallModal({ localStream, remoteStream, onClose }) {
//   const localVideo = useRef(null);
//   const remoteVideo = useRef(null);

//   useEffect(() => {
//     if (localVideo.current) localVideo.current.srcObject = localStream;
//     if (remoteVideo.current) remoteVideo.current.srcObject = remoteStream;
//   }, [localStream, remoteStream]);

//   return (
//     <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
//       <div className="flex-1 grid grid-cols-2 gap-4 p-4">
//         <video ref={localVideo} autoPlay muted className="rounded-lg" />
//         <video ref={remoteVideo} autoPlay className="rounded-lg" />
//       </div>

//       <button
//         onClick={onClose}
//         className="bg-red-600 text-white py-3 text-lg"
//       >
//         End Call
//       </button>
//     </div>
//   );
// }


// import { useEffect, useRef } from "react";
// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   PhoneOff,
//   CircleDot,
//   StopCircle,
// } from "lucide-react";

// export default function VideoCallModal({
//   localStream,
//   remoteStream,
//   onEnd,
//   onToggleMute,
//   onToggleCamera,
//   onStartRecording,
//   onStopRecording,
//   isMuted,
//   isCameraOff,
//   isRecording,
// }) {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   /* ===================== ATTACH STREAMS ===================== */
//   useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//     }

//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }
//   }, [localStream, remoteStream]);

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       {/* ===================== VIDEO AREA ===================== */}
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
//         {/* Local video */}
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="rounded-lg bg-black object-cover"
//         />

//         {/* Remote video */}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="rounded-lg bg-black object-cover"
//         />
//       </div>

//       {/* ===================== CONTROLS ===================== */}
//       <div className="flex justify-center items-center gap-6 p-4 bg-slate-900">
//         {/* Mute */}
//         <button
//           onClick={onToggleMute}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isMuted ? (
//             <MicOff className="text-red-400" />
//           ) : (
//             <Mic className="text-green-400" />
//           )}
//         </button>

//         {/* Camera */}
//         <button
//           onClick={onToggleCamera}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isCameraOff ? (
//             <VideoOff className="text-red-400" />
//           ) : (
//             <Video className="text-green-400" />
//           )}
//         </button>

//         {/* Recording */}
//         {!isRecording ? (
//           <button
//             onClick={onStartRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <CircleDot className="text-red-500" />
//           </button>
//         ) : (
//           <button
//             onClick={onStopRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <StopCircle className="text-yellow-400" />
//           </button>
//         )}

//         {/* End Call */}
//         <button
//           onClick={onEnd}
//           className="p-4 rounded-full bg-red-600 hover:bg-red-500"
//         >
//           <PhoneOff className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useRef } from "react";
// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   PhoneOff,
//   CircleDot,
//   StopCircle,
// } from "lucide-react";

// export default function VideoCallModal({
//   localStream,
//   remoteStream,
//   onEnd,
//   onToggleMute,
//   onToggleCamera,
//   onStartRecording,
//   onStopRecording,
//   isMuted,
//   isCameraOff,
//   isRecording,
// }) {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);

//   /* ===================== ATTACH STREAMS ===================== */
//   useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream;
//     }

//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream;
//     }

//     return () => {
//       if (localVideoRef.current) localVideoRef.current.srcObject = null;
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
//     };
//   }, [localStream, remoteStream]);

//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       {/* ===================== VIDEO AREA ===================== */}
//       <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
//         {/* Local video */}
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="rounded-lg bg-black object-cover"
//         />

//         {/* Remote video */}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="rounded-lg bg-black object-cover"
//         />
//       </div>

//       {/* ===================== CONTROLS ===================== */}
//       <div className="flex justify-center items-center gap-6 p-4 bg-slate-900">
//         {/* Mute */}
//         <button
//           onClick={onToggleMute}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isMuted ? (
//             <MicOff className="text-red-400" />
//           ) : (
//             <Mic className="text-green-400" />
//           )}
//         </button>

//         {/* Camera */}
//         <button
//           onClick={onToggleCamera}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isCameraOff ? (
//             <VideoOff className="text-red-400" />
//           ) : (
//             <Video className="text-green-400" />
//           )}
//         </button>

//         {/* Recording */}
//         {!isRecording ? (
//           <button
//             onClick={onStartRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <CircleDot className="text-red-500" />
//           </button>
//         ) : (
//           <button
//             onClick={onStopRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <StopCircle className="text-yellow-400" />
//           </button>
//         )}

//         {/* End Call */}
//         <button
//           onClick={onEnd}
//           className="p-4 rounded-full bg-red-600 hover:bg-red-500"
//         >
//           <PhoneOff className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }


// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   PhoneOff,
//   CircleDot,
//   StopCircle,
// } from "lucide-react";

// export default function VideoCallModal({
//   localVideoRef,
//   remoteVideoRef,
//   onEnd,
//   onToggleMute,
//   onToggleCamera,
//   onStartRecording,
//   onStopRecording,
//   isMuted,
//   isCameraOff,
//   isRecording,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       {/* ===================== VIDEO AREA ===================== */}
//       <div className="relative flex-1 bg-black">
//         {/* Remote video (FULL SCREEN) */}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover"
//         />

//         {/* Local video (PIP) */}
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg absolute bottom-4 right-4 border border-white/20"
//         />
//       </div>

//       {/* ===================== CONTROLS ===================== */}
//       <div className="flex justify-center items-center gap-6 p-4 bg-slate-900">
//         {/* Mute */}
//         <button
//           onClick={onToggleMute}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isMuted ? (
//             <MicOff className="text-red-400" />
//           ) : (
//             <Mic className="text-green-400" />
//           )}
//         </button>

//         {/* Camera */}
//         <button
//           onClick={onToggleCamera}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isCameraOff ? (
//             <VideoOff className="text-red-400" />
//           ) : (
//             <Video className="text-green-400" />
//           )}
//         </button>

//         {/* Recording */}
//         {!isRecording ? (
//           <button
//             onClick={onStartRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <CircleDot className="text-red-500" />
//           </button>
//         ) : (
//           <button
//             onClick={onStopRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <StopCircle className="text-yellow-400" />
//           </button>
//         )}

//         {/* End Call */}
//         <button
//           onClick={onEnd}
//           className="p-4 rounded-full bg-red-600 hover:bg-red-500"
//         >
//           <PhoneOff className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }


// import {
//   Mic,
//   MicOff,
//   Video,
//   VideoOff,
//   PhoneOff,
//   CircleDot,
//   StopCircle,
// } from "lucide-react";

// export default function VideoCallModal({
//   localVideoRef,
//   remoteVideoRef,
//   onEnd,

//   /* OPTIONAL CONTROLS (SAFE) */
//   onToggleMute = () => {},
//   onToggleCamera = () => {},
//   onStartRecording = () => {},
//   onStopRecording = () => {},
//   isMuted = false,
//   isCameraOff = false,
//   isRecording = false,
// }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black flex flex-col">
//       {/* ===================== VIDEO AREA ===================== */}
//       <div className="relative flex-1 bg-black">
//         {/* Remote video (FULL SCREEN) */}
//         <video
//           ref={remoteVideoRef}
//           autoPlay
//           playsInline
//           className="w-full h-full object-cover bg-black"
//         />

//         {/* Local video (PIP) */}
//         <video
//           ref={localVideoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg absolute bottom-4 right-4 border border-white/20 bg-black"
//         />
//       </div>

//       {/* ===================== CONTROLS ===================== */}
//       <div className="flex justify-center items-center gap-6 p-4 bg-slate-900">
//         {/* Mute */}
//         <button
//           onClick={onToggleMute}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isMuted ? (
//             <MicOff className="text-red-400" />
//           ) : (
//             <Mic className="text-green-400" />
//           )}
//         </button>

//         {/* Camera */}
//         <button
//           onClick={onToggleCamera}
//           className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//         >
//           {isCameraOff ? (
//             <VideoOff className="text-red-400" />
//           ) : (
//             <Video className="text-green-400" />
//           )}
//         </button>

//         {/* Recording */}
//         {!isRecording ? (
//           <button
//             onClick={onStartRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <CircleDot className="text-red-500" />
//           </button>
//         ) : (
//           <button
//             onClick={onStopRecording}
//             className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
//           >
//             <StopCircle className="text-yellow-400" />
//           </button>
//         )}

//         {/* End Call */}
//         <button
//           onClick={onEnd}
//           className="p-4 rounded-full bg-red-600 hover:bg-red-500"
//         >
//           <PhoneOff className="text-white" />
//         </button>
//       </div>
//     </div>
//   );
// }
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  CircleDot,
  StopCircle,
} from "lucide-react";

export default function VideoCallModal({
  localVideoRef,
  remoteVideoRef,
  onEnd,

  /* OPTIONAL CONTROLS */
  onToggleMute = () => {},
  onToggleCamera = () => {},
  onStartRecording = () => {},
  onStopRecording = () => {},
  isMuted = false,
  isCameraOff = false,
  isRecording = false,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* ===================== VIDEO AREA ===================== */}
      <div className="relative flex-1 flex items-center justify-center bg-black overflow-hidden">
        {/* REMOTE VIDEO */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="
            max-w-full max-h-full 
            w-full h-full 
            object-contain 
            bg-black
          "
        />

        {/* LOCAL VIDEO (PIP) */}
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="
            absolute 
            bottom-20 right-4
            w-28 h-28 
            sm:w-36 sm:h-36 
            md:w-44 md:h-44
            object-cover 
            rounded-lg 
            border border-white/30 
            bg-black
            shadow-lg
          "
        />
      </div>

      {/* ===================== CONTROLS ===================== */}
      <div
        className="
          flex justify-center items-center gap-4 
          px-4 py-3 
          bg-slate-900
          safe-area-inset-bottom
        "
      >
        {/* MIC */}
        <button
          onClick={onToggleMute}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
        >
          {isMuted ? (
            <MicOff className="text-red-400" />
          ) : (
            <Mic className="text-green-400" />
          )}
        </button>

        {/* CAMERA */}
        <button
          onClick={onToggleCamera}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
        >
          {isCameraOff ? (
            <VideoOff className="text-red-400" />
          ) : (
            <Video className="text-green-400" />
          )}
        </button>

        {/* RECORD */}
        {!isRecording ? (
          <button
            onClick={onStartRecording}
            className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
          >
            <CircleDot className="text-red-500" />
          </button>
        ) : (
          <button
            onClick={onStopRecording}
            className="p-3 rounded-full bg-slate-700 hover:bg-slate-600"
          >
            <StopCircle className="text-yellow-400" />
          </button>
        )}

        {/* END CALL */}
        <button
          onClick={onEnd}
          className="p-4 rounded-full bg-red-600 hover:bg-red-500"
        >
          <PhoneOff className="text-white" />
        </button>
      </div>
    </div>
  );
}
