import React, { useEffect } from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from '../components/AppAppBar.tsx';
import ProfileOverview from '../components/ProfileOverview.tsx';
import TrainingsAndCertificates from '../components/TrainingsAndCertificates.tsx';
import ProfessionalExperience from '../components/ProfessionalExperience.tsx';
import Education from '../components/Education.tsx';
import Footer from '../components/Footer.tsx';

import client from '../helpers/clients.ts';
import Contacts from '../components/Contacts.tsx';
import SkillsAndCompetencies from '../components/SkillsAndCompetencies.tsx';
import Unauthorized from './Unauthorized.tsx';
import Form from './Form.tsx';
import { useNavigate, useParams } from 'react-router-dom';

export default function Profile() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const [pageLinks, setPageLinks] = React.useState<any>([]);
  const [userInfo, setUserInfo] = React.useState<any>([]);
  const [contacts, setContacts] = React.useState<any>({});
  const [workExperience, setWorkExperience] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  const navigate = useNavigate();
  const { username } = useParams<string>();

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };
  console.log(username);
  useEffect(() => {
    const fetchPageLinks = async () => {
      try {
        await client.get('/page-links/get-page-links', { withCredentials: true }).then((response) => {
          setPageLinks(response.data);
        });
      } catch (error) {
        console.log('Error', 'Fetching Failed!');
      }
    };
    const fetchUserInfo = async () => {
      try {
        await client
          .get('/users-information/get-user' + (username ? `/${username}` : ''), { withCredentials: true })
          .then((response?: any) => {
            setContacts({
              contactNumber: response.data?.phone,
              emailAddress: response.data?.emailAddress,
              address: response.data?.address,
            });
            setUserInfo(response.data);
            setWorkExperience(response.data?.work_experiences);
          });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          if (username === undefined) {
            navigate('/'); // Redirect to login if unauthorized
          }
        }
        setError(error);
      } finally {
        setLoading(false);
      }
      // Prevent back button from accessing cached page after logout
      if (username === undefined) {
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = function () {
          window.history.pushState(null, '', window.location.href);
        };
      }
    };

    fetchPageLinks();
    fetchUserInfo();
  }, [navigate, username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error?.response?.data?.hasData === false) {
    return <Form>Fill-up this form</Form>;
  }

  //if (error?.response?.status === 401) {
  //  return <Unauthorized>{error?.message}</Unauthorized>;
  //}

  if (error?.message) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar
        mode={mode}
        toggleColorMode={toggleColorMode}
        pageLinks={pageLinks}
        img={userInfo?.users?.thumbnail}
        isPublic={username === undefined ? true : false}
      />
      <ProfileOverview id={pageLinks[2]?.name ?? 'Profile Overview'} userInfo={userInfo} />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Contacts id={pageLinks[0]?.name ?? 'Contacts'} contacts={contacts} />
        <ProfessionalExperience
          id={pageLinks[3]?.name ?? 'Professional Experience'}
          workExperience={workExperience ?? []}
        />
        <Divider />
        <SkillsAndCompetencies
          id={pageLinks[4]?.name ?? 'Skills and Competencies'}
          skillsAndCompetencies={userInfo?.skills_and_competencies?.SAC_Categories}
        />
        <Divider />
        <Education id={pageLinks[1]?.name ?? 'Educations'} values={userInfo?.educations} />
        <Divider />
        <TrainingsAndCertificates
          id={pageLinks[5]?.name ?? 'Trainings and Certificates'}
          values={userInfo?.trainings_and_certifications}
        />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
