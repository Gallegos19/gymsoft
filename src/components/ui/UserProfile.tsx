import React from "react";
import { 
  Typography, 
  Box, 
  Paper
} from "@mui/material";
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

// Interfaces para tipos
export interface UserData {
  name: string;
  age: string;
  membershipType: string;
  entryTime: string;
  exitTime: string;
  active: boolean;
}

interface UserProfileProps {
  userData: UserData;
}

// Estilos
const ProfileBox = styled(Paper)({
  backgroundColor: '#1e2538',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
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

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  return (
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
            <Typography color="#fff">{userData.active ? 'Activa' : 'Inactiva'}</Typography>
            {userData.active && <CheckCircleIcon sx={{ color: '#4caf50', ml: 1 }} />}
          </Box>
        </Box>
      </ProfileHeaderBox>
      
      <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <InfoRow>
            <PersonIcon />
            <Typography sx={{color: '#fff'}}>{userData.name}</Typography>
          </InfoRow>
          
          <InfoRow>
            <PersonIcon />
            <Typography sx={{color: '#fff'}}>{userData.age}</Typography>
          </InfoRow>
          
          <InfoRow>
            <CardMembershipIcon />
            <Typography sx={{color: '#fff'}}>Tipo de membresía: {userData.membershipType}</Typography>
          </InfoRow>
          
          <InfoRow>
            <AccessTimeIcon />
            <Typography sx={{color: '#fff'}}>Entrada: {userData.entryTime}</Typography>
          </InfoRow>
          
          <InfoRow sx={{ mb: 0 }}>
            <AccessTimeIcon />
            <Typography sx={{color: '#fff'}}>Salida: {userData.exitTime}</Typography>
          </InfoRow>
        </Box>
      </Box>
    </ProfileBox>
  );
};

export default UserProfile;