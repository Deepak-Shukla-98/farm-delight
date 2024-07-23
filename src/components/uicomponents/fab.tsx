import React from "react";
import { PiCirclesThreePlusDuotone } from "react-icons/pi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

export default function FabRounded() {
  return (
    <>
      <div className="group flex items-center gap-2 rtl:space-x-reverse">
        <div className="group relative z-50 inline-flex h-12 items-center justify-center gap-2 self-center whitespace-nowrap mx-3 cursor-pointer">
          <span className="relative transition duration-300 only:-mx-6 group-hover:rotate-45 hover:text-green-600">
            <span className="sr-only">Button description</span>
            <PiCirclesThreePlusDuotone size={25} />
          </span>
        </div>
        <button className="inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded-full bg-emerald-50 px-6 text-sm font-medium tracking-wide text-emerald-500 opacity-0 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="relative only:-mx-6">
            <span className="sr-only">Button description</span>
            <FiEdit size={20} />
          </span>
        </button>
        <button className="inline-flex h-0 w-0 translate-y-2 items-center justify-center gap-2 self-center justify-self-center overflow-hidden whitespace-nowrap rounded-full bg-emerald-50 px-6 text-sm font-medium tracking-wide text-emerald-500 opacity-0 transition delay-[0.05s] duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none group-hover:h-12 group-hover:w-12 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="relative only:-mx-6">
            <span className="sr-only">Button description</span>
            <AiOutlineDelete size={20} />
          </span>
        </button>
      </div>
    </>
  );
}
