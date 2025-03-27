import React, { useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import { styled } from "@mui/system";

import OurServiceAutomatizacion from "../assets/OurServiceAutomatización.jpg";
import OurServiceControlFinanciero from "../assets/OurServiceControlFinanciero.jpg";
import OurServiceUnionConClientes from "../assets/OurServiceUnionConClientes.jpg";
import OurServiceMultiplataforma from "../assets/OurServiceMultiplataforma.jpg";
import OurServiceSeguridad from "../assets/OurServiceSeguridad.jpg";
import OurServiceFacilDeUsar from "../assets/OurServiceFacilDeUsar.jpg";


const services = [
  {
    title: "Automatización",
    image: OurServiceAutomatizacion,
    description: "Nuestro sistema abarca múltiples áreas, facilitando la automatización de tareas y optimizando procesos.",
  },
  {
    title: "Control financiero",
    image: OurServiceControlFinanciero,
    description: "Gestiona tus ingresos y gastos con precisión para maximizar la rentabilidad de tu gimnasio.",
  },
  {
    title: "Unión con clientes",
    image: OurServiceUnionConClientes,
    description: "Fortalece la comunicación y el compromiso con tus clientes mediante herramientas personalizadas.",
  },
  {
    title: "Multiplataforma",
    image: OurServiceMultiplataforma,
    description: "Disponible en distintos dispositivos para que puedas gestionar tu negocio desde cualquier lugar.",
  },
  {
    title: "Seguridad",
    image: OurServiceSeguridad,
    description: "Protegemos tus datos con los más altos estándares de seguridad y cifrado.",
  },
  {
    title: "Fácil de usar",
    image: OurServiceFacilDeUsar,
    description: "Interfaz intuitiva y sencilla, diseñada para que cualquier usuario pueda manejarla sin problemas.",
  },
];

const ServiceCard = styled(Card)({
  height: 200,
  width: 280,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "white",
  position: "relative",
  overflow: "hidden",
  borderRadius: 12,
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 15px rgba(255, 165, 0, 0.5)",
  },
});

const Overlay = styled(Box)({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  opacity: 0,
  transition: "opacity 0.3s ease-in-out",
  padding: 16,
  textAlign: "center",
});

const Title = styled(Typography)({
  position: "absolute",
  transition: "opacity 0.3s ease-in-out",
});

const OurService: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #0D0E13 17%, #1E1E1F 100%)",
        minHeight: "100vh",
        textAlign: "center",
        color: "white",
        py: 8,
        px: 3,
      }}
    >
     
      <Typography variant="h3" fontWeight="bold" color="#E27C08" mb={3}>
        Nuestro Servicio
      </Typography>
      <Typography variant="h5" fontWeight="medium" mb={6}>
        ¿Por qué GYMSOFT es tu mejor opción?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} display="flex" justifyContent="center">
            <ServiceCard
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Title variant="h6" fontWeight="bold" color="#E27C08" sx={{ opacity: hoveredIndex === index ? 0 : 1 }}>
                {service.title}
              </Title>

              <Overlay sx={{ opacity: hoveredIndex === index ? 1 : 0 }}>
                <Typography variant="body2">{service.description}</Typography>
              </Overlay>
            </ServiceCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurService;