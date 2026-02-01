// export default function IncomingCallModal({ caller, onAccept, onReject }) {
//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-slate-800 p-6 rounded-lg text-center">
//         <h2 className="text-lg text-white mb-4">
//           Incoming call from {caller.fullName}
//         </h2>

//         <div className="flex gap-4 justify-center">
//           <button
//             className="bg-green-600 px-4 py-2 rounded"
//             onClick={onAccept}
//           >
//             Accept
//           </button>

//           <button
//             className="bg-red-600 px-4 py-2 rounded"
//             onClick={onReject}
//           >
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useAuthStore } from "../store/useAuthStore";

// export default function IncomingCallModal() {
//   const {
//     incomingCall,
//     acceptCall,
//     socket,
//     setIncomingCall,
//   } = useAuthStore((state) => ({
//     incomingCall: state.incomingCall,
//     acceptCall: state.acceptCall,
//     socket: state.socket,
//     setIncomingCall: (call) => state.incomingCall !== null && state.incomingCall && state.incomingCall !== undefined
//       ? state.incomingCall && (() => {})()
//       : null,
//   }));

//   // If no incoming call, do not render
//   if (!incomingCall) return null;

//   const handleReject = () => {
//     // notify caller that call was rejected
//     socket?.emit("end-call", {
//       toUserId: incomingCall.fromUserId,
//     });

//     // clear incoming call
//     useAuthStore.setState({ incomingCall: null });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-slate-800 p-6 rounded-lg text-center w-80">
//         <h2 className="text-lg text-white mb-4">
//           Incoming video call
//         </h2>

//         <p className="text-slate-300 mb-6">
//           User wants to start a video call
//         </p>

//         <div className="flex gap-4 justify-center">
//           {/* ACCEPT */}
//           <button
//             className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
//             onClick={acceptCall}
//           >
//             Accept
//           </button>

//           {/* REJECT */}
//           <button
//             className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
//             onClick={handleReject}
//           >
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useAuthStore } from "../store/useAuthStore";

// export default function IncomingCallModal() {
//   const {
//     incomingCall,
//     acceptCall,
//     socket,
//   } = useAuthStore();

//   // No incoming call → render nothing
//   if (!incomingCall) return null;

//   const handleReject = () => {
//     // Notify caller
//     socket?.emit("end-call", {
//       toUserId: incomingCall.fromUserId,
//     });

//     // Clear incoming call safely
//     useAuthStore.setState({
//       incomingCall: null,
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//       <div className="bg-slate-800 p-6 rounded-lg text-center w-80">
//         <h2 className="text-lg text-white mb-2">
//           Incoming Video Call
//         </h2>

//         <p className="text-slate-300 mb-6">
//           User is calling you
//         </p>

//         <div className="flex gap-4 justify-center">
//           {/* ACCEPT */}
//           <button
//             className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white"
//             onClick={acceptCall}
//           >
//             Accept
//           </button>

//           {/* REJECT */}
//           <button
//             className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white"
//             onClick={handleReject}
//           >
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useAuthStore } from "../store/useAuthStore";

export default function IncomingCallModal() {
  const {
    incomingCall,
    acceptCall,
    endCall,
  } = useAuthStore();

  // No incoming call → nothing to render
  if (!incomingCall) return null;

  const { fromUser } = incomingCall;

  const handleReject = () => {
    endCall(); // safely emits video-call:end + cleanup
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl text-center w-80 shadow-lg">
        {/* Avatar */}
        {fromUser?.avatar && (
          <img
            src={fromUser.avatar}
            alt={fromUser.fullName}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        )}

        <h2 className="text-lg text-white mb-1">
          Incoming Video Call
        </h2>

        <p className="text-slate-300 mb-6">
          {fromUser?.fullName || "Someone"} is calling you
        </p>

        <div className="flex gap-4 justify-center">
          {/* ACCEPT */}
          <button
            onClick={acceptCall}
            className="bg-green-600 hover:bg-green-500 px-5 py-2 rounded-full text-white font-medium"
          >
            Accept
          </button>

          {/* REJECT */}
          <button
            onClick={handleReject}
            className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-full text-white font-medium"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
