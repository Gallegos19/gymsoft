import React, { useState, useEffect } from "react";
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
  InputAdornment,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Header from "../components/ui/Header";
import { styled } from "@mui/material/styles";
import img from "assets/vista-frontal-mujer-deportiva-posando.avif";
import CreatePlan from "../api/clients/CreatePlan";
import { StorageService } from "../core/services/StorageService";
import GetAllPlanGym from "../api/clients/GetAllPlanGym";
import DeletePlan from "../api/clients/DeletePlan";
import Swal from "sweetalert2";

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1a1e2a",
  color: "#fff",
  padding: theme.spacing(2),
  height: "100%",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));

const ScrollableContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  width: "100%",
  height: "400px", // Fixed height
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#2a2e3a",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#3f4454",
    borderRadius: "4px",
    "&:hover": {
      background: "#ff7b00",
    },
  },
  paddingRight: theme.spacing(1),
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  textAlign: "center",
  color: "#888",
  padding: theme.spacing(2),
}));

const OrangeDivider = styled(Divider)({
  backgroundColor: "#ff7b00",
  height: "1px",
  margin: "16px 0",
});

// Updated Membership interface
interface Membership {
  id: number;
  name: string;
  price: number;
  originalName: string;
  originalPrice: number;
  hasChanges: boolean;
}

