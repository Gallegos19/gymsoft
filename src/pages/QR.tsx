import React, { useState, useRef, useEffect } from "react";
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
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import Header from "../components/ui/Header";
import qr from 'assets/qr.avif';
import UserProfile, { UserData } from "../components/ui/UserProfile"; 
import CreateAttendance from "../api/clients/CreateAssistance";
import GetUserById from "../api/clients/GetUserById";
import { StorageService } from "../core/services/StorageService";
import Swal from "sweetalert2";

import jsQR from "jsqr";

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

interface HTMLVideoElementWithReadyState extends HTMLVideoElement {
  readyState: number;
}

const QR = () => {
  // State management - fixed type errors
  const [scanning, setScanning] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string | null>(null);  
  const [userData, setUserData] = useState<UserData | null>(null);

  const storage = StorageService.getInstance();
  const token = storage.getItem("auth_token");
  
  // Refs - fixed the scanIntervalRef type to accept NodeJS.Timer
  const videoRef = useRef<HTMLVideoElementWithReadyState | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timer | null>(null);
  
  const defaultUserData: UserData = {
  name: "Esperando escaneo...",
  age: "-",
  membershipType: "-",
  entryTime: "-",
  exitTime: "-",
  active: false
};

  
  const currentDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Función para agregar información de depuración
  const addDebugInfo = (info: string) => {
    console.log(`DEBUG: ${info}`);
  };

  // Debugging useEffect to track state changes
  useEffect(() => {
    console.log("Estado actual:", { scanning, loading, permissionDenied, error });
    addDebugInfo(`Estado: scanning=${scanning}, loading=${loading}, denied=${permissionDenied}, error=${error}`);
  }, [scanning, loading, permissionDenied, error]);

  // Function to start the scanner
  const startScanner = async (): Promise<void> => {
    // Reset states - ensure all states are properly reset
    setLoading(true);
    setError(null);
    setPermissionDenied(false);
    setScanResult(null);
    setScanning(false);
    
    addDebugInfo("Iniciando scanner...");
    
    // Stop any existing scanner/stream to ensure clean start
    stopScanner();
    
    // Check if MediaDevices API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      addDebugInfo("API MediaDevices no soportada");
      setError("Tu navegador no soporta acceso a la cámara");
      setLoading(false);
      return;
    }

    // Make sure videoRef is initialized before requesting camera
    if (!videoRef.current) {
      addDebugInfo("videoRef not initialized, aborting");
      setError("Error al inicializar el elemento de video");
      setLoading(false);
      return;
    }
    
    try {
      addDebugInfo("Solicitando acceso a la cámara...");
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      addDebugInfo("Acceso a la cámara concedido");
      addDebugInfo(`Stream tracks: ${stream.getTracks().length}, enabled: ${stream.getTracks()[0].enabled}`);
      
      // Store stream reference
      streamRef.current = stream;
      
      // Set video source
      if (videoRef.current) {
        addDebugInfo("Asignando stream al elemento video");
        videoRef.current.srcObject = stream;
        
        // Verificar si el video tiene dimensiones
        addDebugInfo(`Video ref: ${videoRef.current ? "existe" : "no existe"}`);
        addDebugInfo(`Video dimensions: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`);
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          addDebugInfo("Video metadata loaded");
          if (videoRef.current) {
            addDebugInfo(`Video readyState: ${videoRef.current.readyState}`);
            addDebugInfo(`Video dimensions after metadata: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`);
            
            videoRef.current.play()
              .then(() => {
                addDebugInfo("Video reproduciendo correctamente");
                addDebugInfo(`Video playing: ${!videoRef.current?.paused}, muted: ${videoRef.current?.muted}`);
                setLoading(false);
                setScanning(true);
                startQRDetection();
              })
              .catch((err: Error) => {
                addDebugInfo(`Error playing video: ${err.name} - ${err.message}`);
                console.error('Error playing video:', err);
                setError(`Error al iniciar la cámara: ${err.message}`);
                stopScanner();
                setLoading(false);
              });
          } else {
            addDebugInfo("Video ref se volvió nulo después de cargar metadata");
          }
        };
        
        // Agregar manejadores de eventos para detectar posibles problemas
        videoRef.current.oncanplay = () => addDebugInfo("Evento: Video can play");
        videoRef.current.oncanplaythrough = () => addDebugInfo("Evento: Video can play through");
        videoRef.current.onerror = (e) => addDebugInfo(`Evento: Video error: ${videoRef.current?.error?.code}`);
        videoRef.current.onstalled = () => addDebugInfo("Evento: Video stalled");
        videoRef.current.onsuspend = () => addDebugInfo("Evento: Video suspended");
      } else {
        addDebugInfo("ERROR: videoRef.current es nulo");
        setError("Error al inicializar el elemento de video");
        stopScanner();
        setLoading(false);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      
      // Handle different error types
      const error = err as Error & { name?: string };
      
      addDebugInfo(`Camera access error: ${error.name} - ${error.message}`);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        addDebugInfo("Permiso de cámara denegado");
        setPermissionDenied(true);
        setError("Permiso para usar la cámara denegado");
      } else if (error.name === 'NotFoundError') {
        setError("No se encontró ninguna cámara en este dispositivo");
      } else if (error.name === 'NotReadableError' || error.name === 'AbortError') {
        setError("La cámara está siendo utilizada por otra aplicación");
      } else {
        setError(`Error al acceder a la cámara: ${error.message || 'Error desconocido'}`);
      }
      
      stopScanner();
      setLoading(false);
    }
  };
  
  // Function to stop the scanner
  const stopScanner = (): void => {
    addDebugInfo("Deteniendo scanner...");
    // Stop QR detection interval
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
      addDebugInfo("Intervalo de escaneo detenido");
    }
    
    // Stop all camera tracks
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      addDebugInfo(`Deteniendo ${tracks.length} tracks de cámara`);
      tracks.forEach((track) => {
        addDebugInfo(`Deteniendo track: ${track.kind}, enabled: ${track.enabled}`);
        track.stop();
      });
      streamRef.current = null;
    } else {
      addDebugInfo("No hay stream para detener");
    }
    
    // Reset video element
    if (videoRef.current) {
      addDebugInfo("Reseteando elemento de video");
      videoRef.current.srcObject = null;
    } else {
      addDebugInfo("No hay video ref para resetear");
    }
    
    // Update scanning state
    setScanning(false);
  };
  
  // Function to detect QR codes in video
  const startQRDetection = (): void => {
    addDebugInfo("Iniciando detección de QR...");
    // Create canvas for frame analysis if it doesn't exist
    if (!canvasRef.current) {
      const canvas = document.createElement('canvas');
      canvasRef.current = canvas;
      addDebugInfo("Canvas creado para detección");
    }
    
    // Set up scanning interval (analyze frames every 200ms - increased to reduce CPU usage)
    const intervalId = setInterval(() => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA && canvasRef.current) {
        // Get video dimensions
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;
        
        if (videoWidth === 0 || videoHeight === 0) {
          addDebugInfo(`Dimensiones de video inválidas: ${videoWidth}x${videoHeight}`);
          return;
        }
        
        // Set canvas dimensions to match video
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
        
        // Draw current video frame to canvas
        const ctx = canvasRef.current.getContext('2d');
        if (ctx && videoRef.current) {
          try {
            ctx.drawImage(videoRef.current as unknown as CanvasImageSource, 0, 0, videoWidth, videoHeight);
            
            // Get image data for QR code analysis
            const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
            
            // Attempt to detect QR code in frame
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert",
            });
            
            // If QR code found
            if (qrCode) {
              addDebugInfo(`QR code detected: ${qrCode.data.substring(0, 20)}...`);
              // Stop scanning
              stopScanner();
              
              // Process QR code data
              processQRResult(qrCode.data);
            }
          } catch (error) {
            const err = error as Error;
            addDebugInfo(`Error en detección de QR: ${err.message}`);
            console.error("QR detection error:", error);
          }
        }
      } else {
        // Log the video readiness state
        if (videoRef.current) {
          const readyState = videoRef.current.readyState;
          const readyStateText = ['HAVE_NOTHING', 'HAVE_METADATA', 'HAVE_CURRENT_DATA', 'HAVE_FUTURE_DATA', 'HAVE_ENOUGH_DATA'][readyState] || 'UNKNOWN';
          addDebugInfo(`Video no listo para detección. readyState: ${readyState} (${readyStateText})`);
        } else {
          addDebugInfo("VideoRef es nulo durante la detección");
        }
      }
    }, 200); // Increased from 100ms to 200ms
    
    addDebugInfo("Intervalo de escaneo QR iniciado");
    scanIntervalRef.current = intervalId;
  };
  
  const processQRResult = async (result: string): Promise<void> => {
    addDebugInfo(`Procesando resultado QR: ${result.substring(0, 30)}...`);
    setScanResult(result);
  
    let parsedQR;
    try {
      parsedQR = JSON.parse(result);
    } catch (err) {
      setError("El código QR no tiene un formato válido");
      return;
    }
  
    if (!parsedQR.id) {
      setError("El código QR no contiene un ID válido");
      return;
    }
  
    const userId = Number(parsedQR.id);
    if (isNaN(userId)) {
      setError("ID de usuario inválido en el QR");
      return;
    }
  
    // Guarda datos para mostrar en perfil si lo necesitas
    // setUserProfile(parsedQR); (si deseas usarlo con <UserProfile userData={userProfile} />)
  
    // Obtener token de sesión
    if (!token) {
      setError("Token de autenticación no encontrado");
      Swal.fire({
          icon: 'error',
          title: 'Token no disponible',
          text: 'No se pudo recuperar el token de autenticación.',
          confirmButtonColor: '#ff7b00'
      });
      return;
    }
  
    try {
      const success = await CreateAttendance.create({ id_user: userId }, token);
  
      if (success) {
        addDebugInfo("Asistencia registrada exitosamente");
        await Swal.fire({
                      icon: 'success',
                      title: `Asistencia registrada exitosamente`,
                      showConfirmButton: false,
                      timer: 1500,
                      background: '#1a1e2a',
                      color: '#fff'
                    });

                    try {
                      const success = await CreateAttendance.create({ id_user: userId }, token);
                    
                      if (success) {
                        addDebugInfo("Asistencia registrada exitosamente");
                    
                        // Obtener datos completos del usuario desde la API
                        const fullUserData = await GetUserById.getUser(userId, token);
                        if (fullUserData) {
                          setUserData({
                            name: `${fullUserData.name} ${fullUserData.last_name}`,
                            age: `${fullUserData.old} años`,
                            membershipType: fullUserData.id_actualPlan,
                            entryTime: fullUserData.entrada,
                            exitTime: fullUserData.salida,
                            active: fullUserData.membership_status,
                            photo: fullUserData.photo, // asegúrate que UserProfile soporte esto
                          });
                        }
                    
                        await Swal.fire({
                          icon: 'success',
                          title: `Asistencia registrada exitosamente`,
                          showConfirmButton: false,
                          timer: 1500,
                          background: '#1a1e2a',
                          color: '#fff'
                        });
                      } else {
                        setError("No se pudo registrar la asistencia");
                      }
                    } catch (error) {
                      console.error("Error al registrar asistencia:", error);
                      setError("Error al registrar asistencia");
                    }
                    
      } else {
        setError("No se pudo registrar la asistencia");
      }
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
      setError("Error al registrar asistencia");
    }
  };
  
  
  // Cleanup effect
  useEffect(() => {
    addDebugInfo("Componente montado");
    return () => {
      addDebugInfo("Componente desmontado - limpiando recursos");
      stopScanner();
    };
  }, []);
  
  return (
    <DarkContainer>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header/>
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
        
        {/* Layout horizontal: QR a la izquierda, datos a la derecha */}
        <Grid container item spacing={3}>
          {/* QR Scanner Box - Lado izquierdo */}
          <Grid item xs={12} md={5} lg={4}>
            <QRCodeBox onClick={!scanning && !loading ? startScanner : undefined}>
              <video 
                ref={videoRef as React.RefObject<HTMLVideoElement>} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: scanning ? 'block' : 'none', 
                }} 
                autoPlay 
                playsInline
                muted
              />
              
              {loading ? (
                // Loading state
                <Box display="flex" flexDirection="column" alignItems="center">
                  <CircularProgress sx={{ color: '#ff7b00' }} />
                  <Typography variant="body2" color="#fff" mt={2}>
                    Solicitando acceso a la cámara...
                  </Typography>
                </Box>
              ) : scanning ? (
                // Active scanning state
                <VideoContainer>
                  <ScannerOverlay>
                    <QrCodeScannerIcon sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 40 }} />
                  </ScannerOverlay>
                  <OverlayControls>
                    <StopButton size="small" onClick={(e) => {
                      e.stopPropagation();
                      stopScanner();
                    }}>
                      <CloseIcon fontSize="small" />
                    </StopButton>
                  </OverlayControls>
                </VideoContainer>
              ) : permissionDenied ? (
                // Permission denied state
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
                      // Reinicia todos los estados para intentar nuevamente
                      setPermissionDenied(false);
                      setError(null);
                      setTimeout(() => startScanner(), 100);
                    }}
                  >
                    Reintentar
                  </Button>
                </PermissionMessage>
              ) : error ? (
                // Error state
                <PermissionMessage>
                  <Typography variant="body2" color="#ff7b00" mb={1}>
                    Error
                  </Typography>
                  <Typography variant="caption" color="#aaa" mb={2}>
                    {error}
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
                      // Reinicia todos los estados para intentar nuevamente
                      setError(null);
                      setTimeout(() => startScanner(), 100);
                    }}
                  >
                    Reintentar
                  </Button>
                </PermissionMessage>
              ) : (
                // Default state - QR icon
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
            {!scanning && !loading && !permissionDenied && !error && (
              <Typography textAlign="center" variant="body2" color="#999" mt={2}>
                Haz clic en el código QR para escanear
              </Typography>
            )}
          </Grid>
          
          {/* Información del usuario - Lado derecho */}
          <Grid item xs={12} md={7} lg={8}>
            <UserProfile userData={userData || defaultUserData} />
          </Grid>
        </Grid>
      </Grid>
    </DarkContainer>
  );
};

export default QR;