import {lazy} from "react";
import {Route} from "react-router-dom";
import PrivateRoute from "~/router/helpers/PrivateRoute";
import {UserRoleEnum} from "~/types";
import {userRoutes} from "~/router/constants/userRoutes";
import {eventsPage, needHelpPage} from "~/router/constants/crumbs";

const VolunteerEvents = lazy(() => import('~/pages/volunteer-events/VolunteerEvents'))
const NeedHelp = lazy(() => import('~/pages/need-help/NeedHelp'))
export const userRouter = (
    <Route
        element={<PrivateRoute role={[UserRoleEnum.Admin, UserRoleEnum.Moderator, UserRoleEnum.User]}/>}
    >
        <Route
            element={<VolunteerEvents/>}
            path={userRoutes.navBar.eventsPage.route}
            handle={{crumb: eventsPage }}
        />

        <Route
            element={<NeedHelp />}
            path={userRoutes.navBar.needHelpPage.route}
            handle={{crumb: needHelpPage}}
        />
    </Route>
)