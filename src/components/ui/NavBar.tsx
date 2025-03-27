import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {

    if (location.pathname !== "/landing") {
        navigate("/");
      }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: scrolled
          ? "linear-gradient(to bottom, #1E1E1F, #0D0E13)"
          : "transparent",
        boxShadow: "none",
        transition: "background 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ color: "#BC6705", fontWeight: "bold", ml: 2, cursor: "pointer",marginLeft:"50px" }}
          onClick={() => navigate("/")} 
        >
          GSOFT
        </Typography>
        <Box sx={{ display: "flex", gap: 3, mr: 2 }}>
          {["Inicia Sesion","Nosotros", "Políticas de privacidad", "Contáctanos"].map((text) => (
            <Typography
              key={text}
              variant="h6"
              sx={{ color: "white", cursor: "pointer", "&:hover": { opacity: 0.8 } }}
              onClick={
                text === "Contáctanos"
                  ? scrollToContact
                  : text === "Políticas de privacidad"
                  ? () => navigate("/privacy-policies") 
                  : text === "Nosotros"
                  ? () => navigate("/us")
                  : text === "Inicia Sesion"
                  ? () => navigate("/login")
                  : undefined
              }
            >
              {text}
            </Typography>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
