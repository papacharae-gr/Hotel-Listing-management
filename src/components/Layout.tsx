import { Outlet } from "react-router-dom";
import Box from '@mui/material/Box';
import { Navbar } from ".";

export default function Layout() {
  return (
  <Box sx={{ minHeight: '100dvh' }}>
      <Navbar />
      <Outlet />
    </Box>
  );
}
