// src/components/layouts/MainLayout.tsx
import React, { ReactNode } from "react";
import { Box, Container } from "@mui/material";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div>
        <nav>Barra de navegación</nav>
        <main>{children}</main>
      </div>
    );
  };
  

export default MainLayout;
