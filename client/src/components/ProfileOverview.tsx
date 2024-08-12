import * as React from 'react';
import { alpha, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ProfileOverview({ id, userInfo }) {
  return (
    <Box
      id={id}
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #cefdd1, #FFF)'
            : `linear-gradient(#004f05, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 8 },
          pb: { xs: 8, sm: 5 },
        }}
      >
        <Box
          id="image"
          sx={(theme) => ({
            mt: { xs: 3, sm: 5 },
            mb: { xs: 3, sm: 3 },
            alignSelf: 'center',
            height: { xs: 150, sm: 400 },
            width: '30%',
            backgroundImage: theme.palette.mode === 'light' ? 'url("/CircleImage.png")' : 'url("/CircleImage.png")',
            backgroundSize: 'cover',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: theme.palette.mode === 'light' ? alpha('#bfd9bf', 0.5) : alpha('#9cfcae', 0.1),
            boxShadow:
              theme.palette.mode === 'light'
                ? `0 0 12px 8px ${alpha('#9cfca7', 0.2)}`
                : `0 0 24px 12px ${alpha('#036319', 0.2)}`,
          })}
        />
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' }, mb: { xs: 3, sm: 3 } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(2rem, 7vw, 3rem)',
              opacity: 0.8,
              fontWeight: 'bold',
              fontFamily: 'sans-serif roboto',
            }}
          >
            {userInfo?.fullName}
          </Typography>
          <Divider />
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: '20px',
              opacity: 0.8,
              fontWeight: 'bold',
              fontFamily: 'sans-serif roboto',
            }}
          >
            {userInfo?.position}
          </Typography>
          <Typography
            textAlign="center"
            sx={{
              alignSelf: 'center',
              width: { sm: '100%', md: '80%' },
              fontSize: '20px',
              opacity: 0.7,
            }}
          >
            {userInfo?.bio}
          </Typography>
        </Stack>
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{
              fontSize: 'clamp(1rem, .5vw, 4rem)',
            }}
          >
            You can download my latest resume/CV here:&nbsp;
            <Button
              variant="contained"
              size="large"
              component="a"
              href="#"
              target="_blank"
              sx={{ background: 'linear-gradient(180deg, #cefdd1, #FFF)', color: 'black' }}
            >
              Download CV
            </Button>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
