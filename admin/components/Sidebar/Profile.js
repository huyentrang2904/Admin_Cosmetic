import React from "react";
import Link from 'next/link';
import { PowerIcon } from "@heroicons/react/24/outline"

export default function Profile() {
  return (
    <div className="flex flex-row flex-shrink-0 p-4 bg-gray-700">
      <Link href="/detailUser" className="flex flex-shrink w-full group">
        <div className="flex items-center">
          <div className="ml-3">
            <p className="text-base font-medium text-white">ABCD</p>
            <p className="text-base font-medium text-white">ABCD</p>

            <button className="text-sm font-medium text-gray-300 group-hover:text-gray-200">
              Đổi mật khẩu
            </button>
          </div>
        </div>

      </Link>
      <button onClick={() => signOut()} className="flex items-center flex-shrink-0 pr-2 hover:opacity-70 justify-self-end">
        <PowerIcon className="w-8 h-8 font-bold text-white "></PowerIcon>
      </button>
    </div>
  );
}