const MyMembers: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  const id_Gym = storage.getItem("id_gimnasios");

  const [openModal, setOpenModal] = useState(false);
  const [newPlan, setNewPlan] = useState({ name: "", cost: "", date: "" });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [memberships, setMemberships] = useState<Membership[]>([]);

  // Updated change handlers
  const handleNameChange = (id: number, value: string) => {
    setMemberships(
      memberships.map((membership) =>
        membership.id === id
          ? {
              ...membership,
              name: value,
              hasChanges:
                value !== membership.originalName ||
                membership.price !== membership.originalPrice,
            }
          : membership
      )
    );
  };

  const handlePriceChange = (id: number, value: string) => {
    // Parse the input, removing non-numeric characters
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    
    setMemberships(
      memberships.map((membership) =>
        membership.id === id
          ? {
              ...membership,
              price: isNaN(numericValue) ? 0 : numericValue,
              hasChanges:
                numericValue !== membership.originalPrice ||
                membership.name !== membership.originalName,
            }
          : membership
      )
    );
  };

  const handleSave = (id: number) => {
    setMemberships(
      memberships.map((membership) =>
        membership.id === id
          ? {
              ...membership,
              originalName: membership.name,
              originalPrice: membership.price,
              hasChanges: false,
            }
          : membership
      )
    );
  };

  const handleDelete = (id: number) => {
    setMemberships(memberships.filter((membership) => membership.id !== id));
  };

  const handleGetPlans = async () => {
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
      const response = await GetAllPlanGym.getAllPlan(Number(id_Gym), token);

      if (Array.isArray(response)) {
        setMemberships([]);
      } else {
        setMemberships(
          response.data.map((plan) => ({
            id: Number(plan.id),
            name: plan.name,
            price: plan.cost,  // Store as number
            originalName: plan.name,
            originalPrice: plan.cost,
            hasChanges: false,
          }))
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al obtener los planes',
        confirmButtonColor: '#ff7b00'
      });
    }
  };

  useEffect(() => {
    handleGetPlans();
  }, []); // Empty dependency array to run only once

  const handleDeletePlan = async (id: number) => {
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
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el plan permanentemente',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff7b00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        const success = await DeletePlan.DeletePlanById(id, token);

        if (success) {
          setMemberships(memberships.filter((plan) => plan.id !== id));
          
          Swal.fire({
            icon: 'success',
            title: 'Plan Eliminado',
            text: 'El plan se ha eliminado correctamente',
            confirmButtonColor: '#ff7b00'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el plan',
            confirmButtonColor: '#ff7b00'
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al eliminar el plan',
        confirmButtonColor: '#ff7b00'
      });
    }
  };

  const handleCreatePlan = async () => {
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
      const planData = {
        name: newPlan.name,
        cost: parseFloat(newPlan.cost),
        date: parseInt(newPlan.date),
        id_gimnasio: Number(id_Gym),
      };

      const success = await CreatePlan.create(planData, token);

      if (success) {
        // Refresh plans instead of manually adding
        handleGetPlans();
        handleCloseModal();
        setNewPlan({ name: "", cost: "", date: "" });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el plan',
          confirmButtonColor: '#ff7b00'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear el plan',
        confirmButtonColor: '#ff7b00'
      });
    }
  };

  const getTextFieldSx = (hasChanges: boolean) => ({
    "& .MuiOutlinedInput-root": {
      color: "#ff7b00",
      backgroundColor: "#fff",
      borderRadius: 4,
      "& fieldset": {
        borderColor: hasChanges ? "#ff7b00" : "transparent",
      },
      "&:hover fieldset": {
        borderColor: "#ff7b00",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff7b00",
        borderWidth: "2px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "8px 12px",
      fontSize: "0.875rem",
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "70vh",
        backgroundColor: "#12151f",
        color: "#fff",
        p: { xs: 1, sm: 2 },
      }}
    >
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="h6"
            color="#ff7b00"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              mb: 0,
            }}
          >
            Mis Membresías
          </Typography>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenModal}
            sx={{
              position: "fixed",
              top: 105,
              right: 55,
              backgroundColor: "#ff7b00",
              "&:hover": { backgroundColor: "#e66b00" },
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>

        <Grid item xs={12}>
          <DarkPaper>
            <Box
              sx={{
                flex: 1,
                pr: { md: 2 },
                mb: { xs: 2, md: 0 },
                display: "flex",
                flexDirection: "column",
                width: "100%",
              }}
            >
              <ScrollableContainer>
                {memberships.length === 0 ? (
                  <EmptyStateBox>
                    <Typography variant="body1">
                      No hay planes de membresía registrados.
                      <br />
                      Haga clic en el botón + para crear un nuevo plan.
                    </Typography>
                  </EmptyStateBox>
                ) : (
                  memberships.map((membership, index) => (
                    <React.Fragment key={membership.id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          py: 1,
                          flexDirection: {
                            xs: isMobile ? "column" : "row",
                            sm: "row",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: { xs: 1, sm: 2 },
                            flex: 1,
                            width: "100%",
                            flexDirection: {
                              xs: isMobile ? "column" : "row",
                              sm: "row",
                            },
                            mb: { xs: isMobile ? 1 : 0, sm: 0 },
                          }}
                        >
                          <TextField
                            value={membership.name}
                            onChange={(e) =>
                              handleNameChange(membership.id, e.target.value)
                            }
                            size="small"
                            fullWidth
                            variant="outlined"
                            sx={getTextFieldSx(membership.hasChanges)}
                          />
                          <TextField
                            value={`${membership.price.toFixed(2)}`}
                            onChange={(e) =>
                              handlePriceChange(membership.id, e.target.value)
                            }
                            size="small"
                            fullWidth
                            variant="outlined"
                            InputProps={{
                              startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            sx={getTextFieldSx(membership.hasChanges)}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0,
                            ml: { xs: 0, sm: 2 },
                            mt: { xs: isMobile ? 1 : 0, sm: 0 },
                            justifyContent: {
                              xs: isMobile ? "flex-end" : "flex-start",
                              sm: "flex-start",
                            },
                            width: isMobile ? "100%" : "auto",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: "#ff0000" }}
                            onClick={() => handleDeletePlan(membership.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                          {membership.hasChanges && (
                            <IconButton
                              size="small"
                              sx={{
                                color: "#00ff00",
                                backgroundColor: "rgba(0, 255, 0, 0.1)",
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
                  ))
                )}
              </ScrollableContainer>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", md: "250px" },
                height: { xs: "200px", sm: "250px", md: "auto" },
                minHeight: { md: "300px" },
                borderRadius: 4,
                overflow: "hidden",
                backgroundColor: "#e0e0e0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                component="img"
                src={img}
                alt="Fitness trainer"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                  padding: 2,
                  display: { xs: "block", md: "none" },
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

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#1a1e2a', color: '#fff' }}>
          Crear Nueva Membresía
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1a1e2a' }}>
          <TextField
            label="Nombre"
            fullWidth
            variant="outlined"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
          />
          <TextField
            label="Costo"
            fullWidth
            variant="outlined"
            value={newPlan.cost}
            onChange={(e) => setNewPlan({ ...newPlan, cost: e.target.value })}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
          />
          <TextField
            label="Duración (días)"
            fullWidth
            variant="outlined"
            value={newPlan.date}
            onChange={(e) => setNewPlan({ ...newPlan, date: e.target.value })}
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1a1e2a' }}>
          <Button onClick={handleCloseModal} sx={{ color: '#fff' }}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleCreatePlan}
            sx={{
              backgroundColor: '#ff7b00',
              '&:hover': { backgroundColor: '#e66b00' },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyMembers;