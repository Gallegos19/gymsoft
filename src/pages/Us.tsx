import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
  } from "@mui/material";
import Navbar from "../components/ui/NavBar";


  const Us = () => {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #0D0E13 17%, #1E1E1F 83%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
        }}
      >
        <Navbar />
        <Container
          maxWidth="md"
          sx={{
            marginTop: "40px",
            backgroundColor: "#0F131D",
            borderRadius: 2,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
            py: 5,
            px: 4,
            color: "#E0E0E0",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#BC6705",
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Sobre NovaCode
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#BC6705", fontWeight: "bold", mt: 3 }}
          >
            ¿Quiénes somos?
          </Typography>
          <Typography sx={{ mb: 3 }}>
            En NovaCode, nos especializamos en el desarrollo de soluciones
            digitales innovadoras. Desde sitios web hasta aplicaciones móviles,
            ayudamos a nuestros clientes a alcanzar sus objetivos tecnológicos.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: "#1A1D29",
                  color: "#E0E0E0",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#BC6705", fontWeight: "bold" }}
                  >
                    Nuestra Misión
                  </Typography>
                  <Typography>
                    Crear soluciones tecnológicas que impulsen el crecimiento
                    digital de empresas y emprendedores.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card
                sx={{
                  backgroundColor: "#1A1D29",
                  color: "#E0E0E0",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "#BC6705", fontWeight: "bold" }}
                  >
                    Nuestra Visión
                  </Typography>
                  <Typography>
                    Ser una empresa líder en desarrollo de software, reconocida
                    por su innovación y excelencia.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography
            variant="h6"
            sx={{ color: "#BC6705", fontWeight: "bold", mt: 4 }}
          >
            Nuestros Valores
          </Typography>
          <Typography>
            <b>🚀 Innovación:</b> Siempre exploramos nuevas tecnologías.
            <br />
            <b>🤝 Compromiso:</b> Nos aseguramos de cumplir con cada proyecto.
            <br />
            <b>🔍 Calidad:</b> Cuidamos cada detalle en nuestro desarrollo.
            <br />
            <b>👥 Trabajo en equipo:</b> Crecemos juntos para lograr más.
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#BC6705", fontWeight: "bold", mt: 4 }}
          >
            ¿Por qué elegir NovaCode?
          </Typography>
          <Typography>
            ✅ Más de X años de experiencia en desarrollo.
            <br />
            ✅ Uso de las últimas tecnologías como React, NestJS, etc.
            <br />
            ✅ Soluciones a la medida para cada cliente.
            <br />✅ Soporte continuo y atención personalizada.
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#BC6705", fontWeight: "bold", mt: 4 }}
          >
            Contáctanos
          </Typography>
          <Typography>
            📧 Email: Novacode@gallegosb.xyz
            <br />
            🌐 Web: www.gsoft.gallegosb.xyz
            <br />
          </Typography>
        </Container>
      </Box>
    );
  };

  export default Us;