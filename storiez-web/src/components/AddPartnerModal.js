import React, { useState } from "react";
import Modal from "react-modal";
import { UsersIcon } from "@heroicons/react/outline";
import axios from 'axios'

function AddPartnerModal({ partnerOpen, yesPartner }) {
  const [partnerEmail, setPartnerEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [error,setError ] = useState('')

  const yesAdd = () => {
    yesPartner();
  };

  const addPartner = () => {
    const client = JSON.parse(localStorage.getItem('client'))
    axios.post('http://localhost:9000/addpartner', {
      email: client.email,
      email2: partnerEmail
    }).then(res => {
      console.log(res)
      if(res.statusCode != 200){
        setError(res.data.msg)
      }else{
        setMsg(res.data)
      }
    })
  };
  return (
    <Modal isOpen={partnerOpen} className="p-4 border flex h-screen text-center">
      <div className="rounded-lg border w-96 m-auto p-4 bg-white">
        <h1 className="text-xl my-2 font-semibold text-left flex  justify-between mx-10 items-center">
          Add a Partner
          <UsersIcon className="h-10 text-center" />
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-sm text-left">
            <strong>Note</strong>: Partners can only view your notes, and cannot edit nor delete them
          </p>
          <p className="w-6/12 text-center mt-4 text-red-600">{error}</p>
          <div className="my-4 gap-5 text-center">
            {/*TExt Input*/}
            <input type="email" onChange={(e) => setPartnerEmail(e.target.value)} className="border-b border-gray-400 mb-4 w-full bg-gray-100 py-1.5 px-2" />
            {msg ? <p className="mb-2 text-green-600"><strong>{msg}</strong> <br/>is now your friend</p> : null}
            
            <div className="flex">
              <button onClick={() => yesAdd()} className="bg-black text-white rounded py-1 px-2" onClick={() => addPartner()}>Add Partner</button>
              <div className="py-1 px-5 flex items-center">
                <button onClick={() => yesPartner()}>Discard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddPartnerModal;
