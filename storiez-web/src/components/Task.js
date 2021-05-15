import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteModal from './PromptModal'
import { ClockIcon, TrashIcon, PhotographIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";

function Task({ email, title, body, image, id, date, refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [increaseCardHeight, setIncreaseCardHeight] = useState(false);
  const [collapseableText, setCollapseableText] = useState(false)
  const [hideDeleteButton, setHideDeleteButton] = useState(false)

  useEffect(() => {
    if (body) {
      if (body.length > 40) {
        setCollapseableText(true)
      }
    }
    const client = JSON.parse(localStorage.getItem('client'))
    if (email !== client.email) {
      setHideDeleteButton(true)
    }
  }, [body, email])

  const actionAllowed = () => {
    axios
      .post("https://storiez-backend-server.herokuapp.com/delete", {
        id: id,
      })
      .then(() => {
        refresh()
      });
  };

  return (
    <div className="border-b flex flex-col border-gray-200 p-4 my-2 text-gray-800 cursor-pointer transition duration-150" onClick={() => setIncreaseCardHeight(!increaseCardHeight)}>
      {date !== null ? <div className="flex justify-end px-4 ">
        <p className="text-sm mb-4">{date}</p>
        <ClockIcon className="h-5 ml-2" />
      </div> : ''}

      <div className="px-4">
        {/* Title */}
        <div className="-mt-4 flex justify-between items-center">
          <h1 className=" text-lg font-medium">{title}</h1>
        </div>

        {/* Body Text */}
        <p className="transition duration-200"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: increaseCardHeight === false ? 'nowrap' : ''
          }} >{body}</p>
        {/*Add imaeg beneath*/}
        {image !== undefined ?
          <div>
            {image.length < 4 ? null : (
              <div>
                <div className="flex items-center gap-2 text-gray-400" style={{ display: increaseCardHeight === true ? 'none' : 'flex' }}>
                  <PhotographIcon className="h-4" />
                  <p>Image</p>
                </div>
                <img
                  src={image}
                  className="sm:mx-auto md:mx-0 sm:w-full md:w-9/12"
                  alt="Loading..."
                  style={{ display: increaseCardHeight === false ? 'none' : 'flex' }}
                />
              </div>
            )}
          </div> : ''
        }
      </div>

      <div className="text-red-800 mt-2 mx-2 flex justify-between">
        {/*Trash Icon*/}
        {hideDeleteButton === false ?
          <button
            className="px-1 active:text-red-200 duration-150 transition"
            onClick={() => setIsOpen(true)}
          ><TrashIcon className="h-5" /></button>
          : null}

        {collapseableText === true ?
          <div>
            {increaseCardHeight === false ?
              <p className="text-gray-400 mx-4 flex items-center">
                <ArrowDownIcon className="h-5" />
                Expand
            </p> :
              <p className="text-gray-400 mx-4 flex items-center">
                <ArrowUpIcon className="h-5" />
                Collapse
            </p>}
          </div> : null}

      </div>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} actionAllowed={actionAllowed} />
    </div>
  );
}

export default Task;
