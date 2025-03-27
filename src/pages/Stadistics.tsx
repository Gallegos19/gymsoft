import React, { useEffect, useState } from "react";
import { 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { styled } from '@mui/material/styles';
import Header from "../components/ui/Header";
import { StorageService } from "../core/services/StorageService";
import GetHistory, {GetHistoryResponse} from "../api/clients/GetHistory";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
}));

const StatCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  borderRadius: 8,
  height: '100%',
}));
interface ExcelDownloadProps {
  historyData: GetHistoryResponse[];
  estadisticas: {
    clientes_activos: number;
    clientes_inactivos: number;
    edad_promedio: number;
    nuevos_clientes: number;
    renovaciones: number;
    ingresos_totales: number;
  };
  historial: any[];
}

export const downloadExcel = ({
  historyData, 
  estadisticas, 
  historial
}: ExcelDownloadProps) => {
  // Create workbook and worksheets
  const workbook = XLSX.utils.book_new();

  // Brand color definitions
  const BRAND_COLORS = {
    darkBackground: '#12151f',
    orange: '#ff7b00',
    white: '#ffffff',
    lightGray: '#6b7280'
  };

  // Prepare Estadísticas data with more robust processing
  const estadisticasData = [
    ['Métrica', 'Valor'],
    ['Clientes Activos', estadisticas?.clientes_activos ?? 0],
    ['Clientes Inactivos', estadisticas?.clientes_inactivos ?? 0],
    ['Edad Promedio', estadisticas?.edad_promedio ?? 0],
    ['Nuevos Clientes', estadisticas?.nuevos_clientes ?? 0],
    ['Renovaciones', estadisticas?.renovaciones ?? 0],
    ['Ingresos Totales', estadisticas?.ingresos_totales ?? 0]
  ];
  const estadisticasWorksheet = XLSX.utils.aoa_to_sheet(estadisticasData);

  // Prepare Historial data
  let historialData: any[] = [['Fecha Renovación', 'Tipo', 'Monto']];
  if (Array.isArray(historial) && historial.length > 0) {
    const processedHistorial = historial.map(item => [
      item?.fecha_renovacion || 'N/A',
      item?.tipo || 'N/A',
      item?.monto || 0
    ]);
    historialData = [...historialData, ...processedHistorial];
  }
  const historialWorksheet = XLSX.utils.aoa_to_sheet(historialData);

  // Prepare Graph Data
  let graphData: any[] = [['Periodo', 'Valor']];
  if (
    Array.isArray(historyData) && 
    historyData.length > 0 && 
    historyData[0]?.data?.datos
  ) {
    const processedGraphData = Object.entries(historyData[0].data.datos)
      .map(([key, value]) => [key, value]);
    graphData = [...graphData, ...processedGraphData];
  }
  const graphWorksheet = XLSX.utils.aoa_to_sheet(graphData);

  // Enhanced styling for headers and worksheets
  const headerStyle = {
    font: { 
      bold: true, 
      color: { rgb: "FFFFFF" },  // White text
      sz: 12  // Slightly larger font size
    },
    fill: { 
      fgColor: { rgb: "FF7B00" },  // Brand orange
      patternType: 'solid'
    },
    alignment: {
      horizontal: "center",
      vertical: "center"
    },
    border: {
      top: { style: "thin", color: { rgb: "000000" } },
      bottom: { style: "thin", color: { rgb: "000000" } },
      left: { style: "thin", color: { rgb: "000000" } },
      right: { style: "thin", color: { rgb: "000000" } }
    }
  };

  // Alternate row coloring for better readability
  const alternateRowStyle = {
    fill: { 
      fgColor: { rgb: "F0F0F0" },  // Light gray background for alternate rows
      patternType: 'solid'
    }
  };

  // Apply styles to worksheets
  ['A1', 'B1', 'C1'].forEach(cell => {
    if (estadisticasWorksheet[cell]) estadisticasWorksheet[cell].s = headerStyle;
    if (historialWorksheet[cell]) historialWorksheet[cell].s = headerStyle;
    if (graphWorksheet[cell]) graphWorksheet[cell].s = headerStyle;
  });

  // Apply alternate row coloring
  for (let i = 2; i <= estadisticasData.length; i++) {
    if (i % 2 === 0) {
      for (let col = 0; col < 2; col++) {
        const cellRef = XLSX.utils.encode_cell({ c: col, r: i-1 });
        if (estadisticasWorksheet[cellRef]) {
          estadisticasWorksheet[cellRef].s = alternateRowStyle;
        }
      }
    }
  }

  // Column width adjustments
  estadisticasWorksheet['!cols'] = [
    { wch: 25 },  // First column width
    { wch: 15 }   // Second column width
  ];

  historialWorksheet['!cols'] = [
    { wch: 20 },  // Fecha Renovación
    { wch: 15 },  // Tipo
    { wch: 15 }   // Monto
  ];

  // Add worksheets to workbook
  XLSX.utils.book_append_sheet(workbook, estadisticasWorksheet, 'Estadísticas');
  XLSX.utils.book_append_sheet(workbook, historialWorksheet, 'Historial');
  XLSX.utils.book_append_sheet(workbook, graphWorksheet, 'Datos Gráfico');

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Save file with current date
  const currentDate = new Date().toISOString().split('T')[0];
  saveAs(blob, `Estadisticas_Gimnasio_${currentDate}.xlsx`);
};

