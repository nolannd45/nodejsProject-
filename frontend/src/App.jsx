import React from "react";
import {
  NavBar,
  Feed,
  ChannelDetail,
  SearchFeed,
  
} from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ManageChannel from "./pages/ManageChannel";
import VideoPage from "./pages/VideoPage";

const PageNotFound = () => (
  <h1
    style={{
      color: "#fff",
      fontSize: "25px",
      textAlign: "center",
      marginTop: "210px",
    }}
  >
    404: Page not found
  </h1>
);
const App = () => (
  <BrowserRouter>
    <Box sx={{ background: "#272727" }}>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {localStorage.getItem('token') ?
            <Route path="/manage" element={<ManageChannel/>} />
            : <Route path="*" element={<PageNotFound />} />
        }
        <Route path="/video/:id" element={<VideoPage/>} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
