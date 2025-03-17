// src/pages/MyMembers.tsx
import React from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  IconButton,
  TextField,
  Divider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from 'assets/vista-frontal-mujer-deportiva-posando.jpg'

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
  display: 'flex',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#ff7b00',
    backgroundColor: '#fff',
    borderRadius: 4,
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: '8px 12px',
    fontSize: '0.875rem',
  },
});

const OrangeDivider = styled(Divider)({
  backgroundColor: '#ff7b00',
  height: '1px',
  margin: '16px 0',
});

// Definir datos de ejemplo para las membresías
const membershipData = [
  { id: 1, name: "Nombre membresía", price: "Precio membresía" },
  { id: 2, name: "Nombre membresía", price: "Precio membresía" },
  { id: 3, name: "Nombre membresía", price: "Precio membresía" },
  { id: 4, name: "Nombre membresía", price: "Precio membresía" },
];

const MyMembers: React.FC = () => {
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

        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h6" color="#ff7b00">Mis Membresias</Typography>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <DarkPaper>
            {/* Left section - Membership list */}
            <Box sx={{ flex: 1, pr: 2 }}>
              {membershipData.map((membership, index) => (
                <React.Fragment key={membership.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                    <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
                      <StyledTextField 
                        value={membership.name}
                        size="small"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <StyledTextField 
                        value={membership.price}
                        size="small"
                        fullWidth
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                      <IconButton size="small" sx={{ color: '#ff0000' }}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#00ff00' }}>
                        <CheckCircleIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  {index < membershipData.length - 1 && <OrangeDivider />}
                </React.Fragment>
              ))}
            </Box>
            
            {/* Right section - Image */}
            <Box 
              sx={{ 
                width: '250px', 
                borderRadius: 4, 
                overflow: 'hidden', 
                backgroundColor: '#e0e0e0',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Box 
                component="img"
                src={img}
                alt="Fitness trainer"
                sx={{ 
                  height: '100%', 
                  objectFit: 'cover',
                }}
              />
            </Box>
          </DarkPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyMembers;