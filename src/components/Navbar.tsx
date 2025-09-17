import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();
    const Links = [
      { label: "Home", to: "/home" },
      { label: "Create Hotel", to: "/listings/create" },
    ];
    const handleToggleMenu = () => setIsOpen((prev) => !prev);
    const handleToggleColorMode = () => setDarkMode((prev) => !prev);
    const isActive = (to: string) => location.pathname === to;
    return (
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1000, background: darkMode ? 'linear-gradient(to right, #212121, #424242)' : 'linear-gradient(to right, #1976d2, #fff)' }}>
        <Box sx={{ borderBottom: '1px solid #e0e0e0', background: darkMode ? 'rgba(33,33,33,0.85)' : 'rgba(255,255,255,0.85)', backdropFilter: 'saturate(180%) blur(10px)', boxShadow: 1, transition: 'background 0.2s ease' }}>
          <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 56 }}>
              {/* Left: Brand + mobile menu */}
              <Stack direction="row" spacing={2} alignItems="center">
                <IconButton size="small" color="inherit" aria-label={isOpen ? 'Close menu' : 'Open menu'} onClick={handleToggleMenu} sx={{ display: { xs: 'inline-flex', md: 'none' }, borderRadius: '50%' }}>
                  {isOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
                <Button component={Link} to="/home" color="inherit" sx={{ textTransform: 'none', fontWeight: 'bold', letterSpacing: '0.2px' }}>
                  <Typography variant="h6">Hotel Workspace</Typography>
                </Button>
              </Stack>

              {/* Desktop Links */}
              <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
                {Links.map((l) => (
                  <Button
                    key={l.label}
                    component={Link}
                    to={l.to}
                    size="small"
                    variant={isActive(l.to) ? 'contained' : 'text'}
                    color={isActive(l.to) ? 'primary' : 'inherit'}
                    sx={{ borderRadius: 2 }}
                  >
                    {l.label}
                  </Button>
                ))}
                <IconButton aria-label="Toggle color mode" onClick={handleToggleColorMode} color="inherit" size="small" sx={{ borderRadius: '50%' }}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Stack>

              {/* Mobile right-side: color mode */}
              <Stack direction="row" spacing={2} sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton aria-label="Toggle color mode" onClick={handleToggleColorMode} color="inherit" size="small" sx={{ borderRadius: '50%' }}>
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Stack>
            </Stack>

            {/* Mobile menu */}
            <Collapse in={isOpen}>
              <Box sx={{ pb: 2, display: { md: 'none' } }}>
                <Stack spacing={1}>
                  {Links.map((l) => (
                    <Button
                      key={l.label}
                      component={Link}
                      to={l.to}
                      size="small"
                      variant={isActive(l.to) ? 'contained' : 'text'}
                      color={isActive(l.to) ? 'primary' : 'inherit'}
                      sx={{ borderRadius: 2, justifyContent: 'flex-start' }}
                      onClick={handleToggleMenu}
                    >
                      {l.label}
                    </Button>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Container>
        </Box>
      </Box>
    );
}
