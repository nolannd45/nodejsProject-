import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "./";
import { API } from "../utils/API";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [videos,setVideos] = useState()

  async function load(){
    let test = await API.fetchAllHotel()
    console.log(test)
    setVideos(test)
  }

  useEffect(() => {
    load()
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onClick={load}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
         Copyright © 2023 Apagnan IT
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>Videos</span>
        </Typography>
        <Videos videoList={videos} />
      </Box>
    </Stack>
  );
};
export default Feed;
