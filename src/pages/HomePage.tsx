import React, { useState, useEffect } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  IconButton,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import Header from "../components/ui/Header";
import img from 'assets/young-fitness-man-studio.avif'

// Define the data interface
interface DataItem {
  name: string;
  value: number;
}

// Sample data for the chart
const data: DataItem[] = [
  { name: 'Lun', value: 50 },
  { name: 'Mar', value: 65 },
  { name: 'Mie', value: 80 },
  { name: 'Jue', value: 60 },
  { name: 'Vie', value: 95 },
  { name: 'Sab', value: 40 },
  { name: 'Dom', value: 30 },
];

// Bar colors
const BAR_COLOR = '#6b7280';
const HIGHLIGHT_COLOR = '#ff7b00';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '90%',
  borderRadius: 8,
  backgroundImage: `url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  
  // Optional: Add an overlay to make text more readable
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(26, 30, 42, 0.7)', // Semi-transparent dark overlay
    borderRadius: 8,
    zIndex: 1,
  },
  
  // Make sure content is above the overlay
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#1a1e2a',
  borderRadius: 8,
  color: '#fff',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

const ResponsiveTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-around',
    },
  },
  '& .MuiTab-root': {
    [theme.breakpoints.down('sm')]: {
      padding: '6px 8px',
      minWidth: 'auto',
      fontSize: '0.8rem',
    },
  },
}));

// Using template literal syntax for ScrollHiddenList
const ScrollHiddenList = styled(List)`
  max-height: ${({ theme }) => theme.breakpoints.down('sm') ? '150px' : '200px'};
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.4em;
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const HomePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Membresías vendidas - datos de ejemplo
  const [memberships, setMemberships] = useState([
    { id: 1, name: "Juan Perez" },
    { id: 2, name: "Maria Lopez" },
    { id: 3, name: "Carlos Rodriguez" },
    { id: 4, name: "Ana Martinez" }
  ]);
  
  // Ajustar el número de membresías mostradas según el tamaño de pantalla
  const [visibleMemberships, setVisibleMemberships] = useState(memberships.slice(0, 2));
  
  useEffect(() => {
    // En pantallas muy pequeñas mostramos solo 2, en tablet 3, en desktop todas
    if (isMobile) {
      setVisibleMemberships(memberships.slice(0, 2));
    } else if (isTablet) {
      setVisibleMemberships(memberships.slice(0, 3));
    } else {
      setVisibleMemberships(memberships);
    }
  }, [isMobile, isTablet, memberships]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '85vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: { xs: 1, sm: 2 } // Padding responsivo
    }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}> 
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Statistics Section (en móvil va primero) */}
        {isMobile && (
          <Grid item xs={12}>
            <StatBox sx={{ mb: 1 }}>
              <Typography variant="body2" color="#ff7b00">
                Ingreso Mensual
              </Typography>
              <Typography variant={isMobile ? "h5" : "h4"} sx={{ mt: 0.5 }}>
                $1000 <Typography component="span" variant="body2" color="#6b7280">MXN</Typography>
              </Typography>
            </StatBox>
          </Grid>
        )}

        {/* Left section - Analytics */}
        <Grid item xs={12} md={8}>
          <DarkPaper>
            <Box sx={{ mb: { xs: 1, sm: 2 }, borderBottom: 1, borderColor: 'divider' }}>
              <ResponsiveTabs 
                value={tabValue} 
                onChange={handleTabChange} 
                textColor="inherit"
                indicatorColor="primary"
                variant={isMobile ? "fullWidth" : "standard"}
              >
                <Tab label="Mes" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Quincena" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Día" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} />
              </ResponsiveTabs>
            </Box>
            
            <Box sx={{ height: { xs: 200, sm: 250, md: 300 } }}> {/* Altura responsiva */}
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ 
                    top: 5, 
                    right: isMobile ? 10 : 30, 
                    left: isMobile ? 10 : 20, 
                    bottom: 5 
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2e3a" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="value" 
                    fill={BAR_COLOR}
                    radius={[5, 5, 0, 0]} 
                    barSize={isMobile ? 15 : 30}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === 'Vie' ? HIGHLIGHT_COLOR : BAR_COLOR} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </DarkPaper>
        </Grid>

        {/* Right section - Stats */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={{ xs: 1, sm: 2 }} direction="column">
            {/* Monthly Income - Solo visible en tablet y desktop */}
            {!isMobile && (
              <Grid item>
                <StatBox>
                  <Typography variant="body2" color="#ff7b00">
                    Ingreso Mensual
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 1 }}>
                    $1000 <Typography component="span" variant="body2" color="#6b7280">MXN</Typography>
                  </Typography>
                </StatBox>
              </Grid>
            )}

            {/* Sold Memberships */}
            <Grid item>
              <StatBox>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" color="#ff7b00">
                    Membresias Vendidas
                  </Typography>
                  {isMobile && (
                    <Typography variant="caption" color="#6b7280">
                      Mostrando {visibleMemberships.length} de {memberships.length}
                    </Typography>
                  )}
                </Box>
                
                {/* Using ScrollHiddenList with the new syntax */}
                <ScrollHiddenList disablePadding>
                  {visibleMemberships.map((item) => (
                    <ListItem 
                      key={item.id}
                      disablePadding
                      secondaryAction={
                        <IconButton edge="end" sx={{ color: '#6b7280' }} size={isMobile ? "small" : "medium"}>
                          <RefreshIcon fontSize={isMobile ? "small" : "medium"} />
                        </IconButton>
                      }
                      sx={{ py: { xs: 0.5, sm: 1 } }}
                    >
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: '#1a1e2a', 
                            border: '1px solid #2a2e3a',
                            width: isMobile ? 28 : 40,
                            height: isMobile ? 28 : 40
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={item.name} 
                        primaryTypographyProps={{ 
                          fontSize: isMobile ? 12 : 14,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      />
                    </ListItem>
                  ))}
                </ScrollHiddenList>
              </StatBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;