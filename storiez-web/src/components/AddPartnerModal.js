import React, { useState } from "react";
import Modal from "react-modal";
import { RefreshIcon } from "@heroicons/react/outline";
import axios from 'axios'

function AddPartnerModal({ partnerOpen, yesPartner }) {
  const [partnerEmail, setPartnerEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const addPartner = () => {
    if (partnerEmail.length > 4) {
      setMsg('')
      setLoading(true)
      const client = JSON.parse(localStorage.getItem('client'))
      axios.post('http://localhost:9000/addpartner', {
        email: client.email,
        email2: partnerEmail
      }).then(res => {
        if (res.data.msg) {
          setMsg(res.data.msg)

          const data = JSON.stringify(res.data.info);
          localStorage.setItem("client", data);

          window.location = '/shared'
        } else if (res.data.error) {
          setError(res.data.error)
        }
        setLoading(false)
      })
    } else {
      setError('You need to add an email')
    }
  };
  return (
    <Modal isOpen={partnerOpen} className="p-4 border flex h-screen text-center">
      <div className=" border w-96 m-auto p-4 bg-white">
        <h1 className="text-2xl my-2 font-semibold text-left flex  items-center">
          Add a Partner
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-sm text-left">
            <strong>Note</strong>: Partners can only view your notes, and cannot edit nor delete them
          </p>
          <p className="w-6/12 text-center mt-4 text-red-600">{error}</p>
          <div className="my-4 gap-5 text-center">
            {/*TExt Input*/}
            <input type="email" onChange={(e) => {
              setError('')
              setPartnerEmail(e.target.value)
            }} className="border-b border-gray-400 mb-4 w-full bg-gray-100 py-1.5 px-2" />
            {msg ? <p className="mb-2 text-green-600"><strong>{msg} </strong>is now your friend</p> : null}

            <div className="flex items-center">
              <div className="py-1 px-5 flex items-center flex-3">
                <button onClick={() => yesPartner()}>Discard</button>
              </div>
              <button className="bg-black text-white flex-1 rounded-sm py-1 px-2" onClick={() => addPartner()}>{loading ? <RefreshIcon className="h-6 mx-auto p-0 " /> : 'Add Partner'}</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default AddPartnerModal;
