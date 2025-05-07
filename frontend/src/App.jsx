import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthProvider";
import Loading from "./loader/Loading";

const App = () => {

  const { loading, data} = useAuth();
  console.log("loading", loading);
  console.log("data", data);

  
  return (
    <div >
      {loading && <Loading />}
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/search/:searchQuery" element={<Search />} /> */}
        {/* <Route path="/video/:id" element={<PlayingVideo />} /> */}
      </Routes>
    </div>
  );
};

export default App;