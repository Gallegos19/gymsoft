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
  InputLabel
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from 'assets/entrenamiento-joven-pareja-deportiva.jpg';

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

const ImageUploadBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#fff',
  borderRadius: 4,
  padding: '15px',
  height: '120px',  // Reducido de 150px
  width: '100%',
  cursor: 'pointer',
  border: '1px dashed #ff7b00',
  '&:hover': {
    backgroundColor: '#fff8f2',
  },
});

const HiddenInput = styled('input')({
  display: 'none',
});

const Add: React.FC = () => {
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

        {/* Title and manage button */}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="#ff7b00">Agregar Membresia</Typography>
          <OrangeButton>Gestionar membresías</OrangeButton>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <DarkPaper>
            {/* Left section - Image */}
            <Box 
              sx={{ 
                width: '180px', 
                borderRadius: 2, 
                overflow: 'hidden', 
                mr: 2,
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
            <Box sx={{ flex: 1, display: 'flex' }}>
              {/* Form fields */}
              <Box sx={{ flex: 1, mr: 4 }}>
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
              
              {/* Image upload - tamaño reducido y funcionalidad de subida */}
              <Box sx={{ flex: 0, mr: 8, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', maxWidth: '250px' }}>
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
                        <CloudUploadIcon sx={{ color: '#ff7b00', fontSize: 32, mb: 1 }} />
                        <Typography variant="body2" color="#ff7b00">
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
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <OrangeButton>Agregar</OrangeButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Add;