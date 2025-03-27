import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Box,
  Grid,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme, 
  GlobalStyles
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Header from "../components/ui/Header";
import { styled } from '@mui/material/styles';
import img from '../assets/young-muscular-woman-practicing-gym (1).jpg';
import { StorageService } from "../core/services/StorageService";
import GetAssistance, { GetAssistanceResponse, Assistance as AssistanceData } from "../api/clients/GetAssistance";
import GetUserById from "../api/clients/GetUserById";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';
import { format } from 'date-fns';

interface RecordWithUser {
  id: string;
  name: string;
  entryTime: string;
  exitTime: string;
  photo: string;
}

const DarkPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#1a1e2a',
  color: '#fff',
  padding: theme.spacing(2),
  height: '100%',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
}));

const ScrollableTableContainer = styled(TableContainer)(({ theme }) => ({
  flex: '1 1 auto',
  maxHeight: '250px',
  overflowY: 'auto',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
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
    maxHeight: '200px',
  }
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: '#fff',
  borderBottom: '1px solid #2a2e3a',
  padding: '16px 8px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 4px',
    fontSize: '0.75rem',
    minWidth: '60px',
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
    minWidth: '60px',
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

const CustomDatePickerWrapper = styled("div")(({ theme }) => ({
  width: '100%',
  maxWidth: '250px',
  '.react-datepicker-wrapper': {
    width: '100%'
  },
  '.react-datepicker__input-container input': {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: '#1a1e2a',
    border: '1px solid #2a2e3a',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
    '&:focus': {
      borderColor: '#ff7b00',
    }
  }
}));

const Assistance: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date | null>(new Date());
  const [visibleRecords, setVisibleRecords] = useState<RecordWithUser[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  const id_gimnasio_raw = storage.getItem("id_gimnasios");
  const id_gimnasio = Number(id_gimnasio_raw);

  const fetchData = useCallback(async (date: Date) => {
    if (!token || !id_gimnasio || !date) return;

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response: GetAssistanceResponse = await GetAssistance.getAllAssistance(id_gimnasio, formattedDate, token);
      console.log(response);
      if (Array.isArray(response.data)) {
        
        const enrichedRecords: RecordWithUser[] = [];

        for (const asistencia of response.data) {
          const userData = await GetUserById.getUser(Number(asistencia.id_user), token);
          console.log(userData);

          if (userData) {
            enrichedRecords.push({
              id: asistencia.id_user,
              name: `${userData.name} ${userData.last_name}`,
              entryTime: asistencia.entrada,
              exitTime: asistencia.salida,
              photo: userData.photo
            });
          }
        }

        setVisibleRecords(enrichedRecords);
      }
    } catch (error) {
      console.error("Error al cargar asistencias con usuarios:", error);
    }
  }, [token, id_gimnasio]);

  useEffect(() => {
    if (currentDate) fetchData(currentDate);
  }, [currentDate, fetchData]);

  const avatarSize = isMobile ? 20 : 32;

  return (
    <>
    
    <GlobalStyles styles={{ '.react-datepicker-popper': { zIndex: 9999 } }} />
    <Box sx={{ display: 'flex', minHeight: '80vh', backgroundColor: '#12151f', color: '#fff', p: { xs: 1, sm: 2 } }}>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <Grid item xs={12}><Header/></Grid>

        <Grid item xs={12}>
          <Typography variant={isMobile ? "subtitle1" : "h6"} color="#ff7b00" sx={{ pl: { xs: 1, sm: 0 } }}>
            Registro de Asistencias
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={{ xs: 1, sm: 2 }}>
            {isMobile && (
              <Grid item xs={12}>
                <Box sx={{ height: '150px', borderRadius: 2, overflow: 'hidden', mb: 1 }}>
                  <Box component="img" src={img} alt="Gym workout" sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 2 }} />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={7} order={{ xs: 2, md: 0 }}>
              <DarkPaper sx={{ p: { xs: 1, sm: 2 }, height: { xs: 'auto', sm: '100%' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 1, sm: 2 }, width: '100%' }}>
                  <CustomDatePickerWrapper>
                    <DatePicker
                      selected={currentDate}
                      onChange={(date: Date | null) => {
                        if (date) setCurrentDate(date);
                      }}
                      dateFormat="yyyy-MM-dd"
                      locale={es}
                      placeholderText="Selecciona una fecha"
                    />
                  </CustomDatePickerWrapper>
                </Box>

                {visibleRecords.length === 0 ? (
                  <Typography variant="body2" color="gray" align="center" sx={{ mt: 2 }}>
                    No hay asistencias registradas para esta fecha.
                  </Typography>
                ) : (
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
                            <StyledTableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={record.photo} sx={{ bgcolor: '#12151f', width: avatarSize, height: avatarSize, mr: isMobile ? 0.5 : 1.5, fontSize: isMobile ? '0.75rem' : '1rem' }} />
                                <Typography variant={isMobile ? "caption" : "body2"} noWrap>
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
                )}
              </DarkPaper>
            </Grid>

            {!isMobile && (
              <Grid item xs={12} md={5} order={{ xs: 1, md: 2 }}>
                <Box sx={{ height: { sm: '300px', md: '100%' }, borderRadius: { xs: 2, sm: 4 }, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                  <Box component="img" src={img} alt="Gym workout" sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: { xs: 2, sm: 4 } }} />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Assistance;