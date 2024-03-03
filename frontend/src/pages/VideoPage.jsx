import React, { ChangeEvent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { API } from "../utils/API";
import {
  Typography,
  Box,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components";
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
  const [videoPage, setVideoPage] = useState();
  const [videoUrl, setVideoUrl] = useState();
  const [videos, setVideos] = useState();
  const [commentaires, setCommentaires] = useState();
  const [chan, setChan] = useState();
  const [viewCount, setViewCount] = useState();
  const [nbOf, setNbOf] = useState();
  const [inputTextComment, setInputTextComment] = useState("");
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const { id } = useParams();
  const navigate = useNavigate();

    const addView = async () => {
        await API.addView(id);
        const numberView = await  API.getView(id);
        setViewCount(numberView.viewCount)
    };

    const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTextComment(e.target.value);
    };

   async function deleteComment(idComment){
       const comm = await API.deleteComments(idComment)
       setCommentaires(commentaires.filter(item => item.idcomments !== idComment))
       setNbOf(commentaires.length -1)
    }
    async function addComment(){
        const comm = await API.addComment(inputTextComment,id)
        setInputTextComment("")
        setCommentaires((prevCommentaires) => [...prevCommentaires, comm]);
        setNbOf(commentaires.length +1)
    }

    async function toHide(){
      await API.toHide(id,videoPage.hide)
      navigate(0);
      
    }

    async function toBlock(){
      await API.toBlock(id,videoPage.blocked)
      navigate(0);
      
    }

  async function load(){
    let test = await API.fetchAllVideo()
    for (let key in test.data){
      if (test.data[key].hide === 1){
        delete test.data[key]
      }
      else if (test.data[key].idvideo == id){
        delete test.data[key]
      }
    } 
    setVideos(test)

    const video = await API.fetchVideoById(id)
    setVideoPage(video.data)
    setViewCount(video.data.viewCount)
    setVideoUrl(video.url)

    const comm = await API.fetchComments(id)
    setCommentaires(comm.data)
    setNbOf(comm.data.length)
    
    const aa = await API.userById(video.data.userId)
    setChan(aa.data)
  }


  useEffect(() => { 
    load()
  },[])


  if (videoPage  !== undefined) {
    if (user == null){
      return (
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
      )
    }
    if (videoPage.blocked == 1 && videoPage.userId != user.userId){
      return (
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
      )
    } else {
      return (
      <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box flex={1}>
            <Box >
              <ReactPlayer
                width='100%'
                height='100%'
                url={videoUrl}
                className="react-player desktop-only1"
                controls={true}
                onEnded={() => addView()}
              />
              <Stack direction="row" >
              <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
                {videoPage.name}
              </Typography>
                {user && videoPage.userId == user.userId ? <Button
                  sx={{
                    "&:hover": { backgroundColor: "grey" },
                    color: "black",
                    backgroundColor: "white",
                    m: 2,
                    borderRadius: "12px",
                  }}
                  size="small"
                  type="submit"
                  onClick={toHide}
                >
                  {videoPage.hide == 0 ? "Hide" : "unhide"}
                </Button> : ""}
                {user && (user.role == "admin" || videoPage.userId == user.userId) ? <Button
                  sx={{
                    "&:hover": { backgroundColor: "grey" },
                    color: "black",
                    backgroundColor: "white",
                    m: 2,
                    borderRadius: "12px",
                  }}
                  size="small"
                  type="submit"
                  onClick={toBlock}
                >
                  {videoPage.blocked == 0 ? "Block" : "unblock"}
                </Button> : ""}
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                py={1}
                px={2}
                sx={{ color: "#fff" }}
              >
                <Link to={`/channel/${videoPage.userId}`}>
                  <Typography
                    variant={{ sm: "subtitle1", md: "h6" }}
                    color="#fff"
                    fontWeight="bold"
                    sx={{ opacity: "0.9" }}
                  >
                    {chan ? chan.nom : "und"}
                    <CheckCircle
                      sx={{ fontSize: "16px", color: "#0AF", ml: "5px" }}
                    />
                  </Typography>
                </Link>
                <Stack direction="row" gap="20px" alignItems="center">
                  <Typography variant="body1" sx={{ opacity: "0.7" }}>
                    {videoPage.viewCount} views
                  </Typography>
                  {/* //TODO FONCTION METIER "LIKER LA VIDEO" */}
                  <Button
                  sx={{
                    "&:hover": { backgroundColor: "grey" },
                    color: "white",
                    borderRadius: "12px",
                    marginLeft:6
                  }}
                  size="small"
                  type="submit">
                    <ThumbUpIcon/>
                    </Button>
                  
                  <Typography variant="body1" sx={{ opacity: "0.7" }}>
                    {videoPage.likeCount} likes
                  </Typography>
                </Stack>
              </Stack>
              <Box
                py={1}
                px={2}
                sx={{
                  color: "#fff",
                  m: 2,
                }}
              >
                
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {videoPage.description}
                </Typography>
              </Box>
              
            </Box>
            <Box
              py={1}
              px={2}
              sx={{
                color: "#fff",
                backgroundColor: "black",
                m: 2,
                borderRadius: "12px",
              }}
            >
              <Typography variant="body1" sx={{ opacity: "0.7" }}>
              {nbOf} comments
              </Typography>
              <Stack direction="row">
                <TextField
                  sx={{
                    m: 2,
                    input: { color: "white" },
                    borderRadius: "12px",
                    backgroundColor: " black",
                    color: "#fff",
                    width: "700px",
                  }}
                  id="commentaire"
                  placeholder="Write your comment"
                  variant="standard"
                  onChange={handleChangeComment}
                  value={inputTextComment}
                />
                  {user ? <Button
                  sx={{
                    "&:hover": { backgroundColor: "grey" },
                    color: "black",
                    backgroundColor: "white",
                    m: 2,
                    borderRadius: "12px",
                  }}
                  size="small"
                  type="submit"
                  onClick={addComment}
                >
                  Add
                  </Button> :
                      <Link to ="/login" >
                          <Button
                      sx={{
                          "&:hover": { backgroundColor: "grey" },
                          color: "black",
                          backgroundColor: "white",
                          m: 2,
                          borderRadius: "12px",
                      }}
                      size="small"
                      type="submit"
                  >
                      Login
                </Button>
                      </Link>}

                
              </Stack>
              <Stack direction="row" >
              <Typography variant="body1">
                {commentaires ? commentaires.map((commentaire,index) => (
                  <p key={index}>{`${commentaire.commentaire}`}
                  <Button
                  sx={{
                    "&:hover": { backgroundColor: "grey" },
                    color: "white",
                    borderRadius: "12px",
                    marginLeft:2
                  }}
                  size="small"
                  type="submit">
                      { (user?.userId == commentaire.userId) || (user?.role == "ADMIN")  ? <div><button onClick={() => deleteComment(commentaire.idcomments)}> <DeleteIcon /></button></div> : null}
                  </Button>
                  </p>
                  
                )): ""}
                
              </Typography>
              </Stack>
            </Box>
          </Box>
          <Box
          zIndex={99}
           marginRight={2}
            py={1}
            justifyContent="center"
            alignItems="center"
           
          >

            <Videos videoList={videos} direction="column" />
          </Box>
        </Stack>
      </Box>
    );
    }
    
  } else {
    return "";
  }
};

export default VideoPage;