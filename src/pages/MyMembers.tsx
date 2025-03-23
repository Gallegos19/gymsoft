import React, { useState } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  IconButton,
  TextField,
  Divider,
  useMediaQuery,
  useTheme,
  InputAdornment
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from 'assets/vista-frontal-mujer-deportiva-posando.avif';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

// Nuevo componente para el contenedor con scroll
const ScrollableContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  width: '100%',
  maxHeight: '400px', // Altura máxima del contenedor
  overflowY: 'auto', // Permitir scroll vertical
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#2a2e3a',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#3f4454',
    borderRadius: '4px',
    '&:hover': {
      background: '#ff7b00',
    },
  },
  paddingRight: theme.spacing(1),
}));

const OrangeDivider = styled(Divider)({
  backgroundColor: '#ff7b00',
  height: '1px',
  margin: '16px 0',
});

// Tipo para las membresías
interface Membership {
  id: number;
  name: string;
  price: string;
  originalName: string; // Para guardar el valor original antes de editar
  originalPrice: string; // Para guardar el valor original antes de editar
  hasChanges: boolean; // Para rastrear si hay cambios sin guardar
}

const MyMembers: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estado para las membresías
  const [memberships, setMemberships] = useState<Membership[]>([
    { id: 1, name: "Nombre membresía", price: "$100", originalName: "Nombre membresía", originalPrice: "$100", hasChanges: false },
    { id: 2, name: "Nombre membresía", price: "$100", originalName: "Nombre membresía", originalPrice: "$100", hasChanges: false },
    { id: 3, name: "Nombre membresía", price: "$100", originalName: "Nombre membresía", originalPrice: "$100", hasChanges: false },
    { id: 4, name: "Nombre membresía", price: "$100", originalName: "Nombre membresía", originalPrice: "$100", hasChanges: false },
  ]);

  // Manejar cambios en los inputs
  const handleNameChange = (id: number, value: string) => {
    setMemberships(
      memberships.map(membership => 
        membership.id === id ? { 
          ...membership, 
          name: value, 
          hasChanges: value !== membership.originalName || membership.price !== membership.originalPrice 
        } : membership
      )
    );
  };

  const handlePriceChange = (id: number, value: string) => {
    setMemberships(
      memberships.map(membership => 
        membership.id === id ? { 
          ...membership, 
          price: value, 
          hasChanges: value !== membership.originalPrice || membership.name !== membership.originalName 
        } : membership
      )
    );
  };

  // Guardar cambios
  const handleSave = (id: number) => {
    setMemberships(
      memberships.map(membership => 
        membership.id === id ? { 
          ...membership, 
          originalName: membership.name, 
          originalPrice: membership.price, 
          hasChanges: false 
        } : membership
      )
    );
  };

  // Eliminar membresía
  const handleDelete = (id: number) => {
    setMemberships(memberships.filter(membership => membership.id !== id));
  };

  // Estilos comunes para los TextField
  const getTextFieldSx = (hasChanges: boolean) => ({
    '& .MuiOutlinedInput-root': {
      color: '#ff7b00',
      backgroundColor: '#fff',
      borderRadius: 4,
      '& fieldset': {
        borderColor: hasChanges ? '#ff7b00' : 'transparent',
      },
      '&:hover fieldset': {
        borderColor: '#ff7b00',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ff7b00',
        borderWidth: '2px',
      },
    },
    '& .MuiInputBase-input': {
      padding: '8px 12px',
      fontSize: '0.875rem',
    },
  });

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '70vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: { xs: 1, sm: 2 } 
    }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Title */}
        <Grid item xs={12}>
          <Typography 
            variant="h6" 
            color="#ff7b00"
            sx={{ 
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              mb: 0
            }}
          >
            Mis Membresias
          </Typography>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <DarkPaper>
            {/* Left section - Membership list with scrollable container */}
            <Box sx={{ 
              flex: 1, 
              pr: { md: 2 }, 
              mb: { xs: 2, md: 0 },
              display: 'flex',
              flexDirection: 'column',
              width: '100%' 
            }}>
              <ScrollableContainer>
                {memberships.map((membership, index) => (
                  <React.Fragment key={membership.id}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      py: 1,
                      flexDirection: { xs: isMobile ? 'column' : 'row', sm: 'row' }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 2 }, 
                        flex: 1,
                        width: '100%',
                        flexDirection: { xs: isMobile ? 'column' : 'row', sm: 'row' },
                        mb: { xs: isMobile ? 1 : 0, sm: 0 }
                      }}>
                        {/* Campo de nombre - siempre editable */}
                        <TextField 
                          value={membership.name}
                          onChange={(e) => handleNameChange(membership.id, e.target.value)}
                          size="small"
                          fullWidth
                          variant="outlined"
                          sx={getTextFieldSx(membership.hasChanges)}
                        />
                        {/* Campo de precio - siempre editable */}
                        <TextField 
                          value={membership.price}
                          onChange={(e) => handlePriceChange(membership.id, e.target.value)}
                          size="small"
                          fullWidth
                          variant="outlined"
                          sx={getTextFieldSx(membership.hasChanges)}
                        />
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 0, 
                        ml: { xs: 0, sm: 2 },
                        mt: { xs: isMobile ? 1 : 0, sm: 0 },
                        justifyContent: { xs: isMobile ? 'flex-end' : 'flex-start', sm: 'flex-start' },
                        width: isMobile ? '100%' : 'auto'
                      }}>
                        <IconButton 
                          size="small" 
                          sx={{ color: '#ff0000' }}
                          onClick={() => handleDelete(membership.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        {/* Mostrar el botón de guardar solo cuando hay cambios */}
                        {membership.hasChanges && (
                          <IconButton 
                            size="small" 
                            sx={{ 
                              color: '#00ff00',
                              backgroundColor: 'rgba(0, 255, 0, 0.1)',
                            }}
                            onClick={() => handleSave(membership.id)}
                          >
                            <SaveIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                    {index < memberships.length - 1 && <OrangeDivider />}
                  </React.Fragment>
                ))}
              </ScrollableContainer>
            </Box>
            
            {/* Right section - Image */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '250px' }, 
                height: { xs: '200px', sm: '250px', md: 'auto' },
                minHeight: { md: '300px' },
                borderRadius: 4, 
                overflow: 'hidden', 
                backgroundColor: '#e0e0e0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              <Box 
                component="img"
                src={img}
                alt="Fitness trainer"
                sx={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <Box 
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                  padding: 2,
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <Typography variant="subtitle2" color="white" fontWeight="bold">
                  Membresías Fitness
                </Typography>
              </Box>
            </Box>
          </DarkPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyMembers;