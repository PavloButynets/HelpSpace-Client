import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/containers/events/event-card/event-details/OfferDetails.styles'
import PlaceIcon from "@mui/icons-material/Place";

interface EventDetailsProps {
  location: string
  title: string
  description: string
}

const OfferDetails: React.FC<EventDetailsProps> = ({
  location,
  title,
  description,
}) => {
  return (
    <Box sx={{ flex: 1 }}>
      <Typography sx={styles.title} variant='h6'>
        {title}
      </Typography>
      {/*<SubjectLevelChips*/}
      {/*  color={chipsColor}*/}
      {/*  proficiencyLevel={level}*/}
      {/*  subject={subject}*/}
      {/*  sx={styles.chipContainer}*/}
      {/*/>*/}
      <Typography sx={styles.description} variant='body2'>
        {description}
      </Typography>
        <Box sx={styles.locationContainer}>
            <PlaceIcon sx={styles.locationIcon} />
            <Typography sx={styles.location}>{location}</Typography>
        </Box>
    </Box>
  )
}

export default OfferDetails
