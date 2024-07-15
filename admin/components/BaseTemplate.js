import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function BaseTemplate(props) {
  return (
    <>
      <div id='root'>
        <div className="flex flex-row h-screen">
          <ToastContainer />

          <Sidebar />
          <div className="flex flex-col flex-1 w-screen h-screen bg-gray-300">
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
