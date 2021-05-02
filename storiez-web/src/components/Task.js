import React, { useState } from "react";
import axios from "axios";
import DeleteModal from './DeleteModal'
import { ClockIcon, TrashIcon, PhotographIcon } from "@heroicons/react/outline";

function Task({ title, body, image, id, date, refresh }) {
  const [isOpen, setIsOpen] = useState(false);
  const [increaseCardHeight, setIncreaseCardHeight] = useState(false);

  const yesDelete = () => {
    axios
      .post("https://storiez-backend-server.herokuapp.com/delete", {
        id: id,
      })
      .then((res) => {
        refresh()
      });
  };

  return (
    <div className="border-b flex flex-col border-gray-200 pb-4 my-2 text-gray-800 cursor-pointer transition duration-150" onClick={() => setIncreaseCardHeight(!increaseCardHeight)}>
      {/* Click Icon */}
      <div className="flex justify-end px-4 ">
        <p className="text-sm mb-4">{date}</p>
        <ClockIcon className="h-5 ml-2" />
      </div>
      <div className="px-4">
        {/* Title */}
        <div className="-mt-4 flex justify-between items-center">
          <h1 className=" text-lg font-medium">{title}</h1>
        </div>
        {/* Body Text */}
        <p
          className="transition duration-200"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: increaseCardHeight == false ? 'nowrap' : null
          }} >{body}</p>

        {image.length < 4 ? null : (
          <div>
            <div className="flex items-center gap-2 text-gray-400" style={{ display: increaseCardHeight == true ? 'none' : 'flex' }}>
              <PhotographIcon className="h-4" />
              <p>Image</p>
            </div>
            <img
              src={image}
              className="sm:mx-auto md:mx-0 sm:w-full md:w-9/12"
              alt="Image Loading..."
              style={{ display: increaseCardHeight == false ? 'none' : 'flex' }}
            />
          </div>
        )}
      </div>
      <div className="text-red-800 mt-2 mx-2 flex justify-between">
        <button
          className="px-1 active:text-red-200 duration-150 transition"
          onClick={() => setIsOpen(true)}
        ><TrashIcon className="h-5" /></button>
        {increaseCardHeight == false ? <p className="text-gray-400 mx-4">Click to view more</p> : <p className="text-gray-400 mx-4">Click to hide</p>}
      </div>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} yesDelete={yesDelete} />
    </div>
  );
}

export default Task;
