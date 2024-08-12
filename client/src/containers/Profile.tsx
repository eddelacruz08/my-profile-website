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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use Promise.all to fetch both API data concurrently
        const [response1, response2] = await Promise.all([
          client.get('/page-links/get-page-links', { withCredentials: true }),
          client.get('/users-information/get-user' + (username ? `/${username}` : ''), { withCredentials: true }),
        ]);

        setPageLinks(response1.data);
        setContacts({
          contactNumber: response2.data?.phone,
          emailAddress: response2.data?.emailAddress,
          address: response2.data?.address,
        });
        setUserInfo(response2.data);
        setWorkExperience(response2.data?.work_experiences);
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
    // Call the function to fetch data
    fetchData();
  }, [navigate, username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error?.response?.data?.hasData === false) {
    return <Form>Fill-up this form</Form>;
  }

  if (error?.response?.status === 401) {
    return <Unauthorized>{error?.message}</Unauthorized>;
  }

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
