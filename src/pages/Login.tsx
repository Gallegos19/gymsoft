import React, { useState } from "react";
import { 
  Typography, 
  Box, 
  Paper, 
  Button,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  useTheme,
  Container,
  Alert
} from "@mui/material";
import { styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import img from 'assets/mas-fuerte-joven-atleta-caucasico-muscular-practicando.avif';
import { useNavigate } from "react-router-dom";
import Auth from "../api/clients/Auth";

// Credenciales de prueba
const TEST_EMAIL = "gallegos@gmail.com";
const TEST_PASSWORD = "123456";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#000000',
  color: '#fff',
  minHeight: '100vh',
  borderRadius: 0,
  display: 'flex',
  overflow: 'hidden',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

// Modificando el StyledTextField para aceptar props correctamente en TypeScript
const StyledTextField = styled(TextField)<{ error?: boolean }>(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 4,
    '& fieldset': {
      borderColor: error ? '#f44336' : '#ff7b00',
      borderWidth: error ? '2px' : '1px',
    },
    '&:hover fieldset': {
      borderColor: error ? '#f44336' : '#ff7b00',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#f44336' : '#ff7b00',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px',
  },
  '& .MuiFormHelperText-root': {
    color: '#f44336',
  },
  marginBottom: '20px',
}));

const OrangeButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff7b00',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#e67000',
  },
  borderRadius: 4,
  textTransform: 'none',
  padding: '10px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
}));

const OrangeLink = styled(Typography)({
  color: '#ff7b00',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// Definiendo interfaces para ayudar con TypeScript
interface ErrorState {
  email: boolean;
  password: boolean;
}

interface ErrorMessageState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorState>({
    email: false,
    password: false,
  });
  const [errorMessages, setErrorMessages] = useState<ErrorMessageState>({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string>('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: true }));
      setErrorMessages(prev => ({ ...prev, email: 'El correo es obligatorio' }));
      return false;
    } else if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: true }));
      setErrorMessages(prev => ({ ...prev, email: 'Formato de correo inválido' }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, email: false }));
    setErrorMessages(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors(prev => ({ ...prev, password: true }));
      setErrorMessages(prev => ({ ...prev, password: 'La contraseña es obligatoria' }));
      return false;
    }
    
    setErrors(prev => ({ ...prev, password: false }));
    setErrorMessages(prev => ({ ...prev, password: '' }));
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (loginError) setLoginError('');
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (loginError) setLoginError('');
    validatePassword(newPassword);
  };

  const handleLogin = async(e: React.FormEvent) => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
        const success = await Auth.login({ email, password });
        if (success) {
            navigate("/home");
        } else {
            setLoginError("Correo electrónico o contraseña incorrectos");
        }
    }catch (error) {
        setLoginError("Ocurrió un error al iniciar sesión");
    }finally
    {
        setLoading(false);
    }

    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      navigate("/");
    } else {
      setLoginError("Correo electrónico o contraseña incorrectos");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };
  
  return (
    <StyledPaper>
      {/* Left section - Image */}
      <Box 
        sx={{ 
          width: { xs: '100%', md: '60%' },
          height: { xs: '35vh', sm: '40vh', md: 'auto' },
          position: 'relative',
          clipPath: { 
            xs: 'none', 
            md: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)' 
          },
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
            filter: 'brightness(0.8)',
          }}
        />
      </Box>
      
      {/* Right section - Login form */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          p: { xs: 3, sm: 4, md: 5 },
          width: { xs: '100%', md: '40%' },
        }}
      >
        <Container maxWidth="xs" sx={{ width: '100%' }}>
          <Typography 
            variant={isSmall ? "h5" : "h4"} 
            sx={{ 
              mb: { xs: 3, md: 4 }, 
              color: 'white', 
              fontWeight: 'bold', 
              textAlign: 'center',
              width: '100%'
            }}
          >
            Iniciar Sesión
          </Typography>
          
          {loginError && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                backgroundColor: 'rgba(211, 47, 47, 0.1)', 
                color: '#f44336',
                '& .MuiAlert-icon': {
                  color: '#f44336'
                }
              }}
            >
              {loginError}
            </Alert>
          )}
          
          <Typography variant="body1" sx={{ mb: 1, color: '#ff7b00' }}>
            Correo
          </Typography>
          <StyledTextField 
            fullWidth
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            onKeyPress={handleKeyPress}
            error={errors.email}
            helperText={errorMessages.email}
            InputProps={{
              sx: { color: 'white' }
            }}
            FormHelperTextProps={{
              sx: { marginLeft: 0, marginTop: '4px' }
            }}
          />
          
          <Typography variant="body1" sx={{ mb: 1, color: '#ff7b00' }}>
            Contraseña
          </Typography>
          <StyledTextField 
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => validatePassword(password)}
            onKeyPress={handleKeyPress}
            error={errors.password}
            helperText={errorMessages.password}
            InputProps={{
              sx: { color: 'white' },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ color: '#ff7b00' }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            FormHelperTextProps={{
              sx: { marginLeft: 0, marginTop: '4px' }
            }}
          />
          
          <Box sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 4, md: 6 } }}>
            <OrangeButton onClick={handleLogin}>
              Iniciar Sesión
            </OrangeButton>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'white', 
                display: { xs: 'block', sm: 'inline' },
                mb: { xs: 1, sm: 0 }
              }}
            >
              ¿No tienes Cuenta? 
            </Typography>
            <OrangeLink 
              variant="body1" 
              sx={{ 
                ml: { xs: 0, sm: 1 }, 
                display: { xs: 'block', sm: 'inline' } 
              }} 
              onClick={() => navigate("/register")}
            >
              Registrate acá
            </OrangeLink>
          </Box>
        </Container>
      </Box>
    </StyledPaper>
  );
};

export default Login;