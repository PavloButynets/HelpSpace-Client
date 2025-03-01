import {FC, Fragment} from 'react'
import {useTranslation} from 'react-i18next'
import Box from '@mui/material/Box'

//import {useChatContext} from '~/context/chat-context'
import {useAppDispatch, useAppSelector} from '~/hooks/use-redux'
import useBreakpoints from '~/hooks/use-breakpoints'
import EventCardSquare from '~/containers/event-card-square/EventCardSquare'
import EventCard from '~/containers/event-card/EventCard'
import AppCard from '~/components/app-card/AppCard'

import { ErrorResponse } from '~/types'
import {styles} from '~/containers/events-container/EventContainer.styles'
import {openAlert} from '~/redux/features/snackbarSlice'
import {snackbarVariants} from '~/constants/common'
import {getErrorKey} from '~/utils/helper-functions'
//import {setField} from '~/redux/features/editProfileSlice'
//import {useToggleBookmark} from '~/utils/toggle-bookmark'
import {Event} from '~/containers/event-card/EventCard'
import {userRoutes} from "~/router/constants/userRoutes";

export type CardsView = 'grid' | 'inline'

interface OfferContainerProps {
    viewMode: CardsView
    eventCards: Event[]
    updateEventsInfo: () => void
}

const EventContainer: FC<OfferContainerProps> = ({
                                                     viewMode,
                                                     eventCards,
                                                     updateEventsInfo
                                                 }) => {
    const {t} = useTranslation()
    const {isMobile, isLaptopAndAbove} = useBreakpoints()
    //const {setChatInfo} = useChatContext()
    const {userId} = useAppSelector((state) => state.appMain)
    //const { bookmarkedOffers } = useAppSelector((state) => state.editProfile)
    const dispatch = useAppDispatch()

    const handleResponse = (response: string[]) => {
        console.log('bookmarkedOffers', response)
        // dispatch(setField({field: 'bookmarkedOffers', value: response}))
    }

    const handleResponseError = (error?: ErrorResponse) => {
        dispatch(
            openAlert({
                severity: snackbarVariants.error,
                message: getErrorKey(error)
            })
        )
    }

    // const toggleBookmark = useToggleBookmark(
    //     userId,
    //     handleResponse,
    //     handleResponseError
    // )

    const onBookmarkClick = (id: string) => {
        //void toggleBookmark(id)
        console.log('bookmark clicked')
    }

    const renderSquareCard =
        isMobile || (isLaptopAndAbove && viewMode === 'grid')

    const onClickOpenChat = (el: Event) => {
      console.log('chat is opened')
      // setChatInfo({
      //   author: el.author,
      //   authorRole: el.authorRole,
      //   chatId: el.chatId,
      //   updateInfo: updateOffersInfo
      // })
    }

    const offerItems = eventCards.map((el: Event) => {
        // const isBookmarked = bookmarkedOffers.includes(el._id)
        const isBookmarked = false

        return (
            <Fragment key={el._id}>
                {renderSquareCard ? (
                    <AppCard sx={styles.appCardSquare}>
                        <EventCardSquare
                            isBookmarked={isBookmarked}
                            event={el}
                            onBookmarkClick={onBookmarkClick}
                        />
                    </AppCard>
                ) : (
                    <AppCard sx={styles.appCard}>
                        <EventCard
                            isBookmarked={isBookmarked}
                            event={el}
                            onBookmarkClick={onBookmarkClick}
                        />
                    </AppCard>
                )}
            </Fragment>
        )
    })

    return (
        <Box
            data-testid='EventContainer'
            sx={styles.offerContainer(viewMode === 'grid')}
        >
            {offerItems}
        </Box>
    )
}

export default EventContainer
