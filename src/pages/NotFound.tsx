import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  FitnessCenter as FitnessCenterIcon,
  SportsGymnastics as SportsGymnasticsIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Definir animaciones con keyframes de MUI
  const lift = keyframes`
    0% { transform: translateY(0); }
    100% { transform: translateY(-15px); }
  `;
  
  const shadow = keyframes`
    0% { width: 60%; opacity: 0.6; }
    100% { width: 40%; opacity: 0.3; }
  `;

  // Colores basados en la imagen de referencia
  const colors = {
    background: '#171923',
    paperBg: '#1A202C',
    primary: '#FF8000',
    text: '#FFFFFF',
    secondary: '#A0AEC0',
    accent: '#FF8000'
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colors.background,
      pt: 4,
      pb: 4
    }}>
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            backgroundColor: colors.paperBg,
            border: `1px solid ${colors.background}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Elementos decorativos de fondo */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              opacity: 0.05, 
              transform: 'rotate(45deg)',
              fontSize: '400px',
              color: colors.primary
            }}
          >
            <FitnessCenterIcon fontSize="inherit" />
          </Box>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: isMobile ? '5rem' : '8rem',
                  color: colors.primary
                }}
              >
                404
              </Typography>
              
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2, 
                  color: colors.text
                }}
              >
                ¡Parece que has perdido la ruta!
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  color: colors.secondary
                }}
              >
                Al igual que saltarse el día de piernas, perderse en nuestra web no es una buena idea. 
                Esta página que buscas no existe o ha sido movida a otro lugar.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/')}
                  sx={{ 
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                    backgroundColor: colors.primary,
                    '&:hover': {
                      backgroundColor: '#E67200'
                    }
                  }}
                  startIcon={<HomeIcon />}
                >
                  Inicio
                </Button>
                
                <Button 
                  variant="outlined" 
                  onClick={() => navigate(-1)}
                  sx={{ 
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderRadius: 2,
                    color: colors.primary,
                    borderColor: colors.primary,
                    '&:hover': {
                      borderColor: '#E67200',
                      color: '#E67200'
                    }
                  }}
                  startIcon={<ArrowBackIcon />}
                >
                  Volver
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative' }}>
                <SportsGymnasticsIcon 
                  sx={{ 
                    fontSize: isMobile ? '180px' : '250px',
                    color: colors.primary,
                    opacity: 0.8,
                    animation: `${lift} 2s infinite alternate ease-in-out`
                  }} 
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60%',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,128,0,0.2)',
                    animation: `${shadow} 2s infinite alternate ease-in-out`
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, pt: 3, borderTop: `1px dashed ${colors.background}`, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: colors.secondary }}>
              <FitnessCenterIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1, color: colors.primary }} />
              No te rindas, ¡vuelve a la página principal y sigue con tu rutina!
            </Typography>
          </Box>
        </Paper>
        
        {/* Logo en la esquina basado en la imagen */}
        <Box sx={{ 
          position: 'absolute', 
          top: 20, 
          left: 20, 
          display: 'flex', 
          alignItems: 'center',
          color: colors.text,
          fontWeight: 'bold'
        }}>
          <FitnessCenterIcon sx={{ color: colors.primary, mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            G SOFT
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;