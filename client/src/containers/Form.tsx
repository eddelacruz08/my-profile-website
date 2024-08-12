import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

export default function Form({ children }) {
  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', pb: 5 })}
        >
          {children}
        </Typography>
        <Divider />
        <Button variant="contained" component="a" href={'/'} sx={{ mt: 5 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}
