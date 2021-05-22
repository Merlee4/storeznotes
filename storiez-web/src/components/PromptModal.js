import React from "react"
import Modal from "react-modal";
import { InformationCircleIcon } from "@heroicons/react/outline";

function PrompModal({ isOpen, setIsOpen, actionAllowed }) {
  const performAction = () => {
    actionAllowed();
    setIsOpen();
  };
  return (
    <Modal isOpen={isOpen} className="p-4 border flex h-screen text-center">
      <div className="rounded-lg border w-96 m-auto p-4 bg-white flex flex-col items-center">
        <InformationCircleIcon className="h-10 mb-2 text-gray-700 text-center" />
        <div className="flex flex-col items-center">
          <p className=" w-48 text-center">
            Are you sure you want to perform this action?
          </p>
          <div className="my-4 flex gap-5">
            <div className="py-1 px-5 bg-gray-200 rounded font-medium flex justify-center">
              <button onClick={() => performAction()}>Yes</button>
            </div>
            <div className="py-1 px-5 flex items-center">
              <button onClick={() => setIsOpen()}>No</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PrompModal;
