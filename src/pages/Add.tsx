import React, { useState, useRef } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from 'assets/entrenamiento-joven-pareja-deportiva.avif';

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

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#ff7b00',
    '& fieldset': {
      borderColor: '#ff7b00',
    },
    '&:hover fieldset': {
      borderColor: '#ff7b00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff7b00',
    },
  },
  '& .MuiInputBase-input': {
    padding: '10px 12px',
  },
  marginBottom: '16px',
});

const StyledSelect = styled(FormControl)({
  '& .MuiOutlinedInput-root': {
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#ff7b00',
    '& fieldset': {
      borderColor: '#ff7b00',
    },
    '&:hover fieldset': {
      borderColor: '#ff7b00',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff7b00',
    },
  },
  '& .MuiSvgIcon-root': {
    color: '#ff7b00',
  },
  marginBottom: '16px',
});

const OrangeButton = styled(Button)({
  backgroundColor: '#ff7b00',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e67000',
  },
  borderRadius: 4,
  textTransform: 'none',
  padding: '8px 16px',
});

const ImageUploadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderRadius: 4,
  padding: '15px',
  height: '120px',
  width: '100%',
  cursor: 'pointer',
  border: '1px dashed #ff7b00',
  '&:hover': {
    backgroundColor: '#fff8f2',
  },
  [theme.breakpoints.down('sm')]: {
    height: '100px',
  },
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const Add: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Estados para los campos de formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [sexo, setSexo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoMembresia, setTipoMembresia] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Crear URL para previsualizar la imagen
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };
  
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '80vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: { xs: 1, sm: 2 } 
    }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Title and manage button */}
        <Grid item xs={12} sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Typography variant="h6" color="#ff7b00">Agregar Membresia</Typography>
          <OrangeButton size={isMobile ? "small" : "medium"}>
            Gestionar membresías
          </OrangeButton>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <DarkPaper>
            {/* Left section - Image */}
            <Box 
              sx={{ 
                width: { xs: '100%', md: '180px' }, 
                height: { xs: '200px', md: 'auto' },
                borderRadius: 2, 
                overflow: 'hidden', 
                mb: { xs: 2, md: 0 },
                mr: { md: 2 },
                border: '1px solid #ff7b00'
              }}
            >
              <Box 
                component="img"
                src={img}
                alt="Gym workout"
                sx={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                }}
              />
            </Box>
            
            {/* Right section - Form */}
            <Box sx={{ 
              flex: 1, 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }
            }}>
              {/* Form fields */}
              <Box sx={{ 
                flex: 1, 
                mr: { md: 4 },
                mb: { xs: 2, md: 0 }
              }}>
                <StyledTextField 
                  fullWidth
                  placeholder="Nombre completo"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                
                <StyledTextField 
                  fullWidth
                  placeholder="Nombre de equipo"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
                
                <StyledSelect fullWidth>
                  <Select
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value as string)}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Seleccione el sexo";
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="masculino">Masculino</MenuItem>
                    <MenuItem value="femenino">Femenino</MenuItem>
                    <MenuItem value="otro">Otro</MenuItem>
                  </Select>
                </StyledSelect>
                
                <StyledTextField 
                  fullWidth
                  placeholder="Ingrese el teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                
                <StyledSelect fullWidth>
                  <Select
                    value={tipoMembresia}
                    onChange={(e) => setTipoMembresia(e.target.value as string)}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Tipo de membresía";
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="mensual">Mensual</MenuItem>
                    <MenuItem value="trimestral">Trimestral</MenuItem>
                    <MenuItem value="anual">Anual</MenuItem>
                  </Select>
                </StyledSelect>
              </Box>
              
              {/* Image upload section */}
              <Box sx={{ 
                width: { xs: '100%', md: 'auto' },
                flex: { md: 0 }, 
                mr: { md: 2 }, 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Box sx={{ 
                  width: '100%', 
                  maxWidth: { xs: '100%', sm: '250px' }
                }}>
                  <HiddenInput 
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                  />
                  <ImageUploadBox onClick={handleUploadClick}>
                    {previewUrl ? (
                      <Box 
                        component="img"
                        src={previewUrl}
                        alt="Preview"
                        sx={{ 
                          maxHeight: '90px', 
                          maxWidth: '100%', 
                          objectFit: 'contain',
                        }}
                      />
                    ) : (
                      <>
                        <CloudUploadIcon sx={{ color: '#ff7b00', fontSize: { xs: 24, sm: 32 }, mb: 1 }} />
                        <Typography variant={isMobile ? "caption" : "body2"} color="#ff7b00">
                          Subir Imagen
                        </Typography>
                        <Typography variant="caption" color="#666" sx={{ mt: 0.5 }}>
                          Click para seleccionar
                        </Typography>
                      </>
                    )}
                  </ImageUploadBox>
                  {selectedFile && (
                    <Typography variant="caption" sx={{ color: '#fff', mt: 1, display: 'block', textAlign: 'center' }}>
                      {selectedFile.name}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </DarkPaper>
        </Grid>
        
        {/* Bottom action button */}
        
        <Grid item xs={12} sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'right', 
          alignItems: { xs: 'flex-end', sm: 'center' },
          mt: 5
        }}>
          <OrangeButton size={isMobile ? "small" : "medium"}>Agregar</OrangeButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Add;