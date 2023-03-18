import React, { useState } from "react";
import { push } from "firebase/database";
import { chatRef } from "../firebase";
import { UserAuth } from "../context/AuthContext";

const Input = () => {
  const { user } = UserAuth();
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    setInput("");
    if (input !== "") {
      push(chatRef, {
        message: input,
        sender: user.displayName,
        time: Date.now(),
        photoURL: user.photoURL,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex w-full relative items-center">
      <input
        type="text"
        onChange={handleChange}
        onKeyPress={handleKeyDown}
        value={input}
        placeholder="Type something..."
        className=" outline-none w-full border-none p-3  pr-0  cursor-text box-border h-[50px]"
      />
      <button
        onClick={handleSubmit}
        className="absolute right-0 p-1 pl-4 pr-4 h-full bg-gray-800  "
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-blue-600 dark:text-blue-500 hover:dark:text-blue-600 hover:text-blue-500 "
          focusable="false"
          data-prefix="fas"
          data-icon="paper-plane"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"
          ></path>
        </svg>
      </button>

      <label htmlFor="InputFile" className="cursor-pointer" />
    </div>
  );
};

export default Input;
