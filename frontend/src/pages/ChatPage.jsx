// import { useChatStore } from "../store/useChatStore";

// import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
// import ProfileHeader from "../components/ProfileHeader";
// import ActiveTabSwitch from "../components/ActiveTabSwitch";
// import ChatsList from "../components/ChatsList";
// import ContactList from "../components/ContactList";
// import ChatContainer from "../components/ChatContainer";
// import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

// function ChatPage() {
//   const { activeTab, selectedUser } = useChatStore();

//   return (
//     <div className="relative w-full max-w-6xl h-[800px]">
//       <BorderAnimatedContainer>
//         {/* LEFT SIDE */}
//         <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
//           <ProfileHeader />
//           <ActiveTabSwitch />

//           <div className="flex-1 overflow-y-auto p-4 space-y-2">
//             {activeTab === "chats" ? <ChatsList /> : <ContactList />}
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
//           {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
//         </div>
//       </BorderAnimatedContainer>
//     </div>
//   );
// }
// export default ChatPage;

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useWebRTC } from "../hooks/useWebRTC";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import IncomingCallModal from "../components/IncomingCallModal";
import VideoCallModal from "../components/VideoCallModal";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const { activeCall, endCall } = useAuthStore();

  // WebRTC hook (VIDEO HANDLING)
  const {
    localVideoRef,
    remoteVideoRef,
    toggleMute,
    toggleCamera,
    startRecording,
    stopRecording,
    isMuted,
    isCameraOff,
    isRecording,
  } = useWebRTC(activeCall);

  return (
    <div className="relative w-full max-w-6xl h-[800px]">
      <BorderAnimatedContainer>
        {/* LEFT SIDE */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </BorderAnimatedContainer>

      {/* ===================== VIDEO CALL LAYERS ===================== */}

      {/* Incoming Call (ringing) */}
      <IncomingCallModal />

      {/* Active Video Call */}
      {activeCall && (
        <VideoCallModal
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          onEnd={endCall}
          onToggleMute={toggleMute}
          onToggleCamera={toggleCamera}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          isMuted={isMuted}
          isCameraOff={isCameraOff}
          isRecording={isRecording}
        />
      )}
    </div>
  );
}

export default ChatPage;
