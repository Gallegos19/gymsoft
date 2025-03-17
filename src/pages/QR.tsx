import React, { useState, useEffect, useRef } from "react";
import { 
  Typography, 
  Box, 
  Paper,
  IconButton,
  CircularProgress,
  Grid,
  Button
} from "@mui/material";
import { styled } from '@mui/material/styles';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CloseIcon from '@mui/icons-material/Close';
import Header from "../components/ui/Header";
import qr from 'assets/qr.avif';

const DarkContainer = styled(Box)({
  backgroundColor: '#161b29',
  color: '#fff',
  minHeight: '100vh',
  padding: '20px',
});

const QRCodeBox = styled(Paper)({
  backgroundColor: '#1e2538',
  padding: '25px',
  margin: '0 auto',
  borderRadius: '8px',
  width: '250px',
  height: '250px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: 'none',
  position: 'relative',
  overflow: 'hidden',
});

const VideoContainer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
});

const OverlayControls = styled(Box)({
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 2,
});

const ScannerOverlay = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%',
  height: '65%',
  border: '2px solid #ff7b00',
  zIndex: 2,
  boxShadow: '0 0 0 5000px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ProfileBox = styled(Paper)({
  backgroundColor: '#1e2538',
  padding: '20px',
  borderRadius: '8px',
  marginTop: '20px',
  boxShadow: 'none',
});

const ProfileHeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const InfoRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  '& svg': {
    marginRight: '10px',
    color: '#fff',
  },
});

const UserImageBox = styled(Box)({
  backgroundColor: '#252c41',
  borderRadius: '8px',
  width: '150px',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const StopButton = styled(IconButton)({
  backgroundColor: 'rgba(255, 123, 0, 0.7)',
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 123, 0, 0.9)',
  }
});

const PermissionMessage = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '10px'
});

