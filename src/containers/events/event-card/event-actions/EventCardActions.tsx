import {FC} from 'react'
import {useTranslation} from 'react-i18next'

import Box from '@mui/material/Box'
import TurnedIn from '@mui/icons-material/TurnedIn'
import TurnedInNot from '@mui/icons-material/TurnedInNot'

import {IconButton} from '~/design-system/components/icon-button/IconButton'
import Button from '~scss-components/button/Button'

import {styles} from '~/containers/events/event-card/event-actions/EventCardActions.styles'
import {Link} from "react-router-dom";
import {userRoutes} from "~/router/constants/userRoutes";
import {createUrlPath} from "~/utils/helper-functions";

interface OfferActionsProps {
    id: string
    isBookmarked: boolean
    onBookmarkClick: (id: string) => void
}


const EventCardActions: FC<OfferActionsProps> = ({
                                                 id,
                                                 isBookmarked,
                                                 onBookmarkClick,
                                             }) => {
    const {t} = useTranslation()

    return (
        <Box>
            <Box sx={styles.containerTop}>

                <IconButton
                    data-testid='iconButton'
                    onClick={() => onBookmarkClick(id)}
                    sx={styles.bookmarkButton}
                >
                    {isBookmarked ? <TurnedIn/> : <TurnedInNot/>}
                </IconButton>
            </Box>

            <Box sx={styles.buttons}>
                <Button
                    key={t('common.labels.viewDetails')}
                    component={Link}
                    variant={'primary'}
                    to={createUrlPath(userRoutes.events.eventDetails.path, id)}
                >
                    {t('common.labels.viewDetails')
                    }
                </Button>
                <Button
                    key={t('common.labels.sendMessage')}
                    variant={'tonal'}
                >
                    {t('common.labels.sendMessage')}
                </Button>

            </Box>
        </Box>
    )
}

export default EventCardActions