const Stadistics: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  const id_gym = Number(storage.getItem("id_gimnasios"));
  
  const [historyData, setHistoryData] = useState<GetHistoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({
    clientes_activos: 0,
    clientes_inactivos: 0,
    edad_promedio: 0,
    nuevos_clientes: 0,
    renovaciones: 0,
    ingresos_totales: 0
  });
  const [historial, setHistorial] = useState<any[]>([]);

  const handleDownloadExcel = () => {
    // Extensive logging and validation
    console.log('Attempting to download Excel:');
    console.log('historyData:', historyData);
    console.log('estadisticas:', estadisticas);
    console.log('historial:', historial);
  
    // Validate each piece of data
    const isHistoryDataValid = 
      Array.isArray(historyData) && 
      historyData.length > 0 && 
      historyData[0]?.data?.datos;
    
    const isEstadisticasValid = 
      estadisticas && 
      Object.keys(estadisticas).length > 0 && 
      estadisticas.clientes_activos !== undefined;
    
  
    if (isHistoryDataValid && isEstadisticasValid ) {
      downloadExcel({
        historyData,
        estadisticas,
        historial
      });
    } else {
      console.error('Invalid data for Excel download:', {
        isHistoryDataValid,
        isEstadisticasValid,
      });
      // Optional: Show a user-friendly error message
      // You might want to use a toast or snackbar here
      alert('No hay datos disponibles para descargar');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchHistory = async () => {
    if (!token || !id_gym) return;

    let timeValue = "mes";
    if (tabValue === 1) timeValue = "trimestre";
    else if (tabValue === 2) timeValue = "anual";

    const response = await GetHistory.getHistory(id_gym, token, timeValue);

    if (response && !Array.isArray(response)) {
      setHistoryData([response]);
      setEstadisticas(response.data.estadisticas);
      setHistorial(response.data.historial);
    } else {
      setHistoryData([]);
      setEstadisticas({
        clientes_activos: 0,
        clientes_inactivos: 0,
        edad_promedio: 0,
        nuevos_clientes: 0,
        renovaciones: 0,
        ingresos_totales: 0
      });
      setHistorial([]);
    }

    setLoading(false);
  };

  const getGraphData = () => {
    if (historyData.length === 0) return [];
    const datos = historyData[0].data.datos;
    return Object.entries(datos).map(([key, value]) => ({
      label: key,
      value: Number(value)
    }));
  };

  const graphData = getGraphData();
  const maxValue = graphData.length > 0 ? Math.max(...graphData.map(i => i.value)) : 0;

  const generatePolylinePoints = () => {
    if (graphData.length === 0 || maxValue === 0) return "";
    
    return graphData
      .map((item, index) => {
        // Distribute points exactly across 5 columns
        const leftPercent = 10 + index * (80 / (graphData.length - 1));
        
        // Calculate vertical position based on actual value
        const height = item.value / maxValue;
        const bottomPercent = height * 100;
        
        return `${leftPercent}%,${100 - bottomPercent}%`;
      })
      .join(" ");
  };

  const renderGraphPoints = () => {
    return graphData.map((item, index) => {
      const max = Math.max(...graphData.map(i => i.value));
      const height = max > 0 ? item.value / max : 0;
      const columnWidth = 90 / (graphData.length - 1);

      return (
        <Box 
          key={index} 
          sx={{ 
            width: { xs: 8, sm: 10 }, 
            height: { xs: 8, sm: 10 }, 
            borderRadius: "50%", 
            bgcolor: "#ff7b00",
            position: "absolute",
            left: `${10 + index * columnWidth}%`,
            bottom: `${height * 100}%`
          }}
        />
      );
    });
  };

  const processHistoricalData = () => {
    if (!historial || historial.length === 0) return [];
  
    const groupedData = historial.reduce((acc, item) => {
      const date = item.fecha_renovacion;
      if (!acc[date]) {
        acc[date] = { nuevos: 0, renovaciones: 0 };
      }
  
      if (item.tipo === 'nuevo') {
        acc[date].nuevos++;
      } else if (item.tipo === 'renovacion') {
        acc[date].renovaciones++;
      }
  
      return acc;
    }, {});
  
    return Object.keys(groupedData)
      .sort()
      .map(date => ({
        fecha: new Date(date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
        total: groupedData[date].nuevos + groupedData[date].renovaciones,
        nuevos: groupedData[date].nuevos,
        renovaciones: groupedData[date].renovaciones
      }));
  };

  const historicalProcessedData = processHistoricalData();

  const totalMembresias = estadisticas.nuevos_clientes + estadisticas.renovaciones;
  const porcentajeNuevos = totalMembresias > 0 ? Math.round((estadisticas.nuevos_clientes / totalMembresias) * 100) : 0;
  const porcentajeRenovaciones = 100 - porcentajeNuevos;
  const ingresosFormateados = `${estadisticas.ingresos_totales.toLocaleString("es-MX")}`;

  useEffect(() => {
    fetchHistory();
  }, [tabValue]);

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: { xs: 1, sm: 2 } 
    }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}>
          <Header/>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: "space-between", 
            alignItems: { xs: 'flex-start', sm: 'center' }, 
            gap: { xs: 1, sm: 0 }, 
            mb: 2 
          }}>
            <Typography variant="h5" component="h1" sx={{ 
              fontWeight: "bold", 
              color: "#ff7b00",
              fontSize: { xs: '1.2rem', sm: '1.5rem' } 
            }}>
              Estadísticas
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<DownloadIcon />}
              onClick={handleDownloadExcel}
              size={isMobile ? "small" : "medium"}
              sx={{ 
                bgcolor: "#ff7b00", 
                color: "white", 
                borderRadius: 2,
                "&:hover": { bgcolor: "#e67000" }
              }}
            >
              Descargar informe
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <DarkPaper>
            <Box sx={{ mb: 2, borderBottom: 1, borderColor: 'divider', overflow: 'auto' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                textColor="inherit"
                indicatorColor="primary"
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : false}
              >
                <Tab label="Mes" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Trimestre" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280' }} />
                <Tab label="Anual" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280' }} />
              </Tabs>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, color: '#ff7b00' }}>
                Estadística ingresos Membresías
              </Typography>
              <Box sx={{ 
                height: { xs: 180, sm: 220, md: 250 }, 
                position: "relative",
                borderBottom: "1px solid #2a2e3a",
                my: 2,
                mx: { xs: 1, sm: 2, md: 4 } 
              }}>
                <Box sx={{ 
                  position: "absolute", 
                  left: { xs: -20, sm: -30 }, 
                  top: 0, 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between" 
                }}>
                  <Typography variant="caption" sx={{ color: "#6b7280", fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>$1000</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280", fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>$800</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280", fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>$600</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280", fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>$400</Typography>
                  <Typography variant="caption" sx={{ color: "#6b7280", fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>$200</Typography>
                </Box>
                
                {renderGraphPoints()}

                <svg 
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    zIndex: 0 
                  }}
                >
                  <polyline 
                    points={generatePolylinePoints()}           
                    fill="none" 
                    stroke="#ff7b00" 
                    strokeWidth="2" 
                  />
                </svg>

                <Box sx={{ 
                  position: "absolute", 
                  bottom: -25, 
                  left: 0, 
                  width: "100%", 
                  display: "flex", 
                  justifyContent: "space-between" 
                }}>
                  {graphData.map((item, index) => (
                    <Typography 
                      key={index} 
                      variant="caption" 
                      sx={{ 
                        color: "#6b7280",
                        fontSize: { xs: '0.65rem', sm: '0.75rem' } 
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </DarkPaper>
        </Grid>

        {/* Right section - Stats summaries */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={{ xs: 1, sm: 2 }} direction="column">
            {/* Total clients card */}
            <Grid item>
              <StatCard>
                <CardContent sx={{ py: { xs: 1, sm: 2 } }}> {/* Responsive padding */}
                  <Typography variant="subtitle1" sx={{ mb: { xs: 1, sm: 2 }, color: "#ff7b00" }}>
                    Total de clientes
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, sm: 2 } }}>
                        <Box sx={{ 
                          width: 16, 
                          height: 16, 
                          bgcolor: "#4caf50", 
                          borderRadius: "50%", 
                          mr: 1, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <Typography variant="caption" sx={{ color: "white" }}>✓</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{estadisticas.clientes_activos}</Typography>
                        <Typography variant="body2" sx={{ ml: 1, color: "#6b7280" }}>activos</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ 
                          width: 16, 
                          height: 16, 
                          bgcolor: "#f44336", 
                          borderRadius: "50%", 
                          mr: 1, 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center" 
                        }}>
                          <Typography variant="caption" sx={{ color: "white" }}>✕</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{estadisticas.clientes_inactivos}</Typography>
                        <Typography variant="body2" sx={{ ml: 1, color: "#6b7280" }}>inactivos</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </StatCard>
            </Grid>

            {/* Charts Grid */}
            <Grid item>
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                {/* Chart 1 */}
                <Grid item xs={6}>
                  <StatCard>
                    <CardContent sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      justifyContent: "center", 
                      alignItems: "center", 
                      py: { xs: 2, sm: 3 } // Responsive padding
                    }}>
                      <Typography variant="caption" sx={{ mb: 1, color: "#6b7280" }}>
                        Nuevos clientes
                      </Typography>
                      <Box sx={{ 
                        width: { xs: 60, sm: 70, md: 80 }, // Responsive size
                        height: { xs: 60, sm: 70, md: 80 }, 
                        borderRadius: "50%", 
                        border: "10px solid #2a2e3a",
                        borderLeftColor: "#ff7b00",
                        transform: "rotate(-45deg)",
                        mb: 1
                      }} />
                      <Typography variant="h6" sx={{ 
                        color: "#ff7b00", 
                        fontWeight: "bold",
                        fontSize: { xs: '1rem', sm: '1.25rem' } // Responsive font size
                      }}>
                        {porcentajeNuevos}%
                      </Typography>
                    </CardContent>
                  </StatCard>
                </Grid>
                
                {/* Chart 2 */}
                <Grid item xs={6}>
                  <StatCard>
                    <CardContent sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      justifyContent: "center", 
                      alignItems: "center", 
                      py: { xs: 2, sm: 3 } // Responsive padding
                    }}>
                      <Typography variant="caption" sx={{ mb: 1, color: "#6b7280" }}>
                        Renovaciones
                      </Typography>
                      <Box sx={{ 
                        width: { xs: 60, sm: 70, md: 80 }, // Responsive size
                        height: { xs: 60, sm: 70, md: 80 }, 
                        borderRadius: "50%", 
                        border: "10px solid #2a2e3a",
                        borderRightColor: "#ff7b00",
                        borderBottomColor: "#ff7b00",
                        transform: "rotate(45deg)",
                        mb: 1
                      }} />
                      <Typography variant="h6" sx={{ 
                        color: "#ff7b00", 
                        fontWeight: "bold",
                        fontSize: { xs: '1rem', sm: '1.25rem' } // Responsive font size
                      }}>
                        {porcentajeRenovaciones}%
                      </Typography>
                    </CardContent>
                  </StatCard>
                </Grid>
              </Grid>
            </Grid>

            {/* Average age card */}
            <Grid item>
              <StatCard>
                <CardContent sx={{ py: { xs: 2, sm: 3 } }}> {/* Responsive padding */}
                  <Typography variant="subtitle1" sx={{ textAlign: "center", color: "#6b7280", mb: 1 }}>
                    Edad Promedio Clientes
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      textAlign: "center", 
                      color: "#ff7b00", 
                      fontWeight: "bold",
                      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } // Responsive font size
                    }}
                  >
                    {estadisticas.edad_promedio} <Typography 
                        component="span" 
                        variant="body2" 
                        sx={{ color: "#6b7280", fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        años
                      </Typography>
                  </Typography>
                </CardContent>
              </StatCard>
            </Grid>

            {/* Additional stats card */}
            <Grid item>
              <StatCard>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: { xs: 1, sm: 2 }, color: "#ff7b00" }}>
                    Resumen Mensual
                  </Typography>
                  
                  {/* On mobile, stack in columns */}
                  {isMobile ? (
                    <>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Ingresos totales:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${ingresosFormateados}</Typography>
                      </Box>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Total de membresias</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{totalMembresias}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Nuevas membresías:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{estadisticas.nuevos_clientes}</Typography>
                      </Box>
                    </>
                  ) : (
                    // On larger screens, use rows with space between
                    <>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Ingresos totales:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>${ingresosFormateados}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Total de membresias</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{totalMembresias}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: "#6b7280" }}>Nuevas membresías:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{estadisticas.nuevos_clientes}</Typography>
                      </Box>
                    </>
                  )}
                </CardContent>
              </StatCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Stadistics;