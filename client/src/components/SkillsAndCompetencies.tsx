import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';

export default function SkillsAndCompetencies({ id, skillsAndCompetencies }) {
  let skillsAndCompetenciesData = skillsAndCompetencies?.map((value) => {
    return {
      icon: <CircleIcon />,
      title: value?.name,
      descriptions: value?.description,
      image: '',
      details: value?.SAC_Descriptions,
    };
  });
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>(0);
  const [selectedFeature, setSelectedFeature] = React.useState<any>(skillsAndCompetenciesData[selectedItemIndex]);

  const handleItemClick = (values?: any) => {
    setSelectedItemIndex(values.index);
    setSelectedFeature(values);
  };
  return (
    <Container id={id} sx={{ py: { xs: 8, sm: 8 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography
              component="h2"
              variant="h4"
              sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', mb: { xs: 2, sm: 4 } })}
            >
              Skills And Competencies
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {skillsAndCompetenciesData.map(({ icon, title, descriptions, image, details }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick({ icon, title, descriptions, image, details })}
                sx={{
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : '';
                    }
                    return selectedItemIndex === index ? 'primary.light' : '';
                  },
                  background: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'none' : '';
                    }
                    return selectedItemIndex === index ? 'none' : '';
                  },
                  backgroundColor: selectedItemIndex === index ? 'primary.main' : '',
                  '& .MuiChip-label': {
                    color: selectedItemIndex === index ? '#fff' : '',
                  },
                }}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', mt: 1 })}
                variant="h5"
                fontWeight="bold"
              >
                {selectedFeature?.title ?? ''}
              </Typography>
              {selectedFeature?.details?.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CircleIcon sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 8 })} />
                  <Typography variant="subtitle2">{value?.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {skillsAndCompetenciesData.map(({ icon, title, descriptions, image, details }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick({ icon, title, descriptions, image, details })}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.light' : 'grey.200';
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '' })}
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              pointerEvents: 'none',
            }}
          >
            <CardContent>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography component="h3" variant="h6">
                  {selectedFeature?.title ?? ''}
                </Typography>
              </Box>
              <Divider
                sx={{
                  my: 2,
                  opacity: 0.2,
                  borderColor: 'grey.500',
                }}
              />
              {selectedFeature?.details?.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <CircleIcon sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 8 })} />
                  <Typography variant="subtitle2">{value?.name}</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
