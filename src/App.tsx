import {Outlet} from 'react-router-dom'
import {StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import PopupsProvider from "~/PopupsProvider";
import QueryProvider from "~/QueryProvider";
import {theme} from "~/styles/app-theme/custom-mui.styles";

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <QueryProvider>
                    <PopupsProvider>
                        <Outlet/>
                    </PopupsProvider>
                </QueryProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}
export default App
