import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    asunto: "",
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: "",
    privacidad: false,
  });
  const [errors, setErrors] = useState({
    asunto: false,
    nombre: false,
    telefono: false,
    correo: false,
    mensaje: false,
    privacidad: false,
  });
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {
      asunto: formData.asunto.trim() === "",
      nombre: formData.nombre.trim() === "",
      telefono: !/^\d{10}$/.test(formData.telefono),
      correo: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo),
      mensaje: formData.mensaje.trim() === "",
      privacidad: !formData.privacidad,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setAlert({
        open: true,
        message: "Formulario enviado con éxito",
        severity: "success",
      });
      setFormData({
        asunto: "",
        nombre: "",
        telefono: "",
        correo: "",
        mensaje: "",
        privacidad: false,
      });
    } else {
      setAlert({
        open: true,
        message: "Por favor, completa todos los campos correctamente",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,  #0D0E13 17%, #1E1E1F 83%)",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0F131D",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "900px",
          maxHeight: "600px",
          width: "90%",
          boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#E27C08" }}
        >
          CONTACTANOS
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: "#E27C08", mt: 3 }}>
              Instagram
            </Typography>
            <Typography variant="body1" color="white">
              nova.code_
            </Typography>

            <Typography variant="h6" sx={{ color: "#E27C08", mt: 3 }}>
              Facebook
            </Typography>
            <Typography variant="body1" color="white">
              NovaCode
            </Typography>

            <Typography variant="h6" sx={{ color: "#E27C08", mt: 3 }}>
              Correo Electrónico
            </Typography>
            <Typography variant="body1" color="white">
              Novacode@gallegosb.xyz
            </Typography>

            <Typography variant="h6" sx={{ color: "#E27C08", mt: 3 }}>
              Teléfono
            </Typography>
            <Typography variant="body1" color="white">
              +52 961 791 0940
            </Typography>

            <Typography variant="h6" sx={{ color: "#E27C08", mt: 3 }}>
              Horario
            </Typography>
            <Typography variant="body1" color="white">
              Lunes - Viernes: 09:00 AM - 06:00 PM
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                error={errors.asunto}
                helperText={errors.asunto ? "Este campo es obligatorio" : ""}
                variant="outlined"
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2E2E2E", color: "#fff" },
                }}
                InputLabelProps={{ sx: { color: "#fff" } }}
              />
              <TextField
                fullWidth
                label="Nombre completo"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
                helperText={errors.nombre ? "Este campo es obligatorio" : ""}
                variant="outlined"
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2E2E2E", color: "#fff" },
                }}
                InputLabelProps={{ sx: { color: "#fff" } }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    error={errors.telefono}
                    helperText={
                      errors.telefono ? "Debe contener 10 dígitos" : ""
                    }
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      sx: { backgroundColor: "#2E2E2E", color: "#fff" },
                    }}
                    InputLabelProps={{ sx: { color: "#fff" } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    error={errors.correo}
                    helperText={errors.correo ? "Ingrese un correo válido" : ""}
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                      sx: { backgroundColor: "#2E2E2E", color: "#fff" },
                    }}
                    InputLabelProps={{ sx: { color: "#fff" } }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                error={errors.mensaje}
                helperText={errors.mensaje ? "Este campo es obligatorio" : ""}
                variant="outlined"
                multiline
                rows={4}
                margin="normal"
                InputProps={{
                  sx: { backgroundColor: "#2E2E2E", color: "#fff" },
                }}
                InputLabelProps={{ sx: { color: "#fff" } }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.privacidad}
                    onChange={handleChange}
                    name="privacidad"
                    sx={{ color: "#E27C08" }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    Acepto el aviso de privacidad
                  </Typography>
                }
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button
                  type="reset"
                  variant="outlined"
                  sx={{ color: "#E27C08", borderColor: "#E27C08" }}
                  onClick={() =>
                    setFormData({
                      asunto: "",
                      nombre: "",
                      telefono: "",
                      correo: "",
                      mensaje: "",
                      privacidad: false,
                    })
                  }
                >
                  Limpiar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#E27C08" }}
                >
                  Enviar
                </Button>
              </Box>
            </form>
          </Grid>
        </Grid>
        <Snackbar
          open={alert.open}
          autoHideDuration={4000}
          onClose={() => setAlert({ ...alert, open: false })}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Contact;
