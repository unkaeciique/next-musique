import Image from "next/image";
import SidebarItem from "./SidebarItem";
import images from "@/assets/images/images";
import {
  TbHearts,
  TbNavigationQuestion,
  TbNotification,
  TbDeviceSpeaker,
  TbMessages,
} from "react-icons/tb";
import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <div className="hidden sm:flex flex-col p-3 xl:items-start fixed h-full">
      <div className="hoverEffect p-2 mt-4 hover:bg-blue-100 xl:px-1">
        <Image
          width="200"
          height="200"
          src={images.logodark}
          className="p-1"
        ></Image>
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarItem text="Feed" Icon={TbNavigationQuestion} active />
        <SidebarItem text="Gossips" Icon={TbMessages} />
        <SidebarItem text="Hollerspace" Icon={TbDeviceSpeaker} />
        <SidebarItem text="Liked Posts" Icon={TbHearts} />
        <SidebarItem text="Notifications" Icon={TbNotification} />
      </div>

      <button className="bg-blue-400 create-button text-white rounded-md w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
        Create
      </button>

      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <img
          src={images.avatar2}
          alt="user-img"
          className="h-10 w-10 rounded-md xl:mr-2"
        />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">John Doe</h4>
          <p className="text-gray-500">@mrjohndoe</p>
        </div>
      </div>
    </div>
  );
}
