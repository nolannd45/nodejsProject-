import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate, redirect } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { API } from "../utils/API";
import Cookies from "universal-cookie"

import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from "framer-motion";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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

const LoginForm = ({ setAuth }) => {
  const [popup, setPopup] = useState();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      pseudo: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      load(getFieldProps("Pseudo").value, getFieldProps("password").value)
    },
  });

  function load(pseudo, password){
    log(pseudo, password)
    
  }


  async function log(pseudo, password){
    let result = await API.login(pseudo, password)

    if(result.code == "404"){
      setPopup(result.message)
    }else{
      localStorage.setItem('token', result['token'])
      localStorage.setItem('user',JSON.stringify(result['user']))
      if (localStorage.getItem('user')){
        navigate("/");
        navigate(0);
      
      }
    }
    
    
  }




  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

        <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
          {popup ? <Alert severity="error">{popup}</Alert> : ""}

            <TextField
              fullWidth
              autoComplete="username"
              type="text"
              label="pseudo"
              {...getFieldProps("Pseudo")}
              error={Boolean(touched.pseudo && errors.pseudo)}
              helperText={touched.pseudo && errors.pseudo}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon/>
                      ) : (
                        <VisibilityIcon/>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    {...getFieldProps("remember")}
                    checked={values.remember}
                  />
                }
                label="Remember me"
              />

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="#"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Login
            </LoadingButton>
          </Box>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default LoginForm;