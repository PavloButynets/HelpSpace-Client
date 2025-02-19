import { lazy } from 'react'
import {
    Route,
    Navigate,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom'

import App from '~/App'
import AppContent from '~/containers/app-content/AppContent'
import { guestRoutes } from '~/router/constants/guestRoutes'
//import { authRouter } from '~/router/routes/authRouter'
//import { errorRoutes } from '~/router/constants/errorRoutes'

import { home } from '~/router/constants/crumbs'
import {guestRouter} from "~/router/routes/guestRouter";

const HomeRoute = lazy(() => import('~/router/helpers/HomeRoute'))

export const routerConfig = (
    <Route
        element={<App />}
        path={guestRoutes.home.route}
    >
        <Route element={<AppContent />} handle={{ crumb: home }}>
            <Route element={<HomeRoute />} index />
            {guestRouter}
            {/*authRouter*/}
        </Route>
    </Route>
)

export const router = createBrowserRouter(
    createRoutesFromElements(routerConfig)
)
