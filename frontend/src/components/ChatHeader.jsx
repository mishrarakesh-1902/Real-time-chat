// import { XIcon } from "lucide-react";
// import { useChatStore } from "../store/useChatStore";
// import { useEffect } from "react";
// import { useAuthStore } from "../store/useAuthStore";

// function ChatHeader() {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();
//   const isOnline = onlineUsers.includes(selectedUser._id);

//   useEffect(() => {
//     const handleEscKey = (event) => {
//       if (event.key === "Escape") setSelectedUser(null);
//     };

//     window.addEventListener("keydown", handleEscKey);

//     // cleanup function
//     return () => window.removeEventListener("keydown", handleEscKey);
//   }, [setSelectedUser]);

//   return (
//     <div
//       className="flex justify-between items-center bg-slate-800/50 border-b
//    border-slate-700/50 max-h-[84px] px-6 flex-1"
//     >
//       <div className="flex items-center space-x-3">
//         <div className={`avatar ${isOnline ? "online" : "offline"}`}>
//           <div className="w-12 rounded-full">
//             <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
//           </div>
//         </div>

//         <div>
//           <h3 className="text-slate-200 font-medium">{selectedUser.fullName}</h3>
//           <p className="text-slate-400 text-sm">{isOnline ? "Online" : "Offline"}</p>
//         </div>
//       </div>

//       <button onClick={() => setSelectedUser(null)}>
//         <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
//       </button>
//     </div>
//   );
// }
// export default ChatHeader;

import { XIcon, VideoIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers, socket } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  /* ===================== ESC KEY ===================== */
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  /* ===================== START VIDEO CALL ===================== */
  const startVideoCall = async () => {
    if (!socket || !isOnline) return;

    try {
      // 1️⃣ Create peer connection
      const peer = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // 2️⃣ Get camera + mic
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // 3️⃣ Add tracks to peer
      stream.getTracks().forEach((track) => peer.addTrack(track, stream));

      // 4️⃣ ICE candidates
      peer.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            toUserId: selectedUser._id,
            candidate: event.candidate,
          });
        }
      };

      // 5️⃣ Create offer
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      // 6️⃣ Send offer to backend
      socket.emit("call-user", {
        toUserId: selectedUser._id,
        offer,
        isGroup: false,
      });

      // 7️⃣ Attach peer to socket (important)
      socket.peerRef = peer;
    } catch (error) {
      console.error("Failed to start video call:", error);
    }
  };

  return (
    <div
      className="flex justify-between items-center bg-slate-800/50 border-b
      border-slate-700/50 max-h-[84px] px-6 flex-1"
    >
      {/* ===================== USER INFO ===================== */}
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* ===================== ACTION BUTTONS ===================== */}
      <div className="flex items-center gap-4">
        {/* Video Call */}
        <button
          onClick={startVideoCall}
          disabled={!isOnline}
          title={isOnline ? "Start video call" : "User is offline"}
        >
          <VideoIcon
            className={`w-5 h-5 transition-colors ${
              isOnline
                ? "text-green-400 hover:text-green-300"
                : "text-slate-500 cursor-not-allowed"
            }`}
          />
        </button>

        {/* Close Chat */}
        <button onClick={() => setSelectedUser(null)}>
          <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;
