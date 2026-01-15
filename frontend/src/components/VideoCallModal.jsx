import { useEffect, useRef } from "react";

export default function VideoCallModal({ localStream, remoteStream, onClose }) {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = localStream;
    if (remoteVideo.current) remoteVideo.current.srcObject = remoteStream;
  }, [localStream, remoteStream]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <video ref={localVideo} autoPlay muted className="rounded-lg" />
        <video ref={remoteVideo} autoPlay className="rounded-lg" />
      </div>

      <button
        onClick={onClose}
        className="bg-red-600 text-white py-3 text-lg"
      >
        End Call
      </button>
    </div>
  );
}
