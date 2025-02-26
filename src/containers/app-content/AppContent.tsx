import Box from '@mui/material/Box'

import AppHeader from '~/containers/header/AppHeader'
import {styles} from '~/containers/app-content/AppContent.styles'
import AppSnackbar from "~/containers/app-snackbar/AppSnackbar";

const AppContent = () => {
    return (
        <Box data-testid='AppContent' sx={styles.root}>
            <AppSnackbar/>
            <AppHeader/>
        </Box>
    )
}

export default AppContent
