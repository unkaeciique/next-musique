import {
  TbEyeClosed,
  TbMessage2,
  TbDots,
  TbHeart,
  TbExternalLink,
} from "react-icons/tb";

export default function Post({ post }) {
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
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px] text-slate-700">
              @{post.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] text-slate-500 hover:underline">
              {post.timestamp}
            </span>
          </div>

          <TbDots className="h-10 menuHoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {post.text}
        </p>

        <img className="rounded-md mr-2" src={post.img} alt="" />

        <div className="flex justify-between text-gray-500 p-2">
          <TbHeart className="h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100" />
          <TbMessage2 className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TbExternalLink className="h-9 w-9 hoverEffect p-2 hover:text-indigo-500 hover:bg-indigo-100" />
          <TbEyeClosed className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
        </div>
      </div>
    </div>
  );
}
