import { InformationCircleIcon } from "@heroicons/react/outline";
import React from "react";
import Modal from "react-modal";

function PrompModal({ isOpen, setIsOpen, yesDelete }) {
  const deleteNow = () => {
    yesDelete();
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} className="p-4 border flex h-screen text-center">
      <div className="rounded-lg border w-96 m-auto p-4 bg-white flex flex-col items-center">
        <InformationCircleIcon className="h-10 text-pink-700 text-center" />
        <h1 className="text-xl my-2">
          Are you sure you want to delete this Task?
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-sm w-48 text-center">
            Be careful this action cannot be undone
          </p>

          <div className="my-4 flex gap-5">
            <div className="py-1 px-5 bg-gray-200 rounded font-medium flex justify-center">
              <button onClick={() => deleteNow()}>Yes</button>
            </div>
            <div className="py-1 px-5 flex items-center">
              <button onClick={() => setIsOpen(false)}>No</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PrompModal;
