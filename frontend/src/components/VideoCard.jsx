import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {Box,Typography, Card, CardContent, CardMedia, Stack} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { API } from "../utils/API";
import { useNavigate } from "react-router-dom";


const VideoCard = ({video}) =>{
  const [chan, setChan] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  console.log(video.picture_list[0])
  
  

  async function load(id){
    const aa = await API.userById(id)
    setChan(aa.data)
  }

  async function refresh(){
    navigate(video.idvideo ? `/hotel/${video.idvideo}` : `/hotel/introuvable`)
    navigate(0)
  }

  useEffect(() => { 
    load(video.userId)

    let diff = new Date(video.dateCreation) - new Date().getTime()
    let totalDays = Math.ceil(diff / (1000 * 3600 * 24));
    setDate(totalDays)
  },[])

    return(
  <Card
    sx={{
      width: { xs: "100%", sm: "358px", md: "320px" },
      boxShadow: "none",
      borderRadius: 0,
      backgroundColor:"transparent",
      
    }}
  >
    <Link to={video._id ? `/hotel/${video._id}` : `../imagehotel/introuvable`} onClick={() => refresh()}>
      <CardMedia
        image={require(`/src/imageHotel/${video.picture_list[0]}.jpg`)}
        alt={"test"}
        sx={{borderRadius: 2, height: 180 }}
      />
     </Link> 
    <CardContent sx={{ height: "60px" }}>


        <Typography sx={{ml:1}} fontWeight="bold" variant="subvideo.name2" color="white">
              {video?.name}
        </Typography>
        
    </CardContent>
  </Card>
);
};

export default VideoCard;
