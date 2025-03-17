// src/components/Header.tsx
import React from "react";
import { Typography, Box, Avatar } from "@mui/material";

interface HeaderProps {
  gymName: string;
  userName?: string;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  gymName, 
  userName = "Bienvenido", 
  userAvatar = "S" 
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6">{gymName}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>{userName}</Typography>
        <Avatar sx={{ bgcolor: '#fff', color: '#000', width: 30, height: 30 }}>{userAvatar}</Avatar>
      </Box>
    </Box>
  );
};

export default Header;