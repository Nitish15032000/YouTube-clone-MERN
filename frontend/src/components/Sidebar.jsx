import React from "react";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio, SiYoutubekids, SiYoutubemusic, SiTrendmicro } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { PiLightbulbLight } from "react-icons/pi";
import { SiStylelint } from "react-icons/si";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";

function Sidebar() {
  const sidebarItems = [
    { id: 1, name: "Home", icon: <GoHome /> },
    { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
    { id: 3, name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
  ];
  const sidebarItems2 = [
    { id: 1, name: "Your Channel", icon: <PiUserSquareThin /> },
    { id: 2, name: "History", icon: <MdHistory /> },
    { id: 3, name: "Playlists", icon: <MdOutlineSubscriptions /> },
    { id: 4, name: "Your Videos", icon: <BiVideo /> },
    { id: 5, name: "Watch later", icon: <MdOutlineWatchLater /> },
    { id: 6, name: "Liked videos", icon: <AiOutlineLike /> },
  ];
  const sidebarItems3 = [
    { id: 1, name: "Trending", icon: <SiTrendmicro /> },
    { id: 2, name: "Shopping", icon: <HiOutlineShoppingBag /> },
    { id: 3, name: "Music", icon: <SiYoutubemusic /> },
    { id: 4, name: "Films", icon: <PiFilmSlateLight /> },
    { id: 5, name: "Live", icon: <CgMediaLive /> },
    { id: 6, name: "Gaming", icon: <IoGameControllerOutline /> },
    { id: 7, name: "News", icon: <FaRegNewspaper /> },
    { id: 8, name: "Sport", icon: <TfiCup /> },
    { id: 9, name: "Courses", icon: <SiStylelint /> },
    { id: 10, name: "Fashion & beauty", icon: <PiLightbulbLight /> },
    { id: 11, name: "Podcasts", icon: <MdPodcasts /> },
  ];
  const sidebarItems4 = [
    { id: 1, name: "YouTube Premium", icon: <FaYoutube /> },
    { id: 2, name: "YouTube Studio", icon: <SiYoutubestudio /> },
    { id: 3, name: "YouTube Music", icon: <SiYoutubemusic /> },
    { id: 4, name: "YouTube Kids", icon: <SiYoutubekids /> },
  ];

  return (
    // bg-gray-900 text-white 
    <div className="px-6 w-[17%] h-[calc(100vh-3.5rem)] overflow-y-scroll overflow-x-hidden bg-gray-900 text-white">
      {/* Home */}
      <div className="space-y-3 items-center">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 hover:bg-gray-700 duration-300 rounded-xl p-1"
          >
            <div className="text-xl cursor-pointer">{item.icon}</div>
            <span className="cursor-pointer">{item.name}</span>
          </div>
        ))}
      </div>
      <br />
      <hr className="border-gray-700" />
      {/* You */}
      <div className="mt-4 space-y-3 items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-gray-400">You</h1>
          <FaChevronRight />
        </div>
        {sidebarItems2.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 hover:bg-gray-700 duration-300 rounded-xl p-1"
          >
            <div className="text-xl cursor-pointer">{item.icon}</div>
            <span className="cursor-pointer">{item.name}</span>
          </div>
        ))}
      </div>
      <br />
      <hr className="border-gray-700" />
      {/* Explore */}
      <div className="mt-4 space-y-3 items-center">
        <div className="items-center space-x-2">
          <h1 className="font-semibold text-gray-400">Explore</h1>
        </div>
        {sidebarItems3.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 hover:bg-gray-700 duration-300 rounded-xl p-1"
          >
            <div className="text-xl cursor-pointer">{item.icon}</div>
            <span className="cursor-pointer">{item.name}</span>
          </div>
        ))}
      </div>
      <br />
      <hr className="border-gray-700" />
      {/* More section */}
      <div className="mt-4 space-y-3 items-center">
        <div className="items-center space-x-2">
          <h1 className="font-semibold text-gray-400">More From YouTube</h1>
        </div>
        {sidebarItems4.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-6 hover:bg-gray-700 duration-300 rounded-xl p-1"
          >
            <div className="text-xl cursor-pointer text-red-500">
              {item.icon}
            </div>
            <span className="cursor-pointer">{item.name}</span>
          </div>
        ))}
        <hr className="border-gray-700" />
      </div>
      <br />
      <span className="text-xs text-gray-500 font-semibold">
        About Press Copyright <br /> Contact us Creators <br /> Advertise
        Developers <br />
        <p className="mt-3">Terms Privacy Policy & Safety</p> How YouTube works{" "}
        <br /> Test new features
      </span>
      <br />
      <p className="text-xs text-gray-500 mt-3">© 2025 Learn Coding</p>
    </div>
  );
}

export default Sidebar;
