import { useState } from "react";
import { Box, Typography, Button, Fade } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MyAppPhone from "../assets/Movil.png";
import MyAppPc from "../assets/MyAppPc.png";

const MyApp = () => {
  const [selectedView, setSelectedView] = useState<"admin" | "client" | null>(null);

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        background: "linear-gradient(180deg, #1E1E1F 17%, #0D0E13 83%)",
        color: "white",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Tu <span style={{ color: "orange" }}>gimnasio online</span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: selectedView ? 0 : 5, 
          mt: 4,
          width: "90%",
          transition: "all 0.5s ease",
        }}
      >
        <Fade in={!selectedView || selectedView === "admin"} timeout={500}>
          <Box
            onClick={() => setSelectedView("admin")}
            sx={{
              width: selectedView === "admin" ? "60%" : "45%",
              height: selectedView === "admin" ? "85vh" : "60vh",
              backgroundImage: `url(${MyAppPc})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 5,
              boxShadow: "0px 4px 15px rgba(255, 165, 0, 0.5)",
              cursor: "pointer",
              transition: "all 0.5s ease",
              opacity: selectedView && selectedView !== "admin" ? 0 : 1, 
              display: selectedView && selectedView !== "admin" ? "none" : "block",
            }}
          />
        </Fade>

        <Fade in={!selectedView || selectedView === "client"} timeout={500}>
          <Box
            onClick={() => setSelectedView("client")}
            sx={{
              width: selectedView === "client" ? "50%" : "35%",
              height: selectedView === "client" ? "85vh" : "60vh",
              backgroundImage: `url(${MyAppPhone})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: 5,
              boxShadow: "0px 4px 15px rgba(255, 165, 0, 0.5)",
              cursor: "pointer",
              transition: "all 0.5s ease",
              opacity: selectedView && selectedView !== "client" ? 0 : 1, 
              display: selectedView && selectedView !== "client" ? "none" : "block",
            }}
          />
        </Fade>
      </Box>

      {selectedView && (
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 4, bgcolor: "orange", "&:hover": { bgcolor: "#d68900" } }}
          onClick={() => setSelectedView(null)}
        >
          Volver a ambas vistas
        </Button>
      )}
    </Box>
  );
};

export default MyApp;