import React, { useState } from "react";
import logo from "../assets/logo.png";
import lock from "../assets/lock.svg";
import hamburgerMenu from "../assets/hamburgerMenu.svg";
import close from "../assets/close.svg";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => setToggle(!toggle);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };
  const handleUserLogin = () => {
    navigate("/userLogin");
  };
  const handleUserRegister = () => {
    navigate("/userRegister");
  };
  return (
    <div className="w-full h-[90px] bg-white border-b">
      <div className="md:max-w-[1480px] max-w-[600px] m-auto w-full h-full flex justify-between items-center md:px-0 px-4">
        <img
          src={logo}
          className="h-[90px]"
          style={{ cursor: "pointer" }}
          alt="logo"
          onClick={handleHomeClick}
        />

        <div className="hidden md:flex items-center ">
          <ul className="flex gap-4">
            <li onClick={handleHomeClick} style={{ cursor: "pointer" }}>
              Home
            </li>
          </ul>
        </div>

        <div className="hidden md:flex">
          <button
            className="flex justify-between items-center bg-transparent px-6 gap-2"
            style={{ cursor: "pointer" }}
            onClick={handleUserLogin}
          >
            <img src={lock} alt="lock" />
            Login
          </button>

          <button
            className="px-8 py-3 rounded-md bg-[#20B486] text-white font-bold"
            style={{ cursor: "pointer" }}
            onClick={handleUserRegister}
          >
            Register
          </button>
        </div>

        <div className="md:hidden" onClick={handleClick}>
          <img src={toggle ? close : hamburgerMenu} alt="hamburgerMenu" />
        </div>
      </div>

      <div
        className={
          toggle
            ? "absolute z-10 p-4  bg-white w-full px-8 md:hidden border-b"
            : "hidden"
        }
      >
        <ul>
          <li
            className="p-4 hover:bg-gray-100"
            onClick={handleHomeClick}
            style={{ cursor: "pointer" }}
          >
            Home
          </li>
          <div className="flex flex-col my-4 gap-4">
            <button
              className="border border-[20B486] flex justify-center items-center  bg-transparent  px-6 gap-2 py-4"
              onClick={handleUserLogin}
              style={{ cursor: "pointer" }}
            >
              <img src={lock} alt="lock" />
              Login
            </button>
            <button
              className="px-8 py-5 rounded-md bg-[#20B486] text-white font-bold"
              style={{ cursor: "pointer" }}
              onClick={handleUserRegister}
            >
              Register
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
