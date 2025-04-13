import React from 'react';
import { Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export const styles = {
    locationContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    locationTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      marginBottom: '1rem',
    },
    mapContainer: {
      height: '200px',
      width: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      marginBottom: '1rem',
    },
    mapPlaceholder: {
      backgroundColor: '#f0f0f0',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    locationAddress: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#444',
      fontSize: '0.9rem',
    },
  };
interface EventLocationProps {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const EventLocation: React.FC<EventLocationProps> = ({ address, coordinates }) => {
  // Тут має бути підключення реальної карти (Google Maps, Leaflet, etc.)
  return (
    <Box sx={styles.locationContainer}>
      <Typography sx={styles.locationTitle} variant="h3">Місце проведення</Typography>
      
      <Box sx={styles.mapContainer}>
        {/* Заглушка для карти - замініть на справжній компонент карти */}
        <Box sx={styles.mapPlaceholder}>
          <Typography>Карта: {coordinates.lat}, {coordinates.lng}</Typography>
        </Box>
      </Box>
      
      <Box sx={styles.locationAddress}>
        <LocationOnIcon sx={{ color: '#3498db' }} />
        <Typography component="span">{address}</Typography>
      </Box>
    </Box>
  );
};

export default EventLocation;