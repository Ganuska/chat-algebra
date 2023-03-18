import React, { useEffect, useState, useRef } from "react";
import { onValue } from "firebase/database";
import { chatRef } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Recived from "../components/Recived";
import Send from "../components/Send";
import Input from "../components/Input";
interface Message {
  message: string;
  sender: string;
  time: number;
  photoURL: string;
}

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = UserAuth();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logOut } = UserAuth();

  const handleScrollToBottom = (): void => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await logOut();
      navigate("/Signup");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);

  useEffect(() => {
    onValue(chatRef, (snapshot: any) => {
      const data = snapshot.val();
      const messageArray = data && (Object.values(data) as Message[]);
      setMessages(messageArray);
    });
  }, []);

  return (
    <div className="  flex justify-center flex-col items-center bg-indigo-200 h-screen">
      <div className=" relative pb-11 flex-col rounded-sm w-full box-border shadow-2xl shadow-zinc-800 overflow-hidden lg:w-4/5 lg:h-3/4 h-full flex">
        <div className="w-full flex justify-between bg-gray-800  pr-5">
          <h1 className="flex items-center  ml-5 text-5xl font-extrabold dark:text-emerald-500">
            Chat
            <span className="bg-blue-100  text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-400 dark:text-blue-800 ml-2">
              BETA
            </span>
          </h1>
          <button
            onClick={handleLogOut}
            className="m-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 "
          >
            log out
          </button>
        </div>
        <div className="bg-slate-400 flex flex-col grow overflow-y-auto scrollbar-thin scrollbar-track-slate-600 scrollbar-thumb-gray-900 ">
          {messages?.map((message, index) =>
            message.sender === user.displayName ? (
              <div key={index}>
                <Send
                  message={message.message}
                  time={message.time}
                  name={message.sender}
                  avatar={message.photoURL}
                />
                <div ref={ref}></div>
              </div>
            ) : (
              <div key={index}>
                <Recived
                  message={message.message}
                  time={message.time}
                  name={message.sender}
                  avatar={message.photoURL}
                />
                <div ref={ref}></div>
              </div>
            )
          )}
          <div className="absolute bottom-0 w-full">
            <Input />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
