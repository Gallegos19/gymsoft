import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const Contact: React.FC = () => {
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
            <Typography variant="h6" sx={{ color: "#E27C08", mt:3 }}>
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
            <TextField
              fullWidth
              label="Asunto"
              variant="outlined"
              margin="normal"
              InputProps={{ sx: { backgroundColor: "#2E2E2E", color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#fff" } }}
            />
            <TextField
              fullWidth
              label="Nombre completo"
              variant="outlined"
              margin="normal"
              InputProps={{ sx: { backgroundColor: "#2E2E2E", color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#fff" } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
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
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              InputProps={{ sx: { backgroundColor: "#2E2E2E", color: "#fff" } }}
              InputLabelProps={{ sx: { color: "#fff" } }}
            />
            <FormControlLabel
              control={<Checkbox sx={{ color: "#E27C08" }} />}
              label={
                <Typography variant="body2" sx={{ color: "#fff" }}>
                  Acepto el aviso de privacidad
                </Typography>
              }
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                sx={{ color: "#E27C08", borderColor: "#E27C08" }}
              >
                Limpiar
              </Button>
              <Button variant="contained" sx={{ backgroundColor: "#E27C08" }}>
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Contact;
