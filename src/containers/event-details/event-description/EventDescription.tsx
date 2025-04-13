import React from 'react';
import { Box, Typography } from '@mui/material';
export const styles = {
    descriptionContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginTop: '2rem',
      marginBottom: '1rem',
      '&:first-of-type': {
        marginTop: 0,
      },
    },
    descriptionText: {
      lineHeight: 1.6,
      color: '#333',
      marginBottom: '1.5rem',
      '& p': {
        marginBottom: '1rem',
      },
    },
  };
interface EventDescriptionProps {
  description: string;
}

const EventDescription: React.FC<EventDescriptionProps> = ({
  description,
}) => {
  return (
    <Box sx={styles.descriptionContainer}>
      <Typography sx={styles.sectionTitle} variant="h3">Опис події</Typography>
      <Box sx={styles.descriptionText} dangerouslySetInnerHTML={{ __html: description }} />

    </Box>
  );
};

export default EventDescription;