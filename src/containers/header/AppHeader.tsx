import {Link} from 'react-router-dom'
//import { useAppSelector } from '~/hooks/use-redux'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import {useCallback, useEffect, useLayoutEffect, useMemo} from "react";
import LoginDialog from "~/containers/auth/login-dialog/LoginDialog";
import {useModalContext} from "~/context/modal-context";
import Button from "~scss-components/button/Button";
import {styles} from "~/containers/header/AppHeader.styles";
import {useAppSelector} from "~/hooks/use-redux";
import {useDrawer} from '~/hooks/use-drawer'
import UserIcons from "~/containers/navigation-icons/user-icons/UserIcons";
import AppDrawer from "~/components/app-drawer/AppDrawer";
import Sidebar from "~/containers/sidebar/Sidebar";
import {RouteItem, UserRoleEnum} from "~/types";
import {authRoutes} from "~/router/constants/authRoutes";
import {userRoutes} from "~/router/constants/userRoutes";
import {useDispatch} from "react-redux";
import {checkAuth} from "~/redux/reducer";
import {store} from "~/redux/store";

const Navbar = () => {
    const {userRole} = useAppSelector((state) => state.appMain)
    const {openModal} = useModalContext()
    const {openDrawer, closeDrawer, isOpen} = useDrawer()
    useLayoutEffect(() => {
        store.dispatch(checkAuth());
    }, []);


    const navigationItems = useMemo(() => {
        if (userRole === UserRoleEnum.User) {
            return Object.values(userRoutes.navBar) as RouteItem[]
        } else if (userRole === UserRoleEnum.Admin) {
            return Object.values(userRoutes.navBar) as RouteItem[]
        } else {
            return [] as RouteItem[]
        }
    }, [userRole])

    const accountItems = useMemo(() => {
        if (userRole === UserRoleEnum.User || userRole === UserRoleEnum.Admin)
            return Object.values(authRoutes.accountMenu[userRole])
        return []
    }, [userRole])

    const openLoginDialog = useCallback(() => {
        openModal({component: <LoginDialog/>})
    }, [openModal])

    const handleOpenSidebar = () => {
        openDrawer()
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6">MyApp</Typography>

                {userRole ? (
                    <>
                        <UserIcons setSidebarOpen={handleOpenSidebar}/>
                        <AppDrawer onClose={closeDrawer} open={isOpen}>
                            <Sidebar
                                accountItems={accountItems}
                                navigationItems={navigationItems}
                                onClose={closeDrawer}
                            />
                        </AppDrawer>
                    </>
                ) : (
                    <Button onClick={openLoginDialog} variant={'tonal'} size='md' sx={styles.loginButton}>
                        Увійти
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
