import React, { useState, useEffect, FormEvent } from "react";
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
  FormHelperText
} from "@mui/material";
import { styled } from '@mui/material/styles';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import img from 'assets/joven con barra z.avif';
import { useNavigate } from "react-router-dom";

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

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'transparent',
    borderRadius: 4,
    '& fieldset': {
      borderColor: error ? '#f44336' : '#ff7b00',
      borderWidth: '1px',
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
  marginBottom: '8px',
}));

const ErrorText = styled(FormHelperText)({
  color: '#f44336',
  marginLeft: '12px',
  marginBottom: '12px',
});

const OrangeButton = styled(Button)(({ theme, disabled }) => ({
  backgroundColor: disabled ? '#6b6b6b' : '#ff7b00',
  color: '#fff',
  '&:hover': {
    backgroundColor: disabled ? '#6b6b6b' : '#e67000',
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

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Estado para validaciones
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formValid, setFormValid] = useState<boolean>(false);
  
  // Validar email
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "El correo es obligatorio";
    } else if (!emailRegex.test(email)) {
      return "Ingresa un correo electrónico válido";
    }
    return "";
  };
  
  // Validar contraseña
  const validatePassword = (password: string): string => {
    if (!password) {
      return "La contraseña es obligatoria";
    } else if (password.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres";
    } else if (!/(?=.*[A-Z])/.test(password)) {
      return "La contraseña debe contener al menos una mayúscula";
    } else if (!/(?=.*[0-9])/.test(password)) {
      return "La contraseña debe contener al menos un número";
    }
    return "";
  };
  
  // Validar confirmación de contraseña
  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) {
      return "Confirma tu contraseña";
    } else if (confirmPassword !== password) {
      return "Las contraseñas no coinciden";
    }
    return "";
  };
  
  // Validar el formulario
  useEffect(() => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword, password);
    
    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });
    
    setFormValid(!emailError && !passwordError && !confirmPasswordError);
  }, [email, password, confirmPassword]);
  
  // Manejar envío del formulario
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formValid) {
      // Aquí va la lógica para enviar el formulario
      console.log("Formulario válido:", { email, password });
      // navigate("/login"); // Redirigir después del registro exitoso
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
      
      {/* Right section - Registration form */}
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
              mb: { xs: 3, md: 5 }, 
              color: 'white', 
              fontWeight: 'bold', 
              textAlign: 'center',
              width: '100%'
            }}
          >
            Registrarse
          </Typography>
          
          <form onSubmit={handleSubmit} noValidate>
            <Typography variant="body1" sx={{ mb: 1, color: '#ff7b00' }}>
              Correo
            </Typography>
            <StyledTextField 
              fullWidth
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setErrors({...errors, email: validateEmail(email)})}
              error={!!errors.email}
              InputProps={{
                sx: { color: 'white' }
              }}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
            
            <Typography variant="body1" sx={{ mb: 1, color: '#ff7b00' }}>
              Contraseña
            </Typography>
            <StyledTextField 
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setErrors({...errors, password: validatePassword(password)})}
              error={!!errors.password}
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
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
            
            <Typography variant="body1" sx={{ mb: 1, color: '#ff7b00' }}>
              Confirmar contraseña
            </Typography>
            <StyledTextField 
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña nuevamente"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => setErrors({...errors, confirmPassword: validateConfirmPassword(confirmPassword, password)})}
              error={!!errors.confirmPassword}
              InputProps={{
                sx: { color: 'white' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      sx={{ color: '#ff7b00' }}
                    >
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
            
            <Box sx={{ mt: { xs: 3, md: 4 }, mb: { xs: 4, md: 6 } }}>
              <OrangeButton 
                type="submit" 
                disabled={!formValid}
              >
                Registrarse
              </OrangeButton>
            </Box>
          </form>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'white', 
                display: { xs: 'block', sm: 'inline' },
                mb: { xs: 1, sm: 0 }
              }}
            >
              ¿Ya tienes cuenta?
            </Typography>
            <OrangeLink 
              variant="body1" 
              sx={{ 
                ml: { xs: 0, sm: 1 }, 
                display: { xs: 'block', sm: 'inline' } 
              }} 
              onClick={() => navigate("/login")}
            >
              Inicia sesión acá
            </OrangeLink>
          </Box>
        </Container>
      </Box>
    </StyledPaper>
  );
};

export default Register;