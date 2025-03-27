import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import PlansAnual from "../assets/PlansAnual.jpg";
import PlansMensual from "../assets/PlansMensual.jpg";
import PlansSemestral from "../assets/PlansSemestral.jpg";

const plans = [
  { title: "ANUAL", price: "$5,000.00 MXN", image: PlansAnual },
  { title: "SEMESTRAL", price: "$3,500.00 MXN", image: PlansSemestral },
  { title: "MENSUAL", price: "$800.00 MXN", image: PlansMensual },
];

const Plans = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(180deg, #1E1E1F 17%, #0D0E13 83%)",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
        py: 5,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "white", mb: 4 }}>
        NUESTROS <span style={{ color: "orange" }}>PLANES</span>
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                position: "relative",
                backgroundImage: `url(${plan.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 400, 
                width: "100%",
                maxWidth: 320, 
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                textAlign: "center",
                borderRadius: "10px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 20px rgba(255, 165, 0, 0.5)",
                },
              }}
            >
              <CardContent
                sx={{
                  bgcolor: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(4px)",
                  py: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {plan.title}
                </Typography>
                <Typography variant="subtitle1">{plan.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Plans;
