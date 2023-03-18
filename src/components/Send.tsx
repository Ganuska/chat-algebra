import React from "react";

type Props = {
  time: number;
  message: string;
  name: string;
  avatar: string;
};

const Send = (props: Props) => {
  return (
    <div className="flex pr-5  justify-end">
      <div className="m-5 border rounded-lg bg-blue-600 border-none p-2 text-right max-w-lg">
        <p className="text-stone-800 font-extrabold text-right mb-2">
          {props.name}
        </p>
        <p className=" max-w-xs break-words pl-2 pr-3 text-lg">
          {props.message}
        </p>
      </div>
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
    </div>
  );
};

export default Send;
