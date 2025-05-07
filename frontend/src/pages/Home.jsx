import React from "react";
import Sidebar from "../components/Sidebar";
import ListItems from "../components/ListItems";
import Video from "../components/Video";
import { useAuth } from "../context/AuthProvider.jsx";

const Home = () => {
  const { data, loading } = useAuth();
    console.log(data);
  return (
  //  bg-gray-900 text-white
    <div className="flex mt-14 bg-gray-900 text-white">
      <Sidebar />
      <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden">
        <ListItems />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
          {!loading &&
            data.map((item) => {
              if (item.type !== "video") return false;
              return <Video key={item.id} video={item?.video} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Home;
