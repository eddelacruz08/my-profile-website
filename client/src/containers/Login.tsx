import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const logoStyle = {
  width: '50px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '10vw',
};
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'transparent' }}>
            <img src={process.env.PUBLIC_URL + '/gmail.png'} style={logoStyle} alt="Logo of my Profile" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Button
              type="submit"
              component={'a'}
              href={process.env.REACT_APP_API_ENDPOINT + '/auth/google'}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign in using Google Account
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
