import React from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  IconButton,
  Tabs,
  Tab
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
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

const RoutineCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#131620',
  color: 'white',
  borderRadius: 8,
  border: '1px solid #f57c00',
  height: '100%',
}));

const Routines: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const routines = [
    { name: "Principiante", description: "Ejercicios básicos para comenzar" },
    { name: "Intermedio", description: "Rutina de nivel medio" },
    { name: "Avanzado", description: "Entrenamiento de alta intensidad" },
    { name: "Cardio", description: "Enfocado en ejercicios cardiovasculares" },
    { name: "Fuerza", description: "Desarrollo de fuerza muscular" },
    { name: "Hipertrofia", description: "Maximizar crecimiento muscular" }
  ];

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

        {/* Title and Add button */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#ff7b00" }}>
              Rutinas
            </Typography>
            <IconButton 
              aria-label="add routine" 
              sx={{ 
                color: "#ff7b00",
                bgcolor: "transparent",
                '&:hover': {
                  bgcolor: "rgba(255, 123, 0, 0.1)",
                },
                width: 40,
                height: 40
              }}
            >
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>

        {/* Main content section */}
        <Grid item xs={12} md={8}>
          <DarkPaper>
            <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                textColor="inherit"
                indicatorColor="primary"
              >
                <Tab label="Todas" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Fuerza" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Cardio" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} />
              </Tabs>
            </Box>
            
            <Grid container spacing={2}>
              {routines.map((routine, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <RoutineCard>
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                        Rutina
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
                        {routine.name}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#6b7280', mb: 2 }}>
                        {routine.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <IconButton size="small" sx={{ color: '#ff7b00' }}>
                          <CloudDownloadIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#ff7b00' }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </RoutineCard>
                </Grid>
              ))}
            </Grid>
          </DarkPaper>
        </Grid>

        {/* Right section - Featured routine */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <DarkPaper>
                <Typography variant="subtitle1" sx={{ color: "#ff7b00", mb: 2 }}>
                  Rutina Destacada
                </Typography>
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: 200, 
                    backgroundImage: 'url(/api/placeholder/400/200)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                    mb: 2
                  }}
                />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Entrenamiento Premium
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                  Rutina completa diseñada para maximizar resultados en tiempo mínimo. Incluye ejercicios de fuerza, resistencia y flexibilidad.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton sx={{ color: '#ff7b00' }}>
                    <CloudDownloadIcon />
                  </IconButton>
                </Box>
              </DarkPaper>
            </Grid>
            
            <Grid item>
              <DarkPaper>
                <Typography variant="subtitle1" sx={{ color: "#ff7b00", mb: 2 }}>
                  Estadísticas
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Total de rutinas:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>6</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Descargas:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>120</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Más popular:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Intermedio</Typography>
                </Box>
              </DarkPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Routines;