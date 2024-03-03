import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {Sidebar, Videos} from "./";
import {useParams} from 'react-router-dom'
import { API } from "../utils/API";
const SearchFeed = () => {
  const {searchTerm}=useParams()
  const [videos, SetVideos] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetching = async () => {
    const response = await API.fetchByTitle(searchTerm);
    SetVideos(response);
  };

  useEffect(() => {
    fetching();
  }, [searchTerm]);


  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for <span style={{ color: "#F31503" }}></span> videos
      </Typography>
       <Videos videoList={videos}/>
    </Box>
  );
};
export default SearchFeed;
