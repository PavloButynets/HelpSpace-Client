import { FC } from 'react'

import Box from '@mui/material/Box'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import OfferDetails from '~/containers/event-card/event-details/OfferDetails'
import OfferActions from '~/containers/event-card/event-actions/OfferActions'

import {ButtonActions, CommonEntityFields, LanguagesEnum} from '~/types'
import { styles } from '~/containers/event-card/EventCard.styles'

export interface Event extends CommonEntityFields {
  _id: string
  comment: string
  rating: number
  title: string
  price: number
  description: string
  location: string
  author: {
    _id: string;
    photo?: string;
    firstName: string;
    lastName: string;
  }
  category: string
}

interface EventCardProps {
  isHideField?: boolean
  event: Event
  onBookmarkClick: (id: string) => void
  isBookmarked: boolean
}

const EventCard: FC<EventCardProps> = ({
  isHideField = false,
  event,
  onBookmarkClick,
  isBookmarked
}) => {
  const {
    _id,
    title,
    description,
    location,
    author,
    category,
  } = event

  return (
    <Box sx={styles.wrapper}>
      <UserProfileInfo
        _id={author._id}
        firstName={author.firstName}
        lastName={`${author.lastName[0]}.`}
        photo={author.photo}
        sx={styles.userInfo}
      />
      <OfferDetails
        description={!isHideField ? description : ''}
        location={location}
        title={title}
      />
      <OfferActions
        id={_id}
        isBookmarked={isBookmarked}
        onBookmarkClick={onBookmarkClick}
      />
    </Box>
  )
}

export default EventCard
