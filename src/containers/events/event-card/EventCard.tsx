import {FC} from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import UserProfileInfo from '~/components/user-profile-info/UserProfileInfo'
import EventDetails from '~/containers/events/event-card/event-details/EventDetails'
import EventCardActions from '~/containers/events/event-card/event-actions/EventCardActions'
import {styles} from '~/containers/events/event-card/EventCard.styles'
import {Event} from '~/types'
import {useTranslation} from "react-i18next";
import defaultEventImage from '~/assets/img/default-event-image.png'

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
        id,
        title,
        description,
        city,
        creator,
        categories
    } = event
    const {t} = useTranslation()

    return (
        <Box sx={styles.wrapper}>
            <Box
                alt={title}
                component="img"
                src={event.coverImage || defaultEventImage}
                sx={styles.eventPhoto}
            />
            <Box sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                maxWidth: '70%',
                justifyContent: 'flex-end',
            }}
            >
                {categories.map((category, index) => (
                    <Chip
                        color={category.color}
                        key={index}
                        label={t(`event.categories.${category.name}`)}
                        size="small"
                        sx={{
                            fontWeight: 'medium',
                            textTransform: 'capitalize',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                    />
                ))}
            </Box>
            <Box sx={styles.content}>
                <EventDetails
                    description={!isHideField ? description : ''}
                    endDate={event.endDate}
                    location={city}
                    startDate={event.startDate}
                    title={title}
                />

                <Box sx={styles.userInfo.root}>
                    <UserProfileInfo
                        avatarPosition={'left'}
                        firstName={creator.firstName}
                        id={creator.id}
                        lastName={creator.lastName}
                        photo={creator.photo}
                        sx={styles.userInfo}
                    />
                </Box>

                <EventCardActions
                    id={id}
                    isBookmarked={isBookmarked}
                    onBookmarkClick={onBookmarkClick}
                />
            </Box>
        </Box>
    )
}

export default EventCard
