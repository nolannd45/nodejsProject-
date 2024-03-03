import { Box, Stack } from "@mui/system";
import { ChannelCard, ChannelDetail, Videos } from "../components";
import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

import { API } from "../utils/API";
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
//Affichage des vidéos de la chaine

const ManageChannel = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  async function load(){
    setUser(JSON.parse(localStorage.getItem('user')))
    let test = await API.readByUserId(user.userId)

    setVideos(test)

  }


  useEffect(() => {
    load()
  }, []);
  return (
    <Box minHeight="95vh">
      <div>
      
    </div>
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            p={2}
            sx={{
              position: "sticky",

              top: 0,
              justifyContent: "space-between",
            }}
          >
            
          </Stack>
        </div>
        <ChannelCard channelDetail={channelDetail} marginTop="-300px" />

          

        

      </Box>
      <Box p={2}>
        <Box sx={{ mr: { sm: "100px" } }} />
        {videos ? <Videos videoList={videos} /> : ""}
        
        
      </Box>
    </Box>
  );
};
export default ManageChannel;
