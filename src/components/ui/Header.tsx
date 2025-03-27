import React, { useEffect, useState } from "react";
import { Typography, Box, Avatar, useMediaQuery, useTheme } from "@mui/material";
import { GetGym } from "../../api/clients/GetGym";
import { StorageService } from "../../core/services/StorageService";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({
  userName = "Bienvenido",
  userAvatar = "G"
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [gymName, setGymName] = useState<string>("");

  useEffect(() => {
    const fetchGym = async () => {
      const storage = StorageService.getInstance();
      const storedName = storage.getItem("app_name_gimnasio");

      if (storedName) {
        setGymName(storedName);
        return;
      }

      const token = storage.getItem("auth_token");
      const id_gimnasio_raw = storage.getItem("id_gimnasios");
      const id_gimnasio = Number(id_gimnasio_raw);

      if (token && !isNaN(id_gimnasio)) {
        const gymData = await GetGym.getInstance().getGymById(id_gimnasio, token);
        if (gymData) {
          storage.setItem("app_name_gimnasio", gymData.data.name);
          setGymName(gymData.data.name);
        } else {
          console.log("No se pudo obtener el gimnasio");
        }
      } else {
        console.warn("Token o ID de gimnasio inválido");
      }
    };

    fetchGym();
  }, []);

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
        {gymName || "Cargando gimnasio..."}
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
