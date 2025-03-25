import { Container, Typography, Box } from "@mui/material";

const PrivacyPolicies = () => {
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
    <Container
      maxWidth="md"
      sx={{
        py: 5,
        color: "#E0E0E0",
        backgroundColor: "#0F131D",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        px: 4,
        marginTop:"40px"
      }}
    >
      <Typography variant="h4" sx={{ color: "#BC6705", fontWeight: "bold", mb: 3 }}>
        Política de Privacidad de GSoft
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3, color: "#A0A0A0" }}>
        Fecha de entrada en vigencia: Marzo 2025
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          1. Introducción
        </Typography>
        <Typography>
          Bienvenido a GSoft. La presente Política de Privacidad describe cómo recopilamos, usamos, protegemos y compartimos su información personal cuando utiliza nuestra plataforma.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          2. Información que recopilamos
        </Typography>
        <Typography sx={{ fontWeight: "bold", mt: 2 }}>2.1 Información proporcionada por el usuario</Typography>
        <Typography>
          - Nombre y apellido<br/>
          - Correo electrónico<br/>
          - Número de teléfono<br/>
          - Dirección de facturación (en caso de pagos)<br/>
          - Datos de pago (procesados a través de terceros seguros)<br/>
          - Datos relacionados con el gimnasio, como membresías y rutinas personalizadas
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 2 }}>2.2 Información recopilada automáticamente</Typography>
        <Typography>
          - Dirección IP<br/>
          - Tipo de dispositivo y sistema operativo<br/>
          - Historial de uso de la aplicación
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 2 }}>2.3 Datos de terceros</Typography>
        <Typography>
          Podemos recibir información de terceros, como procesadores de pagos o integraciones con otras plataformas relacionadas con gimnasios.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          3. Uso de la información
        </Typography>
        <Typography>
          Utilizamos la información recopilada para proporcionar y mejorar nuestros servicios, administrar cuentas, enviar notificaciones y cumplir con requisitos legales.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          4. Compartición de la información
        </Typography>
        <Typography>
          No vendemos ni compartimos información personal, salvo con proveedores de servicios o por cumplimiento legal.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          5. Seguridad de los datos
        </Typography>
        <Typography>
          Implementamos medidas de seguridad como cifrado, autenticación segura y restricciones de acceso.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          6. Derechos del usuario
        </Typography>
        <Typography>
          Los usuarios pueden acceder, corregir, eliminar y restringir el procesamiento de su información personal.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          7. Retención de datos
        </Typography>
        <Typography>
          Conservamos la información mientras la cuenta esté activa y para cumplir con nuestras obligaciones legales.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          8. Uso de cookies y tecnologías similares
        </Typography>
        <Typography>
          Utilizamos cookies y herramientas de seguimiento para mejorar la experiencia del usuario.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          9. Cambios en esta política
        </Typography>
        <Typography>
          Nos reservamos el derecho de actualizar esta política y notificaremos sobre cambios importantes.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#BC6705", fontWeight: "bold" }}>
          10. Contacto
        </Typography>
        <Typography>
          Si tiene preguntas sobre esta política, puede comunicarse con nosotros a través de novacode@gallegosb.xyz.
        </Typography>
      </Box>
    </Container>
    </Box>

  );
};

export default PrivacyPolicies;
