import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Img from "../assets/img/LandingBackground.jpg";

const HomePage: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${Img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        height: "100vh",
        overflow: "hidden", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start", 
        textAlign: "left",
        color: "white",
        px: 2,
        paddingTop:"20px",
        paddingLeft: "40px",
        gap: "28px"
      }}
    >
      <Typography variant="h2" fontWeight="bold" maxWidth={"800px"} marginLeft={"30px"}>
        OBTÉN MEJOR ADMINISTRACIÓN PARA TU GIMNASIO
      </Typography>
      <Typography variant="h6" maxWidth="600px" marginLeft={"30px"}>
        GymSoft te proporciona herramientas avanzadas para optimizar la gestión de tu gimnasio. 
        Disfruta de una experiencia de usuario intuitiva, administración eficiente y soluciones 
        diseñadas para facilitar tu trabajo diario.
      </Typography>
      <Button
        variant="contained"
        sx={{ marginLeft:"30px",borderRadius: "20px", backgroundColor: "#E27C08", color: "white", "&:hover": { backgroundColor: "#c96b06" } } }
      >
        Más información
      </Button>
    </Box>
  );
};

export default HomePage;
