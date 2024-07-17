import { deleteCoupcon } from "@/state/Admin/Action";
import { getAllCoupcon } from "@/state/Admin/Action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DeleteCoupcon = (props) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteCoupcon(props.data)).then((value) => {
      dispatch(getAllCoupcon());
      setTimeout(props.onClose, 200);
      // Expected output: "Success!"
    });;
  };
  return (
    <div id="root">
      <div className="absolute w-2/6 px-10 py-5 mt-4 -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 rounded-xl">
        <div className="font-semibold tracking-wide">Delete coupcon</div>

        <div className="mt-5">Do you want to delete this coupcon?</div>
        <div className="flex flex-row-reverse gap-5 mt-5">
          <button
            className="p-2 px-6 bg-white border-2 text-dark-purple hover:bg-dark-purple hover:text-white border-dark-purple rounded-2xl"
            onClick={() => {
              handleDelete();
            }}
          >
            Confirm
          </button>
          <button
            onClick={props.onClose}
            className="p-2 px-6 text-red-500 bg-white border-2 border-red-500 hover:text-white hover:bg-red-500 rounded-2xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCoupcon;
