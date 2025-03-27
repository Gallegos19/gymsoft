import React, { useState, useEffect } from "react";
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
import { styled } from '@mui/material/styles';
import Swal from 'sweetalert2';


import Header from "../components/ui/Header";
import GetClients, { Client } from "../api/clients/GetClients";
import { StorageService } from "../core/services/StorageService";
import RenovattionMember from "../api/clients/RenovattionMember";


// Estilos
const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '65vh',
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

const Members: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [month, setMonth] = useState("");
  const [membersData, setMembersData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  useEffect(() => {
    const fetchClients = async () => {
      const storage = StorageService.getInstance();
      const token = storage.getItem("auth_token");
      const idGymRaw = storage.getItem("id_gimnasios");
      const idGym = Number(idGymRaw);

      if (!token || isNaN(idGym)) {
        console.warn("Token o ID de gimnasio inválido");
        setLoading(false);
        return;
      }

      const response = await GetClients.getAllClients(idGym, token);
      if (!Array.isArray(response)) {
        setMembersData(response.data);
      } else {
        setMembersData([]);
      }
      setLoading(false);
    };

    fetchClients();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMonth(event.target.value as string);
  };


const handleChangeMembershipStatus = async (member: Client, newStatus: boolean) => {
  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");

  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Token no disponible',
      text: 'No se pudo recuperar el token de autenticación.',
      confirmButtonColor: '#ff7b00'
    });
    return;
  }

  const success = await RenovattionMember.RenovattionMember(member, token, newStatus);

  if (success) {
    await Swal.fire({
      icon: 'success',
      title: `Miembro ${newStatus ? 'activado' : 'desactivado'} con éxito`,
      showConfirmButton: false,
      timer: 1500,
      background: '#1a1e2a',
      color: '#fff'
    });

    // Reload después de alerta
    window.location.reload();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cambiar el estado del miembro.',
      confirmButtonColor: '#ff7b00',
      background: '#1a1e2a',
      color: '#fff'
    });
  }
};

  

  const getFilteredMembers = () => {
    const today = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(today.getDate() + 7);
  
    let filtered = [];
  
    switch (tabValue) {
      case 0: // Activos
        filtered = membersData.filter(m => m.membership_status === true);
        break;
      case 1: // Inactivos
        filtered = membersData.filter(m => m.membership_status === false);
        break;
      case 2: // Próximos a vencer
        filtered = membersData.filter(m => {
          if (!m.membership_status) return false;
          const endDate = new Date(m.date_end);
          return endDate >= today && endDate <= inSevenDays;
        });
        break;
      default:
        filtered = membersData;
    }
  
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(m =>
        `${m.name} ${m.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    return filtered;
  };
  

  // Contadores para los tabs
  const activeCount = membersData.filter(m => m.membership_status === true).length;
  const inactiveCount = membersData.filter(m => m.membership_status === false).length;
  const soonExpiringCount = membersData.filter(m => {
    if (!m.membership_status) return false;
    const today = new Date();
    const inSevenDays = new Date();
    inSevenDays.setDate(today.getDate() + 7);
    const endDate = new Date(m.date_end);
    return endDate >= today && endDate <= inSevenDays;
  }).length;

  const renderMobileView = () => (
    <>
      {/* Buscador y Filtros */}
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2, gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Buscar miembro..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          <FormControl
            size="small"
            sx={{
              backgroundColor: '#242836',
              borderRadius: 1,
              minWidth: '140px',
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
              '& .MuiSelect-select': { color: '#fff' },
              '& .MuiInputLabel-root': { color: '#6b7280' }
            }}
          >
            <InputLabel id="status-tab-label">Estado</InputLabel>
            <Select
              labelId="status-tab-label"
              value={tabValue}
              label="Estado"
              onChange={(e) => handleTabChange(e as any, parseInt(e.target.value as string))}
            >
              <MenuItem value={0}>Activos ({activeCount})</MenuItem>
              <MenuItem value={1}>Inactivos ({inactiveCount})</MenuItem>
              <MenuItem value={2}>Próx. a vencer ({soonExpiringCount})</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
  
      {/* Lista de miembros */}
      {loading ? (
        <Typography>Cargando miembros...</Typography>
      ) : getFilteredMembers().length === 0 ? (
        <Typography>No hay miembros para mostrar.</Typography>
      ) : (
        getFilteredMembers().map((member) => (
          <MemberCard key={member.id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={member.photo} sx={{ bgcolor: '#12151f', width: 40, height: 40, mr: 1.5 }} />
                  <Box>
                    <Typography variant="subtitle1">{member.name} {member.last_name}</Typography>
                    <Typography variant="body2" color="#6b7280">{member.phone}</Typography>
                  </Box>
                </Box>
                <Chip
                  label={member.date_end}
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
                  label={member.sex === 'M' ? 'Masculino' : 'Femenino'}
                  size="small"
                  sx={{
                    backgroundColor: '#242836',
                    color: '#fff',
                    height: '24px',
                    '& .MuiChip-label': { px: 1 }
                  }}
                />
                <Box>
                <IconButton 
                  size="small" 
                  sx={{ color: '#6b7280' }} 
                  onClick={() => handleChangeMembershipStatus(member, true)}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  sx={{ color: '#6b7280' }} 
                  onClick={() => handleChangeMembershipStatus(member, false)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                </Box>
              </Box>
            </CardContent>
          </MemberCard>
        ))
      )}
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
        

        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          textColor="inherit"
          indicatorColor="primary"
          variant={isTablet ? "fullWidth" : "standard"}
        >
          <Tab label={`Activos (${activeCount})`} sx={{ color: tabValue === 0 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
          <Tab label={`Inactivos (${inactiveCount})`} sx={{ color: tabValue === 1 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
          <Tab label={`Próx. a vencer (${soonExpiringCount})`} sx={{ color: tabValue === 2 ? '#ff7b00' : '#6b7280', textTransform: 'none' }} />
        </Tabs>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            placeholder="Buscar por nombre..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            sx={{ width: '300px' }}
          />
        </Box>
      </Box>

      <TableContainer
        sx={{
          maxHeight: '45vh',
          overflowY: 'auto',
          scrollbarWidth: 'none', 
          '&::-webkit-scrollbar': { display: 'none' }, 
        }}
      >
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
            {loading ? (
              <TableRow>
                <StyledTableCell colSpan={6}>Cargando miembros...</StyledTableCell>
              </TableRow>
            ) : getFilteredMembers().length === 0 ? (
              <TableRow>
                <StyledTableCell colSpan={6}>No hay miembros para mostrar.</StyledTableCell>
              </TableRow>
            ) : (
              getFilteredMembers().map((member) => (

                <TableRow key={member.id}>
                  <StyledTableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={member.photo} sx={{ bgcolor: '#12151f', width: 32, height: 32, mr: 1.5 }} />
                      {member.name} {member.last_name}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>{member.sex === 'M' ? 'Masculino' : 'Femenino'}</StyledTableCell>
                  <StyledTableCell>{member.phone}</StyledTableCell>
                  <StyledTableCell>{member.date_end}</StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton 
                      size="small" 
                      sx={{ color: '#6b7280' }} 
                      onClick={() => handleChangeMembershipStatus(member, true)}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton 
                      size="small" 
                      sx={{ color: '#6b7280' }} 
                      onClick={() => handleChangeMembershipStatus(member, false)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>

                </TableRow>
              ))
            )}
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
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" color="#ff7b00">
            Membresías
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <DarkPaper sx={{ p: { xs: 1, sm: 2 } }}>
            {isMobile ? renderMobileView() : renderTableView()}

          </DarkPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Members;
