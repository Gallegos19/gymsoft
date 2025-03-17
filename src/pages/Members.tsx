// src/pages/Members.tsx
import React, { useState } from "react";
import { 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  IconButton,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';

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
  backgroundColor: '#1a1e2a',
  color: '#ff7b00',
  '&:hover': {
    backgroundColor: '#2a2e3a',
  },
  margin: '0 4px',
});

const CurrentPageButton = styled(Box)({
  backgroundColor: '#ff7b00',
  color: '#fff',
  width: '28px',
  height: '28px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 4px',
});

// Definir datos de ejemplo para la tabla
const membersData = [
  { id: 1, name: "Juan Perez", gender: "M", phone: "9911423333", expiryDate: "18-01-2025" },
  { id: 2, name: "Juan Perez", gender: "M", phone: "9911423333", expiryDate: "18-01-2025" },
  { id: 3, name: "Juan Perez", gender: "M", phone: "9911423333", expiryDate: "18-01-2025" },
  { id: 4, name: "Juan Perez", gender: "M", phone: "9911423333", expiryDate: "18-01-2025" },
];

const Members: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
          <Typography variant="h6" color="#ff7b00">Membresias</Typography>
        </Grid>

        {/* Members list */}
        <Grid item xs={12}>
          <DarkPaper>
            {/* Tabs */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                textColor="inherit"
                indicatorColor="primary"
              >
                <Tab label="Activos" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
                <Tab label="Inactivos" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
                <Tab label="Próximos a vencer" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
              </Tabs>
              
              {/* Search box */}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  placeholder="Buscar..."
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                    sx: { 
                      color: '#fff',
                      backgroundColor: '#242836',
                      borderRadius: 1,
                      '& .MuiOutlinedInput-notchedOutline': {
                        border: 'none'
                      }
                    }
                  }}
                  sx={{ width: '200px', mr: 2 }}
                />
                <Typography variant="body2">Mes</Typography>
              </Box>
            </Box>
            
            {/* Table */}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell>Nombre</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Sexo</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Teléfono</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Fecha de vencimiento</StyledTableHeaderCell>
                    <StyledTableHeaderCell align="right"></StyledTableHeaderCell>
                    <StyledTableHeaderCell align="right"></StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {membersData.map((member) => (
                    <TableRow key={member.id}>
                      <StyledTableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#12151f', width: 32, height: 32, mr: 1.5 }} />
                          {member.name}
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell>{member.gender}</StyledTableCell>
                      <StyledTableCell>{member.phone}</StyledTableCell>
                      <StyledTableCell>{member.expiryDate}</StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton size="small" sx={{ color: '#6b7280' }}>
                          <RefreshIcon />
                        </IconButton>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton size="small" sx={{ color: '#6b7280' }}>
                          <DeleteIcon />
                        </IconButton>
                      </StyledTableCell>
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
              <CurrentPageButton>1</CurrentPageButton>
              <PageButton size="small">
                <ChevronRightIcon />
              </PageButton>
            </Box>
          </DarkPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Members;