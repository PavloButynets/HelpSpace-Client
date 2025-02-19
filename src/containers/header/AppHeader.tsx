import { Link } from 'react-router-dom'
//import { useAppSelector } from '~/hooks/use-redux'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const Navbar = () => {
    //const { userRole } = useAppSelector((state) => state.appMain)

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">MyApp</Typography>

                {0 ? (
                    <Button component={Link} to="/profile" color="inherit">
                        Профіль
                    </Button>
                ) : (
                    <Button component={Link} to="/login" color="inherit">
                        Вхід
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
