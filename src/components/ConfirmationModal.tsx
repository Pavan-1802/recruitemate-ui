export default function ConfirmationModal({message, onConfirm, onCancel}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-md flex flex-col gap-4">
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onConfirm} className="bg-slate-800 text-white px-4 py-1 rounded mr-2">Confirm</button>
          <button onClick={onCancel} className="bg-slate-100 text-gray-800 px-4 py-1 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
}