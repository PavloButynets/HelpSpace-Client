import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { privacyPolicy } from '~/router/constants/crumbs'
import GuestHomePage from "~/pages/guest-home-page/GuestHome";

const GuestHome = lazy(() => import('~/pages/guest-home-page/GuestHome'))

export const guestRouter = (
    <Route
        element={<GuestHome />}
        path={guestRoutes.home.path}
    />
)
