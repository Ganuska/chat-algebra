import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { logIn } = UserAuth();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin((old) => {
      const name = e.target.name;
      const value = e.target.value;
      return { ...old, [name]: value };
    });
  };

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await logIn(login.email, login.password);
      navigate("/Home");
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
          onSubmit={handleLogIn}
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="email"
            name="email"
            value={login.email}
            onChange={handleChange}
            className="max-w-full text-center h-10 focus:outline-0 border-0 border-b-2 rounded-md"
          />
          <input
            autoComplete="true"
            type="password"
            placeholder="password"
            name="password"
            value={login.password}
            onChange={handleChange}
            className="max-w-full text-center h-10 focus:outline-0 border-0 border-b-2 rounded-md"
          />
          <button className=" m-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 ">
            Log In
          </button>
        </form>
        <p className="mt-2 cursor-pointer hover:underline"></p>
        <p className="text-sm mt-2 text-gray-500">
          Don`t have an account?
          <b className="hover:text-blue-900 cursor-pointer">
            <Link to={"SignUp"}> SignUp</Link>
          </b>
        </p>
      </div>
    </div>
  );
};

export default Login;
