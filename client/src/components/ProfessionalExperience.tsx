import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const imageData = ['url("/MDI.jpg")', 'url("/PUPLogo.png")'];

export default function ProfessionalExperience({ id, workExperience }) {
  let workExperienceData = workExperience?.map((value, index) => {
    return {
      icon: <ViewQuiltRoundedIcon />,
      companyAddress: value.companyAddress,
      title: value.companyName,
      position: value.position,
      descriptions: value.descriptions[0],
      dateEmployment: value.startDate + ' - ' + value.endDate,
      image: imageData[index],
      details: value.descriptions,
      projectDetails: value.WEProjectDescriptions,
    };
  });
  const [selectedItemIndex, setSelectedItemIndex] = React.useState<number>(0);
  const [selectedFeature, setSelectedFeature] = React.useState<any>(workExperienceData[selectedItemIndex]);

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
              Professional Experiences
            </Typography>
          </div>
          <Grid container item gap={1} sx={{ display: { xs: 'auto', sm: 'none' } }}>
            {workExperienceData.map(
              (
                { icon, title, position, dateEmployment, companyAddress, descriptions, image, details, projectDetails },
                index,
              ) => (
                <Chip
                  key={index}
                  label={title}
                  onClick={() =>
                    handleItemClick({
                      icon,
                      title,
                      companyAddress,
                      position,
                      dateEmployment,
                      descriptions,
                      image,
                      details,
                      projectDetails,
                    })
                  }
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
              ),
            )}
          </Grid>
          <Box
            component={Card}
            variant="outlined"
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundImage: selectedFeature?.image,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', mt: 1 })}
                variant="h5"
                fontWeight="bold"
              >
                {selectedFeature?.title + ' | ' + selectedFeature?.position ?? ''}
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
                  <HorizontalRuleIcon
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 20 })}
                  />
                  <Typography variant="subtitle2">{value}</Typography>
                </Box>
              ))}
              {selectedFeature?.projectDetails?.map((values, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {values?.projectName}
                  </Typography>
                  {values?.descriptions?.map((value, key) => (
                    <Box
                      key={key}
                      sx={{
                        py: 1,
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                      }}
                    >
                      <HorizontalRuleIcon
                        sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 10 })}
                      />
                      <Typography variant="subtitle2">{value}</Typography>
                    </Box>
                  ))}
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
            {workExperienceData.map(
              (
                { icon, title, position, dateEmployment, companyAddress, descriptions, image, details, projectDetails },
                index,
              ) => (
                <Card
                  key={index}
                  variant="outlined"
                  component={Button}
                  onClick={() =>
                    handleItemClick({
                      icon,
                      title,
                      companyAddress,
                      position,
                      dateEmployment,
                      descriptions,
                      image,
                      details,
                      projectDetails,
                    })
                  }
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
                    <Box
                      sx={{
                        color: (theme) => {
                          if (theme.palette.mode === 'light') {
                            return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                          }
                          return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                        },
                        width: 60,
                        height: 60,
                        backgroundSize: 'cover',
                        backgroundImage: image,
                      }}
                    />
                    <Box sx={{ textTransform: 'none' }}>
                      <Typography
                        sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '' })}
                        variant="body2"
                        fontWeight="bold"
                      >
                        {title}
                      </Typography>
                      <Typography
                        sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', my: 0.5 })}
                        variant="body2"
                      >
                        {descriptions}
                      </Typography>
                      <Link
                        color="primary"
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          '& > svg': { transition: '0.2s' },
                          '&:hover > svg': { transform: 'translateX(2px)' },
                        }}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        <span>See more</span>
                        <ChevronRightRoundedIcon fontSize="small" sx={{ mt: '1px', ml: '2px' }} />
                      </Link>
                    </Box>
                  </Box>
                </Card>
              ),
            )}
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
              alignItems: 'center',
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                mt: 1,
                width: 100,
                height: 100,
                backgroundSize: 'cover',
                backgroundImage: selectedFeature?.image,
              }}
            />
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
                  {selectedFeature?.title + ' | ' + selectedFeature?.position ?? ''}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography component="h3" variant="body2">
                  {selectedFeature?.companyAddress ?? ''}
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography component="h3" variant="body2">
                  {selectedFeature?.dateEmployment ?? ''}
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
                  <HorizontalRuleIcon
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 10 })}
                  />
                  <Typography variant="subtitle2">{value}</Typography>
                </Box>
              ))}
              {selectedFeature?.projectDetails?.map((values, index) => (
                <Box
                  key={index}
                  sx={{
                    py: 1,
                    gap: 1.5,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {values?.projectName}
                  </Typography>
                  {values?.descriptions?.map((value, key) => (
                    <Box
                      key={key}
                      sx={{
                        py: 1,
                        display: 'flex',
                        gap: 1.5,
                        alignItems: 'center',
                      }}
                    >
                      <HorizontalRuleIcon
                        sx={(theme) => ({ color: theme.palette.mode === 'light' ? '#2a2b2a' : '', width: 10 })}
                      />
                      <Typography variant="subtitle2">{value}</Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
