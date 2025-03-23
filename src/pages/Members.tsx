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
  Avatar,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FilterListIcon from '@mui/icons-material/FilterList';
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

const MemberCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  marginBottom: theme.spacing(2),
  borderRadius: 8,
  border: '1px solid #2a2e3a',
}));

// Definir datos de ejemplo para la tabla
const membersData = [
  { id: 1, name: "Juan Perez", gender: "M", phone: "9911423333", expiryDate: "18-01-2025" },
  { id: 2, name: "María González", gender: "F", phone: "9922334455", expiryDate: "22-02-2025" },
  { id: 3, name: "Carlos Rodríguez", gender: "M", phone: "9933445566", expiryDate: "05-03-2025" },
  { id: 4, name: "Ana López", gender: "F", phone: "9944556677", expiryDate: "12-04-2025" },
];

const Members: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [month, setMonth] = useState("");
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMonth(event.target.value as string);
  };

  const renderMobileView = () => (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar miembro..."
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
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
          <FormControl size="small" fullWidth sx={{ 
            backgroundColor: '#242836',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#6b7280' }
          }}>
            <InputLabel id="month-select-label">Mes</InputLabel>
            <Select
              labelId="month-select-label"
              value={month}
              label="Mes"
              onChange={handleMonthChange as any}
              sx={{ color: '#fff' }}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="01">Enero</MenuItem>
              <MenuItem value="02">Febrero</MenuItem>
              <MenuItem value="03">Marzo</MenuItem>
              {/* Agregar más meses */}
            </Select>
          </FormControl>
          
          <IconButton 
            sx={{ 
              backgroundColor: '#242836', 
              borderRadius: 1,
              color: '#6b7280',
              height: '40px',
              width: '40px'
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>
      
      {/* Mobile cards */}
      {membersData.map((member) => (
        <MemberCard key={member.id}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#12151f', width: 40, height: 40, mr: 1.5 }} />
                <Box>
                  <Typography variant="subtitle1">{member.name}</Typography>
                  <Typography variant="body2" color="#6b7280">{member.phone}</Typography>
                </Box>
              </Box>
              <Chip 
                label={member.expiryDate} 
                size="small" 
                sx={{ 
                  backgroundColor: '#242836', 
                  color: '#ff7b00',
                  height: '24px',
                  '& .MuiChip-label': { px: 1 }
                }} 
              />
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Chip 
                label={member.gender === 'M' ? 'Masculino' : 'Femenino'} 
                size="small" 
                sx={{ 
                  backgroundColor: '#242836', 
                  color: '#fff',
                  height: '24px',
                  '& .MuiChip-label': { px: 1 }
                }} 
              />
              
              <Box>
                <IconButton size="small" sx={{ color: '#6b7280' }}>
                  <RefreshIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#6b7280' }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </MemberCard>
      ))}
    </>
  );

  const renderTableView = () => (
    <>
      <Box sx={{ 
        mb: 0, 
        display: 'flex', 
        flexDirection: isTablet ? 'column' : 'row',
        gap: isTablet ? 2 : 0,
        justifyContent: 'space-between', 
        alignItems: isTablet ? 'flex-start' : 'center' 
      }}>
        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          textColor="inherit"
          indicatorColor="primary"
          variant={isTablet ? "fullWidth" : "standard"}
        >
          <Tab label="Activos" sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
          <Tab label="Inactivos" sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
          <Tab label="Próximos a vencer" sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
        </Tabs>
        
        {/* Search box */}
        <Box sx={{ display: 'flex', alignItems: 'center', width: isTablet ? '100%' : 'auto' }}>
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
            sx={{ width: isTablet ? '70%' : '200px', mr: 2 }}
          />
          
          <FormControl size="small" sx={{ 
            width: isTablet ? '30%' : 'auto',
            backgroundColor: '#242836',
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            '& .MuiSelect-select': { color: '#fff' },
            '& .MuiInputLabel-root': { color: '#6b7280' }
          }}>
            <InputLabel id="month-select-label">Mes</InputLabel>
            <Select
              labelId="month-select-label"
              value={month}
              label="Mes"
              onChange={handleMonthChange as any}
              sx={{ color: '#fff' }}
            >
              <MenuItem value=""><em>Todos</em></MenuItem>
              <MenuItem value="01">Enero</MenuItem>
              <MenuItem value="02">Febrero</MenuItem>
              <MenuItem value="03">Marzo</MenuItem>
              {/* Agregar más meses */}
            </Select>
          </FormControl>
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
    </>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '85vh', 
      width: '75vw',
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
          <Typography variant="h6" color="#ff7b00">
            Membresias
          </Typography>
        </Grid>

        {/* Members list */}
        <Grid item xs={12}>
          <DarkPaper sx={{ p: { xs: 1, sm: 2 } }}>
            {/* Responsive content */}
            {isMobile ? renderMobileView() : renderTableView()}

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