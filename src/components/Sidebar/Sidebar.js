import Image from "next/image";
import SidebarItem from "./SidebarItem";
import images from "@/assets/images/images";
import {
  TbHearts,
  TbNews,
  TbNotification,
  TbDeviceSpeaker,
  TbMessages,
  TbDots,
} from "react-icons/tb";
import "./Sidebar.scss";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { userState } from "../../atom/atom";

export default function Sidebar() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser);
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUser = async () => {
          const docRef = doc(db, "users", auth.currentUser.providerData[0].uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data());
          }
        };
        fetchUser();
      }
    });
  }, []);

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }
  return (
    <div className="hidden sm:flex flex-col p-3 xl:items-start fixed h-full xl:ml-24">
      <div className="hoverEffect p-2 mt-4 hover:bg-blue-100 xl:px-1">
        <Image
          width="200"
          height="200"
          src={images.logodark}
          className="p-1"
        ></Image>
      </div>

      <div className="mt-4 mb-2.5 xl:items-start">
        <SidebarItem text="Feed" Icon={TbNews} active />
        <SidebarItem text="Gossips" Icon={TbMessages} />
        <SidebarItem text="Hollerspace" Icon={TbDeviceSpeaker} />
        <SidebarItem text="Liked Posts" Icon={TbHearts} />
        <SidebarItem text="Notifications" Icon={TbNotification} />
      </div>

      {currentUser ? (
        <>
          <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
            Create
          </button>

          <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <img
              onClick={onSignOut}
              src={currentUser?.userImg}
              alt="user-img"
              className="h-10 w-10 rounded-full xl:mr-2"
            />
            <div className="leading-5 hidden xl:inline">
              <h4 className="font-bold">{currentUser?.name}</h4>
              <p className="text-gray-500">@{currentUser?.username}</p>
            </div>
            <TbDots className="h-5 xl:ml-8 hidden xl:inline" />
          </div>
        </>
      ) : (
        <button
          onClick={() => router.push("/auth/signin")}
          className="bg-blue-400 create-button text-white rounded-md w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline"
        >
          Sign in now
        </button>
      )}
    </div>
  );
}
