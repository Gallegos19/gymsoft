// src/pages/HomePage.tsx
import React from "react";
import { Typography, Button, Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h3" component="h1" gutterBottom>
        ¡Bienvenido a mi App con MUI!
      </Typography>
      <Typography variant="body1">
        Edita <code>src/pages/HomePage.tsx</code> y guarda para recargar.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        href="https://reactjs.org"
        target="_blank"
        sx={{ mt: 2 }}
      >
        Aprende React
      </Button>
    </Box>
  );
};

export default HomePage;
