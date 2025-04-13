import { FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

//import {useChatContext} from '~/context/chat-context'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import EventCardSquare from '~/containers/events/event-card-square/EventCardSquare'
import EventCard from '~/containers/events/event-card/EventCard'
import AppCard from '~/components/app-card/AppCard'

import { ErrorResponse } from '~/types'
import { styles } from '~/containers/events/events-container/EventContainer.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants/common'
import { getErrorKey } from '~/utils/helper-functions'
//import {setField} from '~/redux/features/editProfileSlice'
//import {useToggleBookmark} from '~/utils/toggle-bookmark'
import { Event } from '~/types'
import { Typography } from '@mui/material'

export type CardsView = 'grid' | 'inline'

interface OfferContainerProps {
  eventCards: Event[]
  updateEventsInfo: () => void
}

const EventContainer: FC<OfferContainerProps> = ({ eventCards }) => {
  const { t } = useTranslation()
  const { isMobile } = useBreakpoints()
  //const {setChatInfo} = useChatContext()
  //const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)
  const dispatch = useAppDispatch()

  // const handleResponseError = (error?: ErrorResponse) => {
  //     dispatch(
  //         openAlert({
  //             severity: snackbarVariants.error,
  //             message: getErrorKey(error)
  //         })
  //     )
  // }

  // const toggleBookmark = useToggleBookmark(
  //     userId,
  //     handleResponse,
  //     handleResponseError
  // )

  const onBookmarkClick = (id: string) => {
    //void toggleBookmark(id)
    console.log('bookmark clicked', id)
  }

  const onClickOpenChat = (el: Event) => {
    console.log('chat is opened', el)
    // setChatInfo({
    //   author: el.author,
    //   authorRole: el.authorRole,
    //   chatId: el.chatId,
    //   updateInfo: updateOffersInfo
    // })
  }
  const eventItems = Array.isArray(eventCards)
    ? eventCards?.map((el: Event) => {
        // const isBookmarked = bookmarkedOffers.includes(el._id)
        const isBookmarked = false

        return (
          <Fragment key={el.id}>
            {isMobile ? (
              <AppCard sx={styles.appCardSquare}>
                <EventCardSquare
                  event={el}
                  isBookmarked={isBookmarked}
                  onBookmarkClick={onBookmarkClick}
                />
              </AppCard>
            ) : (
              <AppCard sx={styles.appCard}>
                <EventCard
                  event={el}
                  isBookmarked={isBookmarked}
                  onBookmarkClick={onBookmarkClick}
                />
              </AppCard>
            )}
          </Fragment>
        )
      })
    : null

  return (
    <Box data-testid='EventContainer' sx={styles.offerContainer()}>
      {Array.isArray(eventCards) && eventCards.length > 0 ? (
        eventItems
      ) : (
        <Typography
          sx={{ textAlign: 'center', padding: '16px', color: 'gray' }}
        >
          Немає доступних подій
        </Typography>
      )}
    </Box>
  )
}

export default EventContainer
