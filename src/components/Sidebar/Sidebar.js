import Image from "next/image";
import SidebarItem from "./SidebarItem";
import images from "@/assets/images/images";
import {
  PiNewspaperClippingBold,
  PiChatsTeardropFill,
  PiSpeakerHifiBold,
  PiBellSimpleBold,
  PiHeartBold,
} from "react-icons/pi";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image width="50" height="50" src={images.logodark}></Image>
      </div>

      {/* Menu */}

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarItem text="Feed" Icon={PiNewspaperClippingBold} active />
        <SidebarItem text="Gossips" Icon={PiChatsTeardropFill} />
        <SidebarItem text="Hollerspace" Icon={PiSpeakerHifiBold} />
        <SidebarItem text="Liked Posts" Icon={PiHeartBold} />
        <SidebarItem text="Notifications" Icon={PiBellSimpleBold} />
      </div>

      {/* Button */}

      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Create
      </button>

      {/* Mini-Profile */}

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src={images.avatar}
          alt="user-img"
          className="h-10 w-10 rounded-full xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">John Doe</h4>
          <p className="text-gray-500">@mrjohndoe</p>
        </div>
      </div>
    </div>
  );
}
