import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import TurnedInNot from '@mui/icons-material/TurnedInNot'
import TurnedIn from '@mui/icons-material/TurnedIn'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import Button from '~scss-components/button/Button'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import TitleWithDescripiton from '~/components/title-with-description/TitleWithDescription'

import { Event } from '~/containers/event-card/EventCard'
import { styles } from '~/containers/event-card-square/EventCardSquare.styles'
import {Link} from "react-router-dom";
import {userRoutes} from "~/router/constants/userRoutes";

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
    _id,
    price,
    author,
    title,
    location
  } = event


  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardContent}>
        <UserProfileInfo
          _id={author._id}
          firstName={author.firstName}
          lastName={author.lastName}
          photo={author.photo}
          sx={styles.userInfo}
        />
        <Typography sx={styles.description}>{title}</Typography>
        <Divider />
        {onBookmarkClick && (
          <IconButton
            data-testid='bookmark-icon'
            onClick={() => onBookmarkClick(_id)}
            sx={styles.iconButton}
          >
            {isBookmarked ? <TurnedIn /> : <TurnedInNot />}
          </IconButton>
        )}
      </Box>
      <Box sx={styles.cardContent}>
        <Box sx={styles.buttonContainer}>
            <Button
                key={t('common.labels.viewDetails')}
                component={Link}
                fullWidth={true}
                size={'md'}
                variant={'tonal'}
                to={userRoutes.navBar.homePage.route}
            >
                {t('common.labels.viewDetails')}
            </Button>
            <Button
                key={t('common.labels.sendMessage')}
                fullWidth={true}
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
