import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import {
    Stack,
    Alert,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    InputAdornment,
    IconButton,
    Typography
} from "@mui/material";
import { motion } from "framer-motion";
import { LoadingButton } from "@mui/lab";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { API } from "../utils/API";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';



const UpdateAccount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [popup, setPopup] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));


    let easing = [0.6, -0.05, 0.01, 0.99];
    const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
    };

  const SignupSchema = Yup.object().shape({
    
  });
  const formik = useFormik({
    initialValues: {
        channelname: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        cpassword: ""
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      if (getFieldProps("password").value === getFieldProps("cpassword").value && getFieldProps("password").value !== "" ){
        load(getFieldProps("channelname"),getFieldProps("firstName"),getFieldProps("lastName"),getFieldProps("email"),getFieldProps("password"))
      }else{
        setPopup("impossible")
      }
    },
  });
  async function load(channelname, firstName, lastName, email, password){
    
    let data = {
        nom: lastName.value || user.nom,
        prenom: firstName.value || user.prenom,
        pseudo: channelname.value || user.pseudo,
        email: email.value || user.email,
        password: password.value
    }

    let result = await API.updateUser(data)
    if (result.status == 409){
      setPopup("Pseudo already exist")
    }
    if (result.status == 201){
      localStorage.clear()
      navigate("/login");
      navigate(0);
    }
  }
  


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div>
      <ManageAccountsIcon  
        onClick={handleOpen}>
      </ManageAccountsIcon>
      <Modal open={open} onClose={handleClose}>
        <Dialog open={open} onClose={handleClose}>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <DialogTitle>Update your informations</DialogTitle>
              <DialogContent>
              {popup ? <Alert severity="error">{popup}</Alert> : ""}
              <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="New Channel name"
                    {...getFieldProps("channelname")}
                    error={Boolean(touched.channelname && errors.channelname)}
                    helperText={touched.channelname && errors.channelname}
                    />
                <Stack
                    component={motion.div}
                    initial={{ opacity: 0, y: 60 }}
                    animate={animate}
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                >
                
                    <TextField
                    fullWidth
                    label="New First name"
                    {...getFieldProps("firstName")}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    />

                    <TextField
                    fullWidth
                    label="New Last name"
                    {...getFieldProps("lastName")}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    />
                </Stack>

                <Stack
                    spacing={3}
                    component={motion.div}
                    initial={{ opacity: 0, y: 40 }}
                    animate={animate}
                >
                    <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="New Email address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    />

                    <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    label="New Password"
                    {...getFieldProps("password")}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            >
                            <VisibilityIcon
                            />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    />
                    <TextField
                    fullWidth
                    autoComplete="current-password"
                    type={showPassword ? "text" : "password"}
                    label="Confirm Password"
                    {...getFieldProps("cpassword")}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            >
                            <VisibilityIcon
                            />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    error={Boolean(touched.cpassword && errors.cpassword)}
                    helperText={touched.cpassword && errors.cpassword}
                    />
                </Stack>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={animate}
                >
                    <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    >
                    Sign up
                    </Button>
                </Box>
                </Stack>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button type="submit">Envoyer</Button>
              </DialogActions>
            </Form>
          </FormikProvider>
        </Dialog>
      </Modal>
    </div>
  );
};

export default UpdateAccount;
