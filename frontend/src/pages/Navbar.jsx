import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// react icons
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

// images from public folder
import logo from "/yt-logo.png";

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="flex justify-between fixed top-0 w-[100%] bg-gray-900 text-white px-6 py-2">
      <div className="flex items-center space-x-4">
        <AiOutlineMenu className="text-xl cursor-pointer" />
        <img src={logo} alt="" className="w-28 cursor-pointer" />
      </div>
      <div className="flex w-[35%] items-center">
        <div className="w-[100%] px-4 py-2 border-[1px] border-gray-600 rounded-l-full bg-gray-800">
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-gray-800 text-white"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border-[1px] border-gray-600 bg-gray-700 rounded-r-full"
        onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={"24px"} />
        </button>
        <IoMdMic
          size={"42px"}
          className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-700 duration-200"
        />
      </div>
      <div className="flex space-x-5 items-center">
        <RiVideoAddLine className="text-2xl cursor-pointer" />
        <AiOutlineBell className="text-2xl cursor-pointer" />
        <RxAvatar size="32" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
