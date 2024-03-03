import React, { useState, useEffect } from "react";
import { Box, CardContent, CardMedia, Typography, Tooltip,Stack,
  Alert,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  InputAdornment,
  IconButton,
  DialogContentText, } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/API";
import { CheckCircle } from "@mui/icons-material";


const ChannelCard = ({ channelDetail,marginTop }) => {
  const [user, setUser] = useState("");
  const [me, setMe] = useState(JSON.parse(localStorage.getItem('user')));
  const [open, setOpen] = useState(false);
  const [popup, setPopup] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
        
    },
    onSubmit: () => {
      
      const formDataMinia = new FormData()
      const minia = document.getElementById('url_pdp').files
      Object.keys(minia).forEach(key => {
        formDataMinia.append(minia.item(key).name, minia.item(key))
      })

      const fileInputs = document.querySelectorAll('input[type="file"]');
    
      // Push the file for each input into an array:
      const files = [];
      fileInputs.forEach((fileInput) => files.push(fileInput.files[0]));

      const fd = new FormData();
      fd.append("pdp", files[0], files[0].name);
      fd.append("id", user?.userId);

      let test = {
        pdp: files[0],
        id: user?.userId
      }
    
      load(fd)
    },
  });
  
  function load(video){
    log(video)
  }

  async function log(video){
    await API.uploadPDP(video)
    navigate(0)
  }
  async function loadUser(id){
    const aa = await API.userById(id)
    setUser(aa.data)
  }
  
  useEffect(() => {
    if (channelDetail){
      loadUser(channelDetail)
    }else{
      loadUser(me.userId)
    }
  }, []);
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Box
      sx={{
      boxShadow: 'none',
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: '356px', md: '320px' },
      height: '326px',
      margin: 'auto',
      marginTop,
      }}
    >
      
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
            
          
          <CardMedia
            image={
              user.url
            }
            alt={channelDetail?.snippet?.title}
            onClick={() => { handleOpen() }}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
              
              transition: "all 0.2s ease",
             "&:hover": {
               transform: "scale3d(1.2, 1.2, 1)"
              
             }
             
            }}
          />
          {me && user.userId == me.userId ? <Modal open={open} onClose={handleClose}>
            <Dialog open={open} onClose={handleClose}>
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <DialogTitle>Change profile picture</DialogTitle>
                  <DialogContentText>You will need to log in for the change to take effect.</DialogContentText>
                  <DialogContent>
                  {popup ? <Alert severity="error">{popup}</Alert> : ""}
                  <Stack spacing={3}>
                    <input type="file" id="url_pdp" accept="image/*" />
                    </Stack>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button type="submit">Envoyer</Button>
                  </DialogActions>
                </Form>
              </FormikProvider>
            </Dialog>
          </Modal>: ""}
          <Typography variant="h6">
          {user?.pseudo}
          <CheckCircle sx={{ fontSize: 16, color: "#0AF", ml: "5px" }} />
            
          </Typography>
        </CardContent>
      {/* </Link> */}
    </Box>

  );
};

export default ChannelCard;