const QR: React.FC = () => {
  const [scanActive, setScanActive] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Función para parar el stream de la cámara
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setScanActive(false);
    setVideoReady(false);
  };

  // Función para comprobar si el navegador permite la API de MediaDevices
  const checkMediaDevicesSupport = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  // Asegura que el elemento de video esté renderizado antes de intentar acceder a él
  useEffect(() => {
    if (scanActive) {
      // Dar tiempo para que el video se renderice
      const timer = setTimeout(() => {
        setVideoReady(!!videoRef.current);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [scanActive]);

  // Función para activar la cámara
  const activateCamera = async () => {
    setIsLoading(true);
    setPermissionDenied(false);
    setErrorMessage(null);
    
    // Primero, activamos el contenedor de video para que se renderice
    setScanActive(true);
    
    // Verificar soporte para mediaDevices
    if (!checkMediaDevicesSupport()) {
      setErrorMessage("Tu navegador no soporta acceso a la cámara");
      setIsLoading(false);
      return;
    }
    
    try {
      // Esperar a que el elemento de video esté disponible
      setTimeout(async () => {
        if (!videoRef.current) {
          setErrorMessage("No se pudo acceder al elemento de video");
          setIsLoading(false);
          return;
        }
        
        try {
          // Solicitar permisos para usar la cámara
          console.log("Solicitando acceso a la cámara...");
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' } // Usar cámara trasera si está disponible
          });
          
          console.log("Acceso a la cámara concedido");
          
          // Verificar si el componente sigue montado
          if (!videoRef.current) {
            // El componente se desmontó mientras esperábamos
            stream.getTracks().forEach(track => track.stop());
            return;
          }
          
          // Guardar referencia al stream para poder detenerlo después
          streamRef.current = stream;
          
          // Asignar el stream al video
          videoRef.current.srcObject = stream;
          
          // Manejar la reproducción del video
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play()
                .then(() => {
                  console.log("Video iniciado correctamente");
                  setIsLoading(false);
                  setVideoReady(true);
                })
                .catch(err => {
                  console.error("Error al iniciar reproducción:", err);
                  setErrorMessage("Error al iniciar la cámara: " + err.message);
                  stopCamera();
                  setIsLoading(false);
                });
            }
          };
        } catch (error: any) {
          console.error('Error al acceder a la cámara:', error);
          
          // Manejar diferentes tipos de errores
          if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            setPermissionDenied(true);
            setErrorMessage("Permiso para usar la cámara denegado. Por favor, permite el acceso desde la configuración de tu navegador.");
          } else if (error.name === 'NotFoundError') {
            setErrorMessage("No se encontró ninguna cámara en este dispositivo");
          } else if (error.name === 'NotReadableError' || error.name === 'AbortError') {
            setErrorMessage("La cámara está siendo utilizada por otra aplicación");
          } else {
            setErrorMessage(`Error al acceder a la cámara: ${error.message || 'Error desconocido'}`);
          }
          
          stopCamera();
          setIsLoading(false);
        }
      }, 500);
      
      // Timeout de seguridad
      setTimeout(() => {
        if (isLoading) {
          setIsLoading(false);
        }
      }, 5000);
      
    } catch (error: any) {
      console.error('Error inesperado:', error);
      setErrorMessage(`Error inesperado: ${error.message || 'Error desconocido'}`);
      stopCamera();
      setIsLoading(false);
    }
  };

  // Limpiar recursos cuando el componente se desmonta
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Función para procesar el resultado del escaneo (puedes implementarla cuando necesites procesar QR)
  const processQRResult = (result: string) => {
    setScanResult(result);
    stopCamera();
    // Implementar la lógica para procesar el resultado del QR
  };

  const currentDate = "15 de Febrero del 2025";
  
  return (
    <DarkContainer>
      <Grid container spacing={2}>
        {/* Header section */}
        <Grid item xs={12}>
          <Header gymName="NOMBRE DEL GYM" />
        </Grid>
        
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography variant="h5" component="h1" color="#ff7b00" fontWeight="bold">
              Escanear Codigo QR
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              <IconButton size="small" sx={{ color: '#fff', p: 0, mr: 1 }}>
                <CameraAltIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2" color="#fff">
                {currentDate}
              </Typography>
            </Box>
          </Box>
        </Grid>
        
        {/* QR Scanner Box */}
        <Grid item xs={12}>
          <QRCodeBox onClick={!scanActive && !isLoading ? activateCamera : undefined}>
            {isLoading ? (
              <Box display="flex" flexDirection="column" alignItems="center">
                <CircularProgress sx={{ color: '#ff7b00' }} />
                <Typography variant="body2" color="#fff" mt={2}>
                  Solicitando acceso a la cámara...
                </Typography>
              </Box>
            ) : scanActive ? (
              <VideoContainer>
                {/* Renderizar siempre el video cuando scanActive es true */}
                <video 
                  ref={videoRef} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block',
                  }} 
                  autoPlay 
                  playsInline
                  muted
                />
                <ScannerOverlay>
                  <QrCodeScannerIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 40 }} />
                </ScannerOverlay>
                <OverlayControls>
                  <StopButton size="small" onClick={(e) => {
                    e.stopPropagation();
                    stopCamera();
                  }}>
                    <CloseIcon fontSize="small" />
                  </StopButton>
                </OverlayControls>
              </VideoContainer>
            ) : permissionDenied ? (
              <PermissionMessage>
                <Typography variant="body2" color="#ff7b00" mb={2}>
                  Acceso a la cámara denegado
                </Typography>
                <Typography variant="caption" color="#aaa" mb={2}>
                  Por favor permite el acceso a la cámara en la configuración de tu navegador
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{ 
                    backgroundColor: '#ff7b00',
                    '&:hover': { backgroundColor: '#e67000' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    activateCamera();
                  }}
                >
                  Reintentar
                </Button>
              </PermissionMessage>
            ) : errorMessage ? (
              <PermissionMessage>
                <Typography variant="body2" color="#ff7b00" mb={1}>
                  Error
                </Typography>
                <Typography variant="caption" color="#aaa" mb={2}>
                  {errorMessage}
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  sx={{ 
                    backgroundColor: '#ff7b00',
                    '&:hover': { backgroundColor: '#e67000' }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    activateCamera();
                  }}
                >
                  Reintentar
                </Button>
              </PermissionMessage>
            ) : (
              <Box 
                component="img" 
                src={qr}
                alt="Código QR" 
                sx={{ 
                  width: '80%', 
                  height: '80%',
                  filter: 'invert(1)',
                }}
              />
            )}
          </QRCodeBox>
          {!scanActive && !isLoading && !permissionDenied && !errorMessage && (
            <Typography textAlign="center" variant="body2" color="#999" mt={2}>
              Haz clic en el código QR para escanear
            </Typography>
          )}
        </Grid>
        
        {/* Mostramos información del usuario si hay un resultado del escaneo */}
        {scanResult && (
          <Grid item xs={12}>
            <ProfileBox>
              <ProfileHeaderBox>
                <Box flex={1}>
                  <UserImageBox>
                    <AccountBoxIcon sx={{ fontSize: 80, color: '#fff' }} />
                  </UserImageBox>
                </Box>
                <Box flex={1} textAlign="right">
                  <Typography fontWeight="bold" sx={{color: '#fff'}}>Membresía</Typography>
                  <Box display="flex" alignItems="center" justifyContent="flex-end" mt={1}>
                    <Typography color="#fff">Activa</Typography>
                    <CheckCircleIcon sx={{ color: '#4caf50', ml: 1 }} />
                  </Box>
                </Box>
              </ProfileHeaderBox>
              
              <InfoRow>
                <PersonIcon />
                <Typography sx={{color: '#fff'}}>Juan Perez</Typography>
              </InfoRow>
              
              <InfoRow>
                <PersonIcon />
                <Typography sx={{color: '#fff'}}>18 años</Typography>
              </InfoRow>
              
              <InfoRow>
                <CardMembershipIcon />
                <Typography sx={{color: '#fff'}}>Tipo de membresía: Normal</Typography>
              </InfoRow>
              
              <InfoRow>
                <AccessTimeIcon />
                <Typography sx={{color: '#fff'}}>Entrada: 3:00 pm</Typography>
              </InfoRow>
              
              <InfoRow sx={{ mb: 0 }}>
                <AccessTimeIcon />
                <Typography sx={{color: '#fff'}}>Salida: 6:00 pm</Typography>
              </InfoRow>
            </ProfileBox>
          </Grid>
        )}
        
        {/* Para fines de demo, mostramos la información del usuario */}
        {!scanResult && (
          <Grid item xs={12}>
            <ProfileBox>
              <ProfileHeaderBox>
                <Box flex={1}>
                  <UserImageBox>
                    <AccountBoxIcon sx={{ fontSize: 80, color: '#fff' }} />
                  </UserImageBox>
                </Box>
                <Box flex={1} textAlign="right">
                  <Typography fontWeight="bold" sx={{color: '#fff'}}>Membresía</Typography>
                  <Box display="flex" alignItems="center" justifyContent="flex-end" mt={1}>
                    <Typography color="#fff">Activa</Typography>
                    <CheckCircleIcon sx={{ color: '#4caf50', ml: 1 }} />
                  </Box>
                </Box>
              </ProfileHeaderBox>
              
              <InfoRow>
                <PersonIcon />
                <Typography sx={{color: '#fff'}}>Juan Perez</Typography>
              </InfoRow>
              
              <InfoRow>
                <PersonIcon />
                <Typography sx={{color: '#fff'}}>18 años</Typography>
              </InfoRow>
              
              <InfoRow>
                <CardMembershipIcon />
                <Typography sx={{color: '#fff'}}>Tipo de membresía: Normal</Typography>
              </InfoRow>
              
              <InfoRow>
                <AccessTimeIcon />
                <Typography sx={{color: '#fff'}}>Entrada: 3:00 pm</Typography>
              </InfoRow>
              
              <InfoRow sx={{ mb: 0 }}>
                <AccessTimeIcon />
                <Typography sx={{color: '#fff'}}>Salida: 6:00 pm</Typography>
              </InfoRow>
            </ProfileBox>
          </Grid>
        )}
      </Grid>
    </DarkContainer>
  );
};

export default QR;