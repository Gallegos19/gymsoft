import { Box, Typography } from "@mui/material";
import FunctionalityEstadisticas from "../assets/FunctionalityEstadisticas.png";
import FunctionalityAsistencias from "../assets/FunctionalityAsistencias.png";
import FunctionalityRutinas from "../assets/FunctionalityRutinas.png";

const Functionality = () => {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        py: 10,
        background: "linear-gradient(180deg,  #0D0E13 17%, #1E1E1F 83%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        ¿Cómo funciona nuestra <span style={{ color: "orange" }}>App?</span>
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          height: 400,
        }}
      >
        {[ 
          { src: FunctionalityRutinas, alt: "Rutinas", top: "10%", left: "0%", zIndex: 3 },
          { src: FunctionalityEstadisticas, alt: "Estadísticas", top: "20%", left: "30%", zIndex: 2 },
          { src: FunctionalityAsistencias, alt: "Asistencias", top: "30%", left: "55%", zIndex: 1 }
        ].map((item, index) => (
          <Box
            key={index}
            component="img"
            src={item.src}
            alt={item.alt}
            sx={{
              position: "absolute",
              top: item.top,
              left: item.left,
              width: "40%",
              borderRadius: 3,
              zIndex: item.zIndex,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 4px 20px rgba(255, 165, 0, 0.5)", 
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Functionality;