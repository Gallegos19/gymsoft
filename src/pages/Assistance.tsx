import React, { useState, useEffect } from "react";
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
  useMediaQuery,
  useTheme
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from '../assets/young-muscular-woman-practicing-gym (1).jpg';

// Styled components
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
}));

// Fixed scrollable container for the table with responsive adjustments
const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: '1 1 auto',
  maxHeight: '250px',
  overflowY: 'auto',
  overflowX: 'auto', // Added horizontal scroll for mobile
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px', // Added height for horizontal scrollbar
  },
  '&::-webkit-scrollbar-track': {
    background: '#2a2e3a',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#3f4454',
    borderRadius: '4px',
    '&:hover': {
      background: '#ff7b00',
    },
  },
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    maxHeight: '200px', // Reduced height for mobile
  }
}));

// Responsive table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  borderBottom: '1px solid #2a2e3a',
  padding: '16px 8px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 4px',
    fontSize: '0.75rem',
    minWidth: '60px', // Ensure minimum width for content
  }
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  borderBottom: '1px solid #2a2e3a',
  padding: '8px',
  fontWeight: 'normal',
  fontSize: '0.85rem',
  position: 'sticky',
  top: 0,
  backgroundColor: '#1a1e2a',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    padding: '6px 4px',
    fontSize: '0.75rem',
    minWidth: '60px', // Ensure minimum width for header
  }
}));

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

const DateInput = styled(TextField)(({ theme }) => ({
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
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    maxWidth: '250px',
  }
}));

// Sample data for the table
const attendanceData = [
  { id: 1, name: "Juan Perez", entryTime: "9:00 am", exitTime: "12:00 pm" },
  { id: 2, name: "Ana Lopez", entryTime: "10:30 am", exitTime: "1:45 pm" },
  { id: 3, name: "Carlos Gomez", entryTime: "8:15 am", exitTime: "11:30 am" },
  { id: 4, name: "Maria Rodriguez", entryTime: "2:00 pm", exitTime: "4:30 pm" },
  { id: 5, name: "Roberto Sanchez", entryTime: "7:45 am", exitTime: "10:15 am" },
  { id: 6, name: "Laura Torres", entryTime: "3:30 pm", exitTime: "6:00 pm" },
  { id: 7, name: "Fernando Martinez", entryTime: "1:15 pm", exitTime: "3:45 pm" },
  { id: 8, name: "Patricia Diaz", entryTime: "11:00 am", exitTime: "2:30 pm" }
];

const Assistance: React.FC = () => {
  const [currentDate, setCurrentDate] = useState("10/01/2025");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [visibleRecords, setVisibleRecords] = useState(attendanceData);

  // Calculate avatar size based on screen size
  const avatarSize = isMobile ? 20 : 32;

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '80vh', 
      backgroundColor: '#12151f', 
      color: '#fff', 
      p: { xs: 1, sm: 2 }
    }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>

        {/* Title */}
        <Grid item xs={12}>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            color="#ff7b00"
            sx={{ pl: { xs: 1, sm: 0 } }}
          >
            Registro de Asistencias
          </Typography>
        </Grid>

        {/* Main content */}
        <Grid item xs={12}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {/* Content order changes in mobile: image first, then table */}
            {isMobile && (
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    height: '150px', 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    mb: 1,
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
                      borderRadius: 2
                    }}
                  />
                </Box>
              </Grid>
            )}
            
            {/* Left section - Attendance list */}
            <Grid item xs={12} md={7} order={{ xs: 2, md: 0 }}>
              <DarkPaper sx={{ 
                p: { xs: 1, sm: 2 },
                height: { xs: 'auto', sm: '100%' }
              }}>
                {/* Date selector */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: { xs: 1, sm: 2 },
                  width: '100%'
                }}>
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
                
                {/* Table with responsive scroll */}
                <ScrollableTableContainer>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <StyledTableHeaderCell>Nombre</StyledTableHeaderCell>
                        <StyledTableHeaderCell align="center">Entrada</StyledTableHeaderCell>
                        <StyledTableHeaderCell align="center">Salida</StyledTableHeaderCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {visibleRecords.map((record) => (
                        <TableRow key={record.id}>
                          <StyledTableCell 
                            sx={{ 
                              maxWidth: { xs: '100px', sm: '150px', md: 'none' },
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                            }}>
                              <Avatar 
                                sx={{ 
                                  bgcolor: '#12151f',
                                  width: avatarSize,
                                  height: avatarSize,
                                  mr: isMobile ? 0.5 : 1.5,
                                  fontSize: isMobile ? '0.75rem' : '1rem'
                                }} 
                              />
                              <Typography 
                                variant={isMobile ? "caption" : "body2"}
                                noWrap
                              >
                                {record.name}
                              </Typography>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell align="center">{record.entryTime}</StyledTableCell>
                          <StyledTableCell align="center">{record.exitTime}</StyledTableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollableTableContainer>

                {/* Pagination */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mt: { xs: 1, sm: 1 }, 
                  mb: { xs: 0.5, sm: 1 },
                  alignItems: 'center' 
                }}>
                  <PageButton size="small">
                    <ChevronLeftIcon fontSize="small" />
                  </PageButton>
                  <PageButton size="small">
                    <ChevronRightIcon fontSize="small" />
                  </PageButton>
                </Box>
              </DarkPaper>
            </Grid>

            {/* Right section - Image (visible only on tablet and up) */}
            {!isMobile && (
              <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                <Box 
                  sx={{ 
                    height: { sm: '300px', md: '100%' }, 
                    borderRadius: { xs: 2, sm: 4 }, 
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
                      borderRadius: { xs: 2, sm: 4 }
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Assistance;