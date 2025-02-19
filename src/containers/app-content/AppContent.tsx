import Box from '@mui/material/Box'

import AppHeader from '~/containers/header/AppHeader'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppContent = () => {
  return (
    <Box data-testid='AppContent' sx={styles.root}>
      <AppHeader />
    </Box>
  )
}

export default AppContent
