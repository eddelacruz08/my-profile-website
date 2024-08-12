import React from 'react';
import { PaletteMode } from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode.tsx';

const logoStyle = {
  width: '50px',
  height: 'auto',
  cursor: 'pointer',
  borderRadius: '10vw',
};

interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  pageLinks?: any;
  img?: string;
  isPublic: Boolean;
}

function AppAppBar({ mode, toggleColorMode, pageLinks, img, isPublic }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
                pl: 1,
              }}
            >
              <img src={img} style={logoStyle} alt="Logo of my Profile" />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[2]?.name ?? 'Profile Overview')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[2]?.name ?? 'Profile Overview'}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[0]?.name ?? 'Contacts')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[0]?.name ?? 'Contacts'}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[3]?.name ?? 'Professional Experience')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[3]?.name ?? 'Professional Experience'}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[4]?.name ?? 'Skills and Competencies')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[4]?.name ?? 'Skills and Competencies'}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[1]?.name ?? 'Educations')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[1]?.name ?? 'Educations'}
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection(pageLinks[5]?.name ?? 'Trainings and Certificates')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography
                    variant="body2"
                    sx={(theme) => ({ color: theme.palette.mode === 'light' ? 'black' : '' })}
                  >
                    {pageLinks[5]?.name ?? 'Trainings and Certificates'}
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {isPublic && (
                <Button
                  variant="contained"
                  size="small"
                  component="a"
                  href={process.env.REACT_APP_API_ENDPOINT + '/auth/logout'}
                  sx={{ background: 'linear-gradient(200deg, #cefdd1, #FFF)', color: 'black' }}
                >
                  Logout
                </Button>
              )}
              {/*<Button
                variant="contained"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-in/"
                target="_blank"
                sx={{ background: 'linear-gradient(200deg, #cefdd1, #FFF)', color: 'black' }}
              >
                Sign in
              </Button>
              <Button
                sx={{ background: 'linear-gradient(180deg, #021703, #cefdd1)', color: 'white' }}
                variant="contained"
                size="small"
                component="a"
                href="/material-ui/getting-started/templates/sign-up/"
                target="_blank"
              >
                Sign up
              </Button>*/}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => scrollToSection(pageLinks[2]?.name ?? 'Profile Overview')}>
                    {pageLinks[2]?.name ?? 'Profile Overview'}
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection(pageLinks[0]?.name ?? 'Contacts')}>
                    {pageLinks[0]?.name ?? 'Contacts'}
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection(pageLinks[3]?.name ?? 'Professional Experience')}>
                    {pageLinks[3]?.name ?? 'Professional Experience'}
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection(pageLinks[4]?.name ?? 'Skills and Competencies')}>
                    {pageLinks[4]?.name ?? 'Skills and Competencies'}
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection(pageLinks[1]?.name ?? 'Educations')}>
                    {pageLinks[1]?.name ?? 'Educations'}
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection(pageLinks[5]?.name ?? 'Trainings and Certificates')}>
                    {pageLinks[5]?.name ?? 'Trainings and Certificates'}
                  </MenuItem>
                  {/*<Divider />
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="contained"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-up/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign up
                    </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      color="primary"
                      variant="outlined"
                      component="a"
                      href="/material-ui/getting-started/templates/sign-in/"
                      target="_blank"
                      sx={{ width: '100%' }}
                    >
                      Sign in
                    </Button>
                  </MenuItem>*/}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
