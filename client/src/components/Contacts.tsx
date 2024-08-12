import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

export default function Contacts({ id, contacts }) {
  const { contactNumber, emailAddress, address } = contacts;
  const data = [
    {
      avatar: <PhoneAndroidIcon />,
      title: contactNumber,
      subheader: 'Mobile phone number',
    },
    {
      avatar: <EmailIcon />,
      title: (
        <Button
          variant="text"
          component="a"
          href={'https://mail.google.com/mail/?view=cm&fs=1&to=' + emailAddress + '&su=&body=&bcc='}
          target="__blank"
          sx={(theme) => ({
            color: theme.palette.mode === 'light' ? '#2a2b2a' : '',
            textTransform: 'lowercase',
          })}
        >
          {emailAddress}
        </Button>
      ),
      subheader: 'Email Address',
    },
    {
      avatar: <LocationOnIcon />,
      title: address,
      subheader: 'Address',
    },
  ];
  return (
    <Container
      id={id}
      sx={{
        py: { xs: 4, sm: 4 },
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
          sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '' })}
        >
          Contact Information
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {data.map((value, key) => {
          return (
            <Grid key={key} item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  p: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    pr: 2,
                  }}
                >
                  <CardHeader avatar={value?.avatar} title={value?.title} subheader={value?.subheader} />
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
