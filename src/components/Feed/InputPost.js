"use client";

import { TbPhoto, TbMoodSmileBeam, TbCircleX } from "react-icons/tb";
import images from "@/assets/images/images";
import "./Feed.scss";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../../atom/atom";
import { db, storage } from "../../../firebase";
import { signOut, getAuth } from "firebase/auth";

export default function Input() {
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const auth = getAuth();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      id: currentUser.uid,
      text: input,
      userImg: currentUser.userImg,
      timestamp: serverTimestamp(),
      name: currentUser.name,
      username: currentUser.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  function onSignOut() {
    signOut(auth);
    setCurrentUser(null);
  }

  return (
    <>
      {currentUser && (
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <img
            src={currentUser?.userImg}
            onClick={onSignOut}
            alt="user-img"
            className="h-11 w-11 rounded cursor-pointer hover:brightness-95"
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows="2"
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
            {selectedFile && (
              <div className="relative">
                <TbCircleX
                  onClick={() => setSelectedFile(null)}
                  className="border h-7 text-black absolute cursor-pointer shadow-md border-white m-1 rounded-full"
                />
                <img
                  src={selectedFile}
                  className={`${loading && "animate-pulse"}`}
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div
                      className=""
                      onClick={() => filePickerRef.current.click()}
                    >
                      <TbPhoto className="h-10 w-10 hoverEffect p-2 text-green-500 hover:bg-green-100" />
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addImageToPost}
                      />
                    </div>
                    <TbMoodSmileBeam className="h-10 w-10 hoverEffect p-2 text-yellow-500 hover:bg-yellow-100" />
                  </div>
                  <button
                    onClick={sendPost}
                    disabled={!input.trim()}
                    className="bg-blue-400 post-button text-white px-4 py-1.5 rounded-md font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Post
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
