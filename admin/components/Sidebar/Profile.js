import React, { useState } from "react";
import { PowerIcon } from "@heroicons/react/24/outline"
import UpdatePassword from "./UpdatePassword";
import BasicModal from "../Modal/BasicModal";

export default function Profile({ user, logout }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-row flex-shrink-0 p-4 bg-gray-700">
      <div className="flex flex-shrink w-full group">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-base font-medium text-white">{user?.userName}</p>
            <button onClick={() => setOpen(true)} className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
              Change passwood
            </button>
          </div>
        </div>

      </div>
      <button onClick={() => logout()} className="flex items-center flex-shrink-0 pr-2 hover:opacity-70 justify-self-end">
        <PowerIcon className="w-8 h-8 font-bold text-white "></PowerIcon>
      </button>
      <BasicModal open={open} onClose={() => setOpen(false)}>
        <UpdatePassword
          open={open}
          onClose={() => setOpen(false)}
          user={user}
        />
      </BasicModal>
    </div>
  );
}
