import React from "react";
import { Typography, Box, Avatar, useMediaQuery, useTheme } from "@mui/material";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-between', 
      alignItems: { xs: 'flex-start', sm: 'center' }, 
      mb: 0,
      gap: { xs: 0, sm: 0 }
    }}>
      <Typography 
        variant={isMobile ? "subtitle1" : "h6"} 
        sx={{
          fontSize: { xs: '1.1rem', sm: '1.25rem' },
          fontWeight: 'bold'
        }}
      >
        {gymName}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        alignSelf: { xs: 'flex-end', sm: 'auto' } 
      }}>
        <Typography 
          variant="body2" 
          sx={{ 
            mr: 1,
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {userName}
        </Typography>
        <Avatar 
          sx={{ 
            bgcolor: '#fff', 
            color: '#000', 
            width: { xs: 26, sm: 30 }, 
            height: { xs: 26, sm: 30 },
            fontSize: { xs: '0.8rem', sm: '1rem' }
          }}
        >
          {userAvatar}
        </Avatar>
      </Box>
    </Box>
  );
};

export default Header;