import React, { useState, useRef, useEffect } from "react";
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
  useTheme,
  Alert,
  CircularProgress
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from 'assets/entrenamiento-joven-pareja-deportiva.avif';
import { useNavigate } from "react-router-dom";
import CreateUser from "../api/clients/CreateUser";
import { StorageService } from "../core/services/StorageService";
import Swal from 'sweetalert2';
import GetPlan from '../api/clients/GetAllPlanGym'; 
import GetAllOutlet, {Sucursal} from "../api/clients/GetAllOutlet";



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
export interface Plan {
  id: string;
  name: string;
  last_name: string;
  cost: number;
  date: number;
  id_gimnasio: string;
}

const Add: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Estados para los campos de formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoMembresia, setTipoMembresia] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [id_actualPlan, setId_actualPlan] = useState("");
  const [id_sucursal, setId_sucursal] = useState("");
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState("");
  const navigate = useNavigate();
  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  const id_gym = storage.getItem("id_gimnasios");
  const id_owner = storage.getItem("user_id");
  const [planes, setPlanes] = useState<Plan[]>([]);
  const [sucursal, setSucursal] = useState<Sucursal[]>([]);
 
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
  const fetchPlanes = async () => {
    try {
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Token no disponible',
            text: 'No se pudo recuperar el token de autenticación.',
            confirmButtonColor: '#ff7b00'
          });
          return;
      }
      const response = await GetPlan.getAllPlan(Number(id_gym), token);

      if (Array.isArray(response)) {
        console.warn('No se pudieron obtener los planes');
        setPlanes([]);
      } else {
        setPlanes(response.data);
      }
    } catch (error) {
      console.error('Error al cargar los planes:', error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSucursal = async () => {
    try {
        if (!token) {
          Swal.fire({
            icon: 'error',
            title: 'Token no disponible',
            text: 'No se pudo recuperar el token de autenticación.',
            confirmButtonColor: '#ff7b00'
          });
          return;
      }
      const response = await GetAllOutlet.getAllOutlet(token);

      if (Array.isArray(response)) {
        console.warn('No se pudieron obtener los planes');
        setSucursal([]);
      } else {
        setSucursal(response.data);
      }
    } catch (error) {
      console.error('Error al cargar los planes:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSucursal();
    fetchPlanes();
  }, []);

  const handleAdd = async () => {
    setLoading(true);
    setAddError("");

    if (
      !nombre ||
      !email ||
      !apellido ||
      !password ||
      !sexo ||
      !edad ||
      !telefono ||
      !tipoMembresia ||
      !selectedFile ||
      !id_sucursal
    ) {
      setAddError("Por favor, complete todos los campos");
      setLoading(false);
      return;
    }
      if (!token) {
        Swal.fire({
          icon: 'error',
          title: 'Token no disponible',
          text: 'No se pudo recuperar el token de autenticación.',
          confirmButtonColor: '#ff7b00'
        });
        return;
      }

    try {
      console.log(selectedFile);
      const success = await CreateUser.CreateUser({
        name: nombre,
        last_name: apellido,
        email,
        password,
        sex: sexo,
        phone: telefono,
        year_old: edad,
        file: selectedFile,
        id_actualPlan: tipoMembresia,
        id_sucursal,
      }, token);

      if (success) {
         await Swal.fire({
              icon: 'success',
              title: `Miembro agregado con éxito`,
              showConfirmButton: false,
              timer: 1500,
              background: '#1a1e2a',
              color: '#fff'
            });
        navigate("/home");
      } else {
        setAddError("Datos invalidos");
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Datos invalidos',
              confirmButtonColor: '#ff7b00',
              background: '#1a1e2a',
              color: '#fff'
            });
      }
    } catch (error) {
      setAddError("Ocurrió un error al crear el usuario");
      Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al crear el usuario',
            confirmButtonColor: '#ff7b00',
            background: '#1a1e2a',
            color: '#fff'
          });
    } finally {
      setLoading(false);
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
          <Header />
        </Grid>

        {/* Title and manage button */}
        <Grid item xs={12} sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Typography variant="h6" color="#ff7b00">Agregar Membresía</Typography>
        </Grid>

        {/* Error message display */}
        {addError && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ backgroundColor: 'rgba(211, 47, 47, 0.1)', color: '#f44336' }}>
              {addError}
            </Alert>
          </Grid>
        )}

        {/* Main content */}
        <Grid item xs={12}>
          <DarkPaper>
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
              {/* Form fields - First column */}
              <Box sx={{ 
                flex: 1, 
                mr: { md: 2 },
                mb: { xs: 2, md: 0 }
              }}>
                <StyledTextField 
                  fullWidth
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                
                <StyledTextField 
                  fullWidth
                  placeholder="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />

                <StyledTextField 
                  fullWidth
                  placeholder="Correo electrónico"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <StyledTextField 
                  fullWidth
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                    <MenuItem value="M">Masculino</MenuItem>
                    <MenuItem value="F">Femenino</MenuItem>
                    <MenuItem value="O">Otro</MenuItem>
                  </Select>
                </StyledSelect>
              </Box>

              {/* Form fields - Second column */}
              <Box sx={{ 
                flex: 1, 
                mr: { md: 2 },
                mb: { xs: 2, md: 0 }
              }}>
                <StyledTextField 
                  fullWidth
                  placeholder="Edad"
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                />
                
                <StyledTextField 
                  fullWidth
                  placeholder="Teléfono"
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
                    {
                      planes.map((tipo) => (
                        <MenuItem key={tipo.id} value={tipo.id}>{tipo.name}</MenuItem>
                      ))
                    }
                  
                  </Select>
                </StyledSelect>

                <StyledSelect fullWidth>
                  <Select
                    value={id_sucursal}
                    onChange={(e) => setId_sucursal(e.target.value as string)}
                    displayEmpty
                    IconComponent={ArrowDropDownIcon}
                    renderValue={(selected) => {
                      if (!selected) {
                        return "Sucursal";
                      }
                      return selected;
                    }}
                  >
                     {sucursal.map((s) =>
                        s.id === id_owner ? (
                          <MenuItem key={s.id} value={s.id}>
                            {s.name}
                          </MenuItem>
                        ) : null
                      )}
                  </Select>
                </StyledSelect>
              </Box>
              
              {/* Image upload section */}
              <Box sx={{ 
                width: { xs: '100%', md: 'auto' },
                flex: { md: 0 }, 
                mr: { md: 2 }, 
                display: 'flex', 
                alignItems: 'flex-start',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mt: { xs: 1, md: 0 }
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
          justifyContent: 'flex-end', 
          alignItems: { xs: 'flex-end', sm: 'center' },
          mt: 3
        }}>
          <OrangeButton 
            size={isMobile ? "small" : "medium"} 
            onClick={handleAdd}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? "Procesando..." : "Agregar"}
          </OrangeButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Add;