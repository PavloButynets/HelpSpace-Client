import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
export const styles = {
    participantsContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    participantsTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '0.75rem',
    },
    participantsCount: {
      color: '#666',
      marginBottom: '1rem',
    },
    participantsAvatars: {
      display: 'flex',
      marginBottom: '1.5rem',
    },
    participantAvatar: {
      width: '40px',
      height: '40px',
      border: '2px solid white',
      marginRight: '-15px',
      '&:last-child': {
        marginRight: 0,
      },
    },
    participantAvatarCount: {
      width: '40px',
      height: '40px',
      backgroundColor: '#3498db',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      border: '2px solid white',
    },
    viewAllButton: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      fontWeight: 500,
      padding: 0,
      cursor: 'pointer',
      fontSize: '0.9rem',
      textTransform: 'none',
      '&:hover': {
        textDecoration: 'underline',
        background: 'none',
      },
    },
  };
interface EventParticipantsProps {
  count: number;
}

const EventParticipants: React.FC<EventParticipantsProps> = ({ count }) => {
  const mockAvatars = Array(Math.min(count, 10)).fill(null).map((_, i) => (
    `https://i.pravatar.cc/150?img=${i + 10}`
  ));
  
  return (
    <Box sx={styles.participantsContainer}>
      <Typography sx={styles.participantsTitle} variant="h3">Волонтери</Typography>
      
      <Typography sx={styles.participantsCount}>
        {count} {count === 1 ? 'волонтер' : 
                count > 1 && count < 5 ? 'волонтери' : 'волонтерів'}
      </Typography>
      
      <Box sx={styles.participantsAvatars}>
        {mockAvatars.map((avatar, index) => (
          <Avatar 
            key={`participant-${index}`}
            src={avatar} 
            alt="Volunteer" 
            sx={{
              ...styles.participantAvatar,
              zIndex: mockAvatars.length - index,
            }}
          />
        ))}
        
        {count > 5 && (
          <Avatar sx={styles.participantAvatarCount}>
            +{count - 5}
          </Avatar>
        )}
      </Box>
      
      {count > 0 && (
        <Button sx={styles.viewAllButton}>
          Показати всіх волонтерів
        </Button>
      )}
    </Box>
  );
};

export default EventParticipants;