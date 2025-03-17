import React from "react";
import { 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Tabs,
  Tab
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from '@mui/material/styles';
import Header from "../components/ui/Header";

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
}));

const StatCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  borderRadius: 8,
  height: '100%',
}));

const Stadistics: React.FC = () => {
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

        {/* Title and Download button */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#ff7b00" }}>
              Estadísticas
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              sx={{ 
                bgcolor: "#ff7b00", 
                color: "white", 
                borderRadius: 2,
                "&:hover": { bgcolor: "#e67000" }
              }}
            >
              Descargar informe
            </Button>
          </Box>
        </Grid>

        {/* Main content section - Charts */}
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
                <Tab label="Trimestre" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Anual" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} />
              </Tabs>
            </Box>
            
            {/* First Chart - Ingresos Membresías */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#ff7b00' }}>
                Estadística ingresos Membresías
              </Typography>
              <Box sx={{ 
                height: 250, 
                position: "relative",
                borderBottom: "1px solid #2a2e3a",
                my: 2,
                mx: 4
              }}>
                {/* Price y-axis */}
                <Box sx={{ position: "absolute", left: -30, top: 0, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>$1000</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>$800</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>$600</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>$400</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280" }}>$200</Typography>
                </Box>
                
                {/* Data points */}
                {[0.5, 0.7, 0.6, 0.8, 0.75, 0.9, 0.65, 0.85, 0.7].map((height, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      width: 10, 
                      height: 10, 
                      borderRadius: "50%", 
                      bgcolor: "#ff7b00",
                      position: "absolute",
                      left: `${10 + index * 10}%`,
                      bottom: `${height * 100}%`
                    }}
                  />
                ))}

                {/* Connecting lines */}
                <svg 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    zIndex: 0 
                  }}
                >
                  <polyline 
                    points="10%,50% 20%,30% 30%,40% 40%,20% 50%,25% 60%,10% 70%,35% 80%,15% 90%,30%" 
                    fill="none" 
                    stroke="#ff7b00" 
                    strokeWidth="2" 
                  />
                </svg>

                {/* X-axis labels */}
                <Box sx={{ 
                  position: "absolute", 
                  bottom: -25, 
                  left: 0, 
                  width: "100%", 
                  display: "flex", 
                  justifyContent: "space-between" 
                }}>
                  {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep"].map((month, index) => (
                    <Typography key={index} variant="caption" sx={{ color: "#6b7280" }}>
                      {month}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Second Chart - Asistencia Clientes */}
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#ff7b00' }}>
                Estadística Asistencia Clientes
              </Typography>
              <Box sx={{ 
                display: "flex", 
                alignItems: "flex-end", 
                justifyContent: "space-around", 
                height: 200,
                mx: 4,
                mb: 1
              }}>
                {["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"].map((day, index) => (
                  <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        width: 30, 
                        height: `${[0.75, 0.4, 0.25, 0.7, 0.6, 0.9, 0.35][index] * 100}%`, 
                        bgcolor: index === 5 ? "#ff7b00" : "#6b7280",
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "#6b7280", mt: 1 }}>
                      {day}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </DarkPaper>
        </Grid>

        {/* Right section - Stats summaries */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction="column">
            {/* Total clients card */}
            <Grid item>
              <StatCard>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2, color: "#ff7b00" }}>
                    Total de clientes
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: "#4caf50", borderRadius: "50%", mr: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="caption" sx={{ color: "white" }}>✓</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>100</Typography>
                    <Typography variant="body2" sx={{ ml: 1, color: "#6b7280" }}>clientes activos</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: 16, height: 16, bgcolor: "#f44336", borderRadius: "50%", mr: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography variant="caption" sx={{ color: "white" }}>✕</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>10</Typography>
                    <Typography variant="body2" sx={{ ml: 1, color: "#6b7280" }}>clientes inactivos</Typography>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>

            {/* Charts Grid */}
            <Grid item>
              <Grid container spacing={2}>
                {/* Chart 1 */}
                <Grid item xs={6}>
                  <StatCard>
                    <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: 3 }}>
                      <Typography variant="caption" sx={{ mb: 2, color: "#6b7280" }}>
                        Nuevos clientes
                      </Typography>
                      <Box sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: "50%", 
                        border: "10px solid #2a2e3a",
                        borderLeftColor: "#ff7b00",
                        transform: "rotate(-45deg)",
                        mb: 2
                      }} />
                      <Typography variant="h6" sx={{ color: "#ff7b00", fontWeight: "bold" }}>
                        25%
                      </Typography>
                    </CardContent>
                  </StatCard>
                </Grid>
                
                {/* Chart 2 */}
                <Grid item xs={6}>
                  <StatCard>
                    <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", py: 3 }}>
                      <Typography variant="caption" sx={{ mb: 2, color: "#6b7280" }}>
                        Renovaciones
                      </Typography>
                      <Box sx={{ 
                        width: 80, 
                        height: 80, 
                        borderRadius: "50%", 
                        border: "10px solid #2a2e3a",
                        borderRightColor: "#ff7b00",
                        borderBottomColor: "#ff7b00",
                        transform: "rotate(45deg)",
                        mb: 2
                      }} />
                      <Typography variant="h6" sx={{ color: "#ff7b00", fontWeight: "bold" }}>
                        75%
                      </Typography>
                    </CardContent>
                  </StatCard>
                </Grid>
              </Grid>
            </Grid>

            {/* Average age card */}
            <Grid item>
              <StatCard>
                <CardContent sx={{ py: 3 }}>
                  <Typography variant="subtitle1" sx={{ textAlign: "center", color: "#6b7280", mb: 2 }}>
                    Edad Promedio Clientes
                  </Typography>
                  <Typography variant="h4" sx={{ textAlign: "center", color: "#ff7b00", fontWeight: "bold" }}>
                    20 <Typography component="span" variant="body2" sx={{ color: "#6b7280" }}>años</Typography>
                  </Typography>
                </CardContent>
              </StatCard>
            </Grid>

            {/* Additional stats card */}
            <Grid item>
              <StatCard>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 2, color: "#ff7b00" }}>
                    Resumen Mensual
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>Ingresos totales:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>$10,500</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>Asistencia promedio:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>75%</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2" sx={{ color: "#6b7280" }}>Nuevas membresías:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>20</Typography>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stadistics;