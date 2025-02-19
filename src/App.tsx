import { Outlet } from 'react-router-dom'
import { StyledEngineProvider } from '@mui/material/styles'

const App = () => {
  return (
      <StyledEngineProvider injectFirst>
          <Outlet />
      </StyledEngineProvider>
  )
}
export default App
