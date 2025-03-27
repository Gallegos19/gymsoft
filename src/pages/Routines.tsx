import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  IconButton,
  Tabs,
  Tab,
  Modal,
  TextField,
  Button,
  Select, 
  MenuItem 
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from '@mui/material/styles';
import Header from "../components/ui/Header";
import GetRoutineById, { Routine } from "../api/clients/GetRoutinesByIdGym";
import { StorageService } from "../core/services/StorageService";
import Swal from 'sweetalert2';
import CreateRoutine from "../api/clients/CreateRoutine"; // Asegúrate que la ruta sea correcta
import DeleteRoutine from "../api/clients/DeleteRoutine";

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '80%',
  borderRadius: 8,
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

const RoutineCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#131620',
  color: 'white',
  borderRadius: 8,
  border: '1px solid #f57c00',
  height: '100%',
}));

const Routines: React.FC = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  const id_gym = storage.getItem("id_gimnasios");

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleDeleteRoutine = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Eliminar rutina?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff7b00',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
  
    if (result.isConfirmed) {
      if (!token) {
        handleCloseModal();
        Swal.fire({
          icon: 'error',
          title: 'token no disponible',
          text: 'No se pudo obtner esa informacion.',
          confirmButtonColor: '#ff7b00'
        });
        return;
      }
      const deleted = await DeleteRoutine.DeleteRoutineById(Number(id), token);
      if (deleted) {
        Swal.fire({
          icon: 'success',
          title: 'Eliminada',
          text: 'La rutina se ha eliminado correctamente.',
          confirmButtonColor: '#ff7b00'
        });
        fetchRoutines();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar la rutina.',
          confirmButtonColor: '#ff7b00'
        });
      }
    }
  };  

  const handleSave = async () => {
    if (!file) {
      Swal.fire("Archivo requerido", "Por favor selecciona un archivo PDF.", "warning");
      return;
    }
  
    if (file.type !== "application/pdf") {
      handleCloseModal();
      Swal.fire({
        icon: 'error',
        title: 'Archivo no permitido',
        text: 'Solo se permiten archivos PDF.',
        confirmButtonColor: '#ff7b00'
      });
      return;
    }
    if (!id_gym || !token) {
      handleCloseModal();
      Swal.fire({
        icon: 'error',
        title: 'ID gimnasio o token no disponible',
        text: 'No se pudo obtner esa informacion.',
        confirmButtonColor: '#ff7b00'
      });
      return;
    }
  
    if (!tipo || !descripcion) {
      handleCloseModal();
      Swal.fire("Campos incompletos", "Por favor llena todos los campos.", "warning");
      return;
    }
  
    try {
      const response = await CreateRoutine.CreateRoutine({
        file: file,
        tipo: tipo,
        description: descripcion,
        id_gimnacio: id_gym
      }, token);
  
      if (response) {
        Swal.fire({
          icon: 'success',
          title: 'Rutina guardada',
          text: 'La rutina se ha guardado correctamente.',
          confirmButtonColor: '#ff7b00'
        });
        handleCloseModal();
        fetchRoutines(); // Refresca la lista
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al guardar',
          text: 'Ocurrió un error al guardar la rutina.',
          confirmButtonColor: '#ff7b00'
        });
      }
    } catch (err) {
      console.error("Error al guardar la rutina:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error del servidor',
        text: 'No se pudo guardar la rutina.',
        confirmButtonColor: '#ff7b00'
      });
    }
  };
  


  const fetchRoutines = async () => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Token no disponible',
        text: 'No se pudo recuperar el token de autenticación.',
        confirmButtonColor: '#ff7b00'
      });
      return;
    }

    const data = await GetRoutineById.getAllRoutinesByIdGym(Number(id_gym), token);
    console.log(data);
    if (data) {
      setRoutines(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      width: '78vw',
      minHeight: '80vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: 2
    }}>
      <Grid container spacing={2}>
        {/* Header */}
        <Grid item xs={12}>
          <Header />
        </Grid>

        {/* Title + Botón */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0 }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#ff7b00" }}>
              Rutinas
            </Typography>
           <IconButton 
              aria-label="add routine" 
              onClick={handleOpenModal}
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

        {/* Rutinas */}
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
                {/* <Tab label="Fuerza" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Cardio" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} /> */}
              </Tabs>
            </Box>

            <Grid container spacing={2}>
              {loading ? (
                <Typography sx={{ ml: 2 }}>Cargando rutinas...</Typography>
              ) : routines.length === 0 ? (
                <Typography sx={{ ml: 2 }}>No hay rutinas disponibles.</Typography>
              ) : (
                routines.map((routine, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <RoutineCard>
                      <CardContent sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}>
                          Rutina
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', mb: 3 }}>
                          {routine.tipo}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#6b7280', mb: 2 }}>
                          {routine.descripcion}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#ff7b00' }}
                            href={routine.url_rutina}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <CloudDownloadIcon />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: '#ff7b00' }}
                            onClick={() => handleDeleteRoutine(routine.id)}
                          >
                            <DeleteIcon />
                          </IconButton>

                        </Box>
                      </CardContent>
                    </RoutineCard>
                  </Grid>
                ))
              )}
            </Grid>
          </DarkPaper>
        </Grid>

        {/* Lateral derecho */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={2} direction="column">

            <Grid item>
              <DarkPaper>
                <Typography variant="subtitle1" sx={{ color: "#ff7b00", mb: 2 }}>
                  Estadísticas
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Total de rutinas:</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{routines.length}</Typography>
                </Box>
              </DarkPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#1a1e2a',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          color: '#fff'
        }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2, color: "#ff7b00" }}>
            Nueva Rutina
          </Typography>
          
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "application/pdf" }}
            onChange={(e) => setFile((e.target as HTMLInputElement).files?.[0] || null)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          
          <Select
            fullWidth
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            displayEmpty
            sx={{ mb: 2, bgcolor: '#1a1e2a', color: '#fff' }}
            inputProps={{ 'aria-label': 'Seleccionar tipo' }}
          >
            <MenuItem value="" disabled>
              <em>Selecciona el tipo</em>
            </MenuItem>
            <MenuItem value="Principiante">Principiante</MenuItem>
            <MenuItem value="Intermedio">Intermedio</MenuItem>
            <MenuItem value="Avanzado">Avanzado</MenuItem>
          </Select>


          
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            multiline
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button 
            variant="contained" 
            sx={{ backgroundColor: "#ff7b00", color: "#fff", "&:hover": { backgroundColor: "#e66a00" } }}
            onClick={() => {
              handleSave();
            }}
          >
            Guardar
          </Button>
        </Box>
      </Modal>

    </Box>
  
  );
};

export default Routines;
