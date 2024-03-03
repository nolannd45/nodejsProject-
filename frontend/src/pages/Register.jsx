import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";


import SignupForm from "../form/SignUpForm";
import { motion } from "framer-motion";


const RootStyle = styled("div")({
  background: "#272727",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled(Box)({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 40,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Register = ({ }) => {
  return (
    <RootStyle>
      <Container maxWidth="sm"  >
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            
            <Typography sx={{ color: "text.primary", mb: 5 }}>
              Register
            </Typography>
          </HeadingStyle>

        
          <SignupForm  />

         
          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Register;