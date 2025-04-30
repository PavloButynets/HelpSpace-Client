import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import TurnedIn from '@mui/icons-material/TurnedIn'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import PlaceIcon from '@mui/icons-material/Place'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

import { IconButton } from '~scss-components/icon-button/IconButton'
import Button from '~scss-components/button/Button'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'

import { Event } from '~/types'
import { styles } from '~/containers/events/event-card-square/EventCardSquare.styles'
import { Link } from "react-router-dom"
import { userRoutes } from "~/router/constants/userRoutes"
import Chip from "@mui/material/Chip"
import { getFormattedDate } from "~/utils/helper-functions"

interface OfferCardSquareProps {
  event: Event
  onBookmarkClick?: (id: string) => void
  isBookmarked: boolean
}

const EventCardSquare: FC<OfferCardSquareProps> = ({
  event,
  onBookmarkClick,
  isBookmarked
}) => {
  const { t } = useTranslation()

  const {
    id,
    creator,
    title,
    city = '',
    startDate,     
    endDate,        
    categories = []
  } = event
  
  const getDateDisplay = () => {
    if (!startDate) return null;
    
    const formattedStartDate = getFormattedDate({
      date: startDate,
      options: { day: 'numeric', month: 'long' }
    });
    
    if (!endDate) return formattedStartDate;
    
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    if (
      startDateObj.getDate() === endDateObj.getDate() &&
      startDateObj.getMonth() === endDateObj.getMonth() &&
      startDateObj.getFullYear() === endDateObj.getFullYear()
    ) {
      return formattedStartDate;
    }
    
    const formattedEndDate = getFormattedDate({
      date: endDate,
      options: { day: 'numeric', month: 'long' }
    });
    
    return `${formattedStartDate} - ${formattedEndDate}`;
  };
  
  const dateDisplay = getDateDisplay();


  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardContent}>
        <Typography sx={styles.description}>{title}</Typography>
        <Divider />
        {onBookmarkClick && (
          <IconButton
            data-testid='bookmark-icon'
            onClick={() => onBookmarkClick(id)}
            sx={styles.iconButton}
          >
            {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
          </IconButton>
        )}
      </Box>
      
      <Box sx={{ position: 'relative' }}>
        <Box
          alt={title}
          component="img"
          src={event.coverImage}
          sx={styles.eventPhoto}
        />
        
        {categories.length > 0 && (
          <Box sx={styles.categories}>
            {categories.map((category, index) => (
              <Chip
                color={category.color}
                key={index}
                label={category.name}
                size="small"
                sx={styles.categoryChip}
              />
            ))}
          </Box>
        )}
      </Box>
      
      <Box sx={styles.infoContainer}>
        {city && (
          <Box sx={styles.infoRow}>
            <PlaceIcon sx={styles.locationIcon} />
            <Typography sx={styles.locationText}>
              {city}
            </Typography>
          </Box>
        )}
        
        {dateDisplay && (
          <Box sx={styles.infoRow}>
            <CalendarTodayIcon sx={styles.calendarIcon} />
            <Typography sx={styles.dateText} variant="body2">
              {dateDisplay}
            </Typography>
          </Box>
        )}
      </Box>
      
      <UserProfileInfo
        firstName={creator.firstName}
        id={creator.id}
        lastName={creator.lastName}
        photo={creator.photo}
        sx={styles.userInfo}
      />
      
      <Box sx={styles.cardContent}>
        <Box sx={styles.buttonContainer}>
          <Button
            component={Link}
            fullWidth
            key={t('common.labels.viewDetails')}
            size={'md'}
            to={userRoutes.navBar.homePage.route}
            variant={'tonal'}
          >
            {t('common.labels.viewDetails')}
          </Button>
          <Button
            fullWidth
            key={t('common.labels.sendMessage')}
            size={'md'}
            variant={'primary'}
          >
            {t('common.labels.sendMessage')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default EventCardSquare