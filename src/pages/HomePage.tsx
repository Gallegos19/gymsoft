// src/pages/HomePage.tsx
import React from "react";
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
  Tab
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import Header from "../components/ui/Header";

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
  height: '100%',
  borderRadius: 8,
}));

const StatBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#1a1e2a',
  borderRadius: 8,
  color: '#fff',
  height: '100%',
}));

const HomePage: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: 2 
    }}>
      <Grid container spacing={2}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Left section - Analytics */}
        <Grid item xs={12} md={8}>
          <DarkPaper>
            <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                textColor="inherit"
                indicatorColor="primary"
              >
                <Tab label="Mes" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Quincena" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Día" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} />
              </Tabs>
            </Box>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2a2e3a" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar 
                    dataKey="value" 
                    fill={BAR_COLOR}
                    radius={[5, 5, 0, 0]} 
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
          <Grid container spacing={2} direction="column">
            {/* Monthly Income */}
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

            {/* Sold Memberships */}
            <Grid item>
              <StatBox>
                <Typography variant="body2" color="#ff7b00">
                  Membresias Vendidas
                </Typography>
                <List disablePadding>
                  {[1, 4].map((item) => (
                    <ListItem 
                      key={item}
                      disablePadding
                      secondaryAction={
                        <IconButton edge="end" sx={{ color: '#6b7280' }}>
                          <RefreshIcon />
                        </IconButton>
                      }
                      sx={{ py: 1 }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: '#1a1e2a', border: '1px solid #2a2e3a' }}>
                          
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Juan Perez" 
                        primaryTypographyProps={{ fontSize: 14 }}
                      />
                    </ListItem>
                  ))}
                </List>
              </StatBox>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;