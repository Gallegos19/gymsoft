import React, { useState, useEffect } from "react";
import { 
  Box, 
  Divider, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
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
import MenuIcon from "@mui/icons-material/Menu";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useLocation } from "react-router-dom";
import img from "../../assets/GSOFT.avif";
import StorageService from "../../core/services/StorageService";

interface LeftBarProps {
  children: React.ReactNode;
}

const LeftBar: React.FC<LeftBarProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [expanded, setExpanded] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Actualizar el estado expandido basado en el tamaño de la pantalla
    if (isMobile) {
      setExpanded(false);
    } else if (isTablet) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, [isMobile, isTablet]);

  const toggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setExpanded(!expanded);
    }
  };

  const handleLogout = () => {
    StorageService.clear();
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
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
      "&:hover": { backgroundColor: "#212328" },
      borderRadius: '4px',
      mx: 0.5
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

  const drawerContent = (
    <>
      {/* Header */}
      <Box sx={{ 
        height: "64px", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: 2
      }}>
        {expanded && <Box sx={{ width: '100%' }}><img src={img} alt="Logo" style={{ width: '100%', height: 'auto' }}/></Box>}
        <IconButton onClick={toggleDrawer} sx={{ color: "#fff", display: isMobile ? 'none' : 'flex' }}>
          {expanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <Divider sx={{ backgroundColor: "#333" }} />

      {/* Navigation Items */}
      <List sx={{ padding: '8px', flex: 1, overflow: "auto" }}>
        <ListItemButton 
          onClick={() => handleNavigation("/home")}
          sx={getListItemStyle("/home")}
        >
          <ListItemIcon sx={getIconStyle("/home")}>
            <HomeIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Inicio" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/members")}
          sx={getListItemStyle("/members")}
        >
          <ListItemIcon sx={getIconStyle("/members")}>
            <PeopleIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Membresía" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/mymembers")}
          sx={getListItemStyle("/mymembers")}
        >
          <ListItemIcon sx={getIconStyle("/mymembers")}>
            <CardMembershipIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Mis Planes" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/assistance")}
          sx={getListItemStyle("/assistance")}
        >
          <ListItemIcon sx={getIconStyle("/assistance")}>
            <AssignmentIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Asistencia" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/add")}
          sx={getListItemStyle("/add")}
        >
          <ListItemIcon sx={getIconStyle("/add")}>
            <AddCircleIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Agregar" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/routines")}
          sx={getListItemStyle("/routines")}
        >
          <ListItemIcon sx={getIconStyle("/routines")}>
            <BarChartIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Rutinas" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/stadistics")}
          sx={getListItemStyle("/stadistics")}
        >
          <ListItemIcon sx={getIconStyle("/stadistics")}>
            <EqualizerIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Estadísticas" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation("/qr")}
          sx={getListItemStyle("/qr")}
        >
          <ListItemIcon sx={getIconStyle("/qr")}>
            <QrCodeIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="QR" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
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
            "&:hover": { backgroundColor: "#212328" },
            borderRadius: '4px',
            mx: 0.5,
            mb: 1
          }}
        >
          <ListItemIcon sx={{ color: "#ccc", minWidth: expanded ? 40 : 24, ml: expanded ? 1 : "auto", mr: expanded ? 1 : "auto" }}>
            <LogoutIcon />
          </ListItemIcon>
          {(expanded || isMobile) && <ListItemText primary="Cerrar sesión" sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }} />}
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile version - temporary drawer */}
      {isMobile && (
        <>
          <Box 
            sx={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '64px',
              backgroundColor: '#2A2C33',
              zIndex: 1100,
              display: 'flex',
              alignItems: 'center',
              padding: 2,
              borderBottom: '1px solid #333'
            }}
          >
            <IconButton 
              color="inherit" 
              aria-label="open drawer" 
              edge="start" 
              onClick={toggleDrawer}
              sx={{ color: '#fff', mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <img src={img} alt="Logo" style={{ height: '40px' }}/>
          </Box>
          
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: 240,
                backgroundColor: "#2A2C33",
                color: "#fff",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Desktop and tablet version - permanent drawer */}
      {!isMobile && (
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
          {drawerContent}
        </Box>
      )}

      {/* Main Content */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          ml: isMobile ? 0 : (expanded ? "220px" : "70px"), 
          mt: isMobile ? "64px" : 0,
          transition: "margin-left 0.3s", 
          padding: { xs: 2, sm: 2, md: 3 } 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LeftBar;