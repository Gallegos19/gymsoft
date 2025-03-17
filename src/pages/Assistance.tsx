// src/pages/Assistance.tsx
import React, { useState } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from '../assets/young-muscular-woman-practicing-gym.jpg';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
}));

const StyledTableCell = styled(TableCell)({
  color: '#fff',
  borderBottom: '1px solid #2a2e3a',
  padding: '16px 8px',
});

const StyledTableHeaderCell = styled(TableCell)({
  color: '#fff',
  borderBottom: '1px solid #2a2e3a',
  padding: '8px',
  fontWeight: 'normal',
  fontSize: '0.85rem',
});

const PageButton = styled(IconButton)({
  backgroundColor: '#ff7b00',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e67000',
  },
  margin: '0 4px',
  width: 32,
  height: 32,
});

const DateInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: '#1a1e2a',
    borderRadius: 4,
    '& fieldset': {
      borderColor: '#2a2e3a',
    },
    '&:hover fieldset': {
      borderColor: '#3a3e4a',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ff7b00',
    },
  },
  '& .MuiInputAdornment-root': {
    color: '#ff7b00',
  },
});

// Definir datos de ejemplo para la tabla
const attendanceData = [
  { id: 1, name: "Juan Perez", entryTime: "9:00 am", exitTime: "12:00 pm" },
  { id: 2, name: "Juan Perez", entryTime: "9:00 am", exitTime: "12:00 pm" },
  { id: 3, name: "Juan Perez", entryTime: "9:00 am", exitTime: "12:00 pm" },
  { id: 4, name: "Juan Perez", entryTime: "9:00 am", exitTime: "12:00 pm" },
];

const Assistance: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("10/01/2025");

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: 2 
    }}>
      <Grid container spacing={2}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Title */}
        <Grid item xs={12}>
          <Typography variant="h6" color="#ff7b00">Registro de Asistencias</Typography>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {/* Left section - Attendance list */}
            <Grid item xs={12} md={7}>
              <DarkPaper>
                {/* Date selector */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                  <DateInput
                    value={currentDate}
                    onChange={(e) => setCurrentDate(e.target.value)}
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CalendarTodayIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                
                {/* Table */}
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableHeaderCell>Nombre</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Entrada</StyledTableHeaderCell>
                        <StyledTableHeaderCell>Salida</StyledTableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceData.map((record) => (
                        <TableRow key={record.id}>
                          <StyledTableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ bgcolor: '#12151f', width: 32, height: 32, mr: 1.5 }} />
                              {record.name}
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>{record.entryTime}</StyledTableCell>
                          <StyledTableCell>{record.exitTime}</StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Pagination */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, alignItems: 'center' }}>
                  <PageButton size="small">
                    <ChevronLeftIcon />
                  </PageButton>
                  <PageButton size="small">
                    <ChevronRightIcon />
                  </PageButton>
                </Box>
              </DarkPaper>
            </Grid>

            {/* Right section - Image */}
            <Grid item xs={12} md={5}>
              <Box 
                sx={{ 
                  height: '100%', 
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box 
                  component="img"
                  src={img}
                  alt="Gym workout"
                  sx={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    borderRadius: 4
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assistance;