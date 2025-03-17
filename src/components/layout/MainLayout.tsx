import React, { ReactNode } from "react";
import { Box } from "@mui/material";
import LeftBar from "../ui/LeftBar";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#121212", color: "#fff" }}>
      <LeftBar>{children}</LeftBar>
    </Box>
  );
};

export default MainLayout;
