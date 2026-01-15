export default function IncomingCallModal({ caller, onAccept, onReject }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg text-center">
        <h2 className="text-lg text-white mb-4">
          Incoming call from {caller.fullName}
        </h2>

        <div className="flex gap-4 justify-center">
          <button
            className="bg-green-600 px-4 py-2 rounded"
            onClick={onAccept}
          >
            Accept
          </button>

          <button
            className="bg-red-600 px-4 py-2 rounded"
            onClick={onReject}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
