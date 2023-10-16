import { PiSparkleBold } from "react-icons/pi";
import InputPost from "./InputPost";

export default function Feed() {
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer text-black p-1">
          Feed
        </h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <PiSparkleBold className="h-5" fill="black" />
        </div>
      </div>
      <InputPost />
    </div>
  );
}
