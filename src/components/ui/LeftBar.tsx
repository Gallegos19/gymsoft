import React, { useState } from "react";
import { Box, Divider, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BarChartIcon from "@mui/icons-material/SportsGymnastics";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import QrCodeIcon from "@mui/icons-material/QrCode";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useLocation } from "react-router-dom";

interface LeftBarProps {
  children: React.ReactNode;
}

const LeftBar: React.FC<LeftBarProps> = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setExpanded(!expanded);
  };

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo: limpiar localStorage, estado global, etc.
    console.log("Cerrando sesión...");
    // Después de cerrar sesión, redirigir al login (si tienes una página de login)
    // navigate("/login");
  };

  // Verificar si la ruta actual coincide con el path para aplicar estilo activo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Estilo común para todos los ListItemButton
  const getListItemStyle = (path: string) => {
    return { 
      py: 1.5, 
      display: "flex", 
      justifyContent: expanded ? "flex-start" : "center",
      backgroundColor: isActive(path) ? "#212328" : "transparent",
      "&:hover": { backgroundColor: "#212328" }
    };
  };

  // Estilo para los iconos
  const getIconStyle = (path: string) => {
    return { 
      color: isActive(path) ? "#FF9800" : "#ccc", 
      minWidth: expanded ? 40 : 24, 
      ml: expanded ? 1 : "auto", 
      mr: expanded ? 1 : "auto" 
    };
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: expanded ? 220 : 70,
          flexShrink: 0,
          backgroundColor: "#2A2C33",
          color: "#fff",
          transition: "width 0.3s",
          height: "100vh",
          position: "fixed",
          overflowX: "hidden",
          borderRight: "1px solid #333",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box sx={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}>
          {expanded && <h3>GymSoft</h3>}
          <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
            {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider sx={{ backgroundColor: "#333" }} />

        {/* Navigation Items */}
        <List sx={{ padding: 0, flex: 1, overflow: "auto" }}>
          <ListItemButton 
            onClick={() => navigate("/")}
            sx={getListItemStyle("/")}
          >
            <ListItemIcon sx={getIconStyle("/")}>
              <HomeIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Inicio" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/members")}
            sx={getListItemStyle("/members")}
          >
            <ListItemIcon sx={getIconStyle("/members")}>
              <PeopleIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Membresía" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/mymembers")}
            sx={getListItemStyle("/mymembers")}
          >
            <ListItemIcon sx={getIconStyle("/mymembers")}>
              <GroupIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Mis Miembros" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/assistance")}
            sx={getListItemStyle("/assistance")}
          >
            <ListItemIcon sx={getIconStyle("/assistance")}>
              <AssignmentIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Asistencia" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/add")}
            sx={getListItemStyle("/add")}
          >
            <ListItemIcon sx={getIconStyle("/add")}>
              <AddCircleIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Agregar" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/routines")}
            sx={getListItemStyle("/routines")}
          >
            <ListItemIcon sx={getIconStyle("/routines")}>
              <BarChartIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Rutinas" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/stadistics")}
            sx={getListItemStyle("/stadistics")}
          >
            <ListItemIcon sx={getIconStyle("/stadistics")}>
              <EqualizerIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Estadísticas" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>

          <ListItemButton 
            onClick={() => navigate("/qr")}
            sx={getListItemStyle("/qr")}
          >
            <ListItemIcon sx={getIconStyle("/qr")}>
              <QrCodeIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="QR" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>
        </List>

        {/* Logout Button - Now positioned at the bottom */}
        <Box sx={{ marginTop: "auto", borderTop: "1px solid #333" }}>
          <ListItemButton 
            onClick={handleLogout}
            sx={{ 
              py: 1.5, 
              display: "flex", 
              justifyContent: expanded ? "flex-start" : "center",
              "&:hover": { backgroundColor: "#212328" }
            }}
          >
            <ListItemIcon sx={{ color: "#ccc", minWidth: expanded ? 40 : 24, ml: expanded ? 1 : "auto", mr: expanded ? 1 : "auto" }}>
              <LogoutIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Cerrar sesión" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
          </ListItemButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: expanded ? "220px" : "70px", transition: "margin-left 0.3s", padding: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default LeftBar;