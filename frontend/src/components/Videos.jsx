import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { VideoCard, ChannelCard } from "./";

const Videos = ({ videoList, direction}) => {
  console.log(videoList)
  return (
    <Stack
      direction={direction || 'row'}
      flexWrap="wrap"
      justifyContent="start"
      alignItems="start"
      // paddingLeft='50px'
      gap={2.2}
      sx={{pl:{sm:'50px'}}}
    >
      {videoList ? videoList.map((video, idx) =>  (
        
        <Box  key={idx} sx={{ ml: { sm: "6px"},mt:{sm:"13px"}  }}>
          {<VideoCard video={video} />}
        </Box>
      )): <span>Loading...</span>}
    </Stack>
    
  );
};

export default Videos;
