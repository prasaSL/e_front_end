import React from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";

export default function Login() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {loading,error} = user;
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        dispatch(signInStart());



        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
          });

            if (!response.ok) {
                dispatch(signInFailure());
                return;
            }

            const data = await response.json();
            dispatch(signInSuccess(data));
            navigate("/");

    }


  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 1,
            width: '100%', // Fix IE 11 issue.
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            onClick={handleLogin}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}


          >
           
          </Box>
        </Box>
      </Box>
    </Container>
  );
}