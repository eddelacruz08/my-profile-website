import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const logoStyle = {
  width: '70px',
  backgroundImage: 'cover',
};

export default function Education({ id, values }) {
  return (
    <Container
      id={id}
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
        <Typography component="h2" variant="h4" color="#2a2b2a">
          Educations
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {values.map((value, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
                p: 1,
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {value?.course}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  pr: 2,
                }}
              >
                <CardHeader
                  avatar={<Avatar alt={value?.school} src="/" />}
                  title={value?.school}
                  subheader={value?.school_year}
                />
                <img src={'/PUPLogo.png'} alt={`Logo ${index + 1}`} style={logoStyle} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
