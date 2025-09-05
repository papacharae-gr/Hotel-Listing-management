import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <Box minH="100dvh">
      <Navbar />
      <Outlet />
    </Box>
  );
}
