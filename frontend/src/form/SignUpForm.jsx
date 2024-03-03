import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  Alert,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { API } from "../utils/API";

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

const SignupForm = ({ setAuth }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState();

  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First name required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      load(getFieldProps("channelname"),getFieldProps("firstName"),getFieldProps("lastName"),getFieldProps("email"),getFieldProps("password"))
      
    },
  });

  function load(channelname, firstName, lastName, email, password){
    log(channelname, firstName, lastName, email, password)
  }

  async function log(channelname, firstName, lastName, email, password){
    let result = await API.register(channelname, firstName, lastName, email, password)
    if (result == "Pseudo User already exist"){
      console.log("papa")
      setPopup("caca")
    }else{
      navigate("/login");
      navigate(0);
    }
  }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
      {popup ? <Alert severity="error">User already exist, please change pseudo</Alert> : ""}
        <Stack spacing={3}>
        <TextField
              fullWidth
              label="Channel name"
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
              label="First name"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
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
              label="Email address"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
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
            >
              Sign up
            </Button>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;