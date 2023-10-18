import {
  TbArchive,
  TbMessage2,
  TbDots,
  TbHeart,
  TbHeartFilled,
  TbExternalLink,
} from "react-icons/tb";
import Moment from "react-moment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { db, storage } from "../../../firebase";
import { modalState, userState, postIdState } from "@/atom/atom";
import { useRouter } from "next/router";

export default function Post({ post, id }) {
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [currentUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === currentUser?.uid) !== -1);
  }, [likes, currentUser]);

  async function likePost() {
    if (currentUser) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", currentUser?.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", currentUser?.uid), {
          username: currentUser?.username,
        });
      }
    } else {
      router.push("/auth/signin");
    }
  }

  async function deletePost() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteDoc(doc(db, "posts", id));
      if (post.data().image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push("/");
    }
  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <img
        className="h-11 w-11 rounded mr-4"
        src={post.userImg}
        alt="user-img"
      />
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] text-black hover:text-sky-00">
              {post?.data()?.name}
            </h4>
            <span className="text-sm sm:text-[15px] text-slate-700">
              @{post?.data()?.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] text-slate-500 hover:underline">
              {post?.data()?.timestamp?.toDate()}
            </span>
          </div>

          <TbDots className="h-10 menuHoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {post?.data()?.text}
        </p>

        <img className="rounded-md mr-2" src={post?.data()?.image} alt="" />

        <div className="flex justify-between text-gray-500 p-2">
          <div className="flex items-center">
            {hasLiked ? (
              <TbHeartFilled
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100"
              />
            ) : (
              <TbHeart
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-pink-600"} text-sm select-none`}
              >
                {" "}
                {likes.length}
              </span>
            )}
          </div>
          <div className="flex items-center select-none">
            <TbMessage2
              onClick={() => {
                if (!currentUser) {
                  router.push("/auth/signin");
                } else {
                  setPostId(id);
                  setOpen(!open);
                }
              }}
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
            />
            {comments.length > 0 && (
              <span className="text-sm">{comments.length}</span>
            )}
          </div>

          <TbExternalLink className="h-9 w-9 hoverEffect p-2 hover:text-indigo-500 hover:bg-indigo-100" />
          {currentUser?.uid === post?.data()?.id && (
            <TbArchive
              onClick={deletePost}
              className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
            />
          )}
        </div>
      </div>
    </div>
  );
}
