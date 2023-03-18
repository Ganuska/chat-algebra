import React from "react";

type Props = {
  time: number;
  message: string;
  name: string;
  avatar: string;
};

const Recived = (props: Props) => {
  return (
    <div className="flex p-3">
      <div className="flex flex-col justify-center items-center ">
        <img
          src={props.avatar}
          alt="user"
          className="object-cover w-9 h-9 rounded-full"
        />
        <p className="text-gray-500 text-sm">
          {new Date(props.time).toLocaleTimeString()}
        </p>
      </div>
      <div className="m-5 border w-1/2 max-w-xs text-ellipsis rounded-lg bg-white p-2">
        <p className="text-stone-800 font-extrabold">{props.name}</p>
        <p className="max-w-full break-words pl-2 pr-3">{props.message}</p>
      </div>
    </div>
  );
};
export default Recived;
