import {lazy} from "react";
import {
    Route,
    Navigate,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import App from "~/App";
import AppContent from "~/containers/app-content/AppContent";
import {guestRoutes} from "~/router/constants/guestRoutes";
//import { authRouter } from '~/router/routes/authRouter'
//import { errorRoutes } from '~/router/constants/errorRoutes'

import {home} from "~/router/constants/crumbs";
import {guestRouter} from "~/router/routes/guestRouter";
import {authRoutes} from "~/router/constants/authRoutes";
import {userRouter} from "~/router/routes/userRouter";

const HomeRoute = lazy(() => import("~/router/helpers/HomeRoute"));
const Logout = lazy(() => import("~/pages/logout/Logout"));

export const routerConfig = (
    <Route element={<App/>} path={guestRoutes.home.route}>
        <Route element={<AppContent/>} handle={{crumb: home}}>
            {guestRouter}
            <Route element={<HomeRoute/>} path={guestRoutes.welcome.route}/>
            {userRouter}
            <Route element={<Logout/>} path={authRoutes.accountMenu.logout.route}/>
        </Route>
    </Route>
);

export const router = createBrowserRouter(
    createRoutesFromElements(routerConfig),
);
