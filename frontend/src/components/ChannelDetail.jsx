import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";


import { API } from "../utils/API"

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState();
  const { id } = useParams();

  useEffect(() => {
    load()
  }, []);

  async function load(){
    const video = await API.readByUserId(id)
    setVideos(video)
  }

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
      <ChannelCard channelDetail={id} marginTop="-300px" />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
      <Videos videoList={videos} />
        
      </Box>
    </Box>
    
  );
};


export default ChannelDetail;
