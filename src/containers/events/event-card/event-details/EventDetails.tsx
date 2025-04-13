import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/events/event-card/event-details/OfferDetails.styles'
import PlaceIcon from "@mui/icons-material/Place";
import {getFormattedDate} from "~/utils/helper-functions";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface EventDetailsProps {
  location: string
  title: string
  description: string
  startDate?: string
  endDate?: string
}

const EventDetails: React.FC<EventDetailsProps> = ({
  location,
  title,
  description,
  startDate,
  endDate,
}) => {
  const getDateDisplay = () => {
    if (!startDate) return null;
    
    // Format start date using your utility
    const formattedStartDate = getFormattedDate({
      date: startDate,
      options: { day: 'numeric', month: 'long' }
    });
    
    // For single day events
    if (!endDate) return formattedStartDate;
    
    // Check if same date (comparing just the date part)
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    if (
      startDateObj.getDate() === endDateObj.getDate() &&
      startDateObj.getMonth() === endDateObj.getMonth() &&
      startDateObj.getFullYear() === endDateObj.getFullYear()
    ) {
      return formattedStartDate;
    }
    
    // For date ranges
    const formattedEndDate = getFormattedDate({
      date: endDate,
      options: { day: 'numeric', month: 'long' }
    });
    
    return `${formattedStartDate} - ${formattedEndDate}`;
  };
  
  const dateDisplay = getDateDisplay();

  const stripHtml = (html: string): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const plainDescription = stripHtml(description);
  const truncatedDescription = plainDescription.length > 75
      ? `${plainDescription.substring(0, 75)}...`
      : plainDescription;


  return (
    <Box sx={{ flex: 1 }}>
      <Typography color={'textPrimary'} sx={styles.title} variant='h6'>
        {title}
      </Typography>
      <Typography color={'textPrimary'} sx={styles.description} variant='body2'>
        {truncatedDescription}
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        gap: 2, 
        mt: 1,
        alignItems: { xs: 'flex-start', sm: 'center' }
      }}
      >
        <Box sx={styles.locationContainer}>
          <PlaceIcon sx={styles.locationIcon} />
          <Typography color={'textPrimary'} sx={styles.location}>{location}</Typography>
        </Box>
        
        {dateDisplay && (
          <Box sx={{
            ...styles.locationContainer,
            color: 'primary.main',
          }}
          >
            <CalendarTodayIcon sx={{
              ...styles.locationIcon,
              color: 'inherit',
              fontSize: '1rem',
            }}
            />
            <Typography sx={{
              ...styles.location,
              color: 'inherit',
              fontWeight: 500,
            }}
            >
              {dateDisplay}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default EventDetails
