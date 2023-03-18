import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { auth, upload } from "../firebase";
import { useUpdateProfile } from "react-firebase-hooks/auth";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();
  const [updateProfile] = useUpdateProfile(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
      await upload(avatar, auth.currentUser);
      await updateProfile({
        displayName: name,
        photoURL: localStorage.getItem("profile"),
      });
      navigate("/Home");
    } catch (error: any) {
      setError(error.message);
      console.log(err);
    }
  };
  const getAvatar = useCallback(() => {
    if (avatar) {
      return URL.createObjectURL(avatar);
    } else {
      return "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png";
    }
  }, [avatar]);

  useEffect(() => {
    setAvatarPreview(getAvatar());
  }, [avatar, getAvatar]);

  return (
    <div className="h-screen flex justify-center items-center bg-indigo-200">
      <div className=" flex justify-center items-center flex-col w-full h-full sm:w-[300px] sm:h-[400px] ">
        <h1 className="flex items-center mb-6 text-5xl font-extrabold dark:text-emerald-500">
          Chat
          <span className="bg-blue-100 mb-6 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-400 dark:text-blue-800 ml-2">
            BETA
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className=" max-w-full focus:outline-0  h-10  text-center rounded-md border-b-2 "
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className=" max-w-full text-center h-10 focus:outline-0 border-0 border-b-2 rounded-md"
          />
          <input
            autoComplete="true"
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="max-w-full text-center h-10  border-0 border-b-2 focus:outline-0 rounded-md"
          />
          <div
            className="h-16 w-16 bg-blue-500 rounded-full bg-cover bg-center"
            style={{ backgroundImage: `url(${avatarPreview})` }}
          ></div>
          <label
            htmlFor="avatar"
            className="text-green-700 cursor-pointer hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          >
            upload Avatar
          </label>
          <input
            type="file"
            placeholder="avatar"
            id="avatar"
            name="avatar"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.target.files &&
              e.target.files[0] &&
              setAvatar(e.target.files[0])
            }
            className=" hidden max-w-full focus:outline-0  h-10  text-center rounded-md border-b-2 "
          />
          {err && <p className="text-red-500 text-center">{err}</p>}
          <button className=" m-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
            Sign Up
          </button>
        </form>
        <p className="mt-2 cursor-pointer hover:underline"></p>
        <p className="text-sm mt-2 text-gray-500">
          Alredy have an account?
          <b className="hover:text-blue-900 cursor-pointer">
            <Link to={"/"}> Log In</Link>
          </b>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
