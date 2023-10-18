"use client";

import { TbSearch } from "react-icons/tb";

export default function Widgets() {
  return (
    <div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <div className="flex items-center p-3 rounded-md bg-red-300 relative ">
          <TbSearch className="h-5 z-50 text-gray-500 " />
          <input
            className="absolute focus:scale-110 transition inset-0 rounded-md pl-11 border-black border-2 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
            type="text"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}
