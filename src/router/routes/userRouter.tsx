import {lazy} from "react";
import {Route} from "react-router-dom";
import PrivateRoute from "~/router/helpers/PrivateRoute";
import {UserRoleEnum} from "~/types";
import {userRoutes} from "~/router/constants/userRoutes";
import {eventDetails, eventsPage, needHelpPage} from "~/router/constants/crumbs";

//const VolunteerEvents = lazy(() => import('~/pages/volunteer-events/VolunteerEvents'))
import VolunteerEvents from "~/pages/volunteer-events/VolunteerEvents";
const NeedHelp = lazy(() => import('~/pages/need-help/NeedHelp'))
const EventDetails = lazy(() => import('~/pages/event-details/EventDetails'))
const UserProfile = lazy(() => import('~/pages/user-profile/UserProfile'))
const MyEvents = lazy(() => import('~/pages/my-events/MyEvents'))
export const userRouter = (
    <Route
        element={<PrivateRoute role={[UserRoleEnum.Admin, UserRoleEnum.Moderator, UserRoleEnum.User]}/>}
    >
        <Route
            element={<VolunteerEvents/>}
            handle={{crumb: eventsPage }}
            path={userRoutes.navBar.eventsPage.route}
        />

        <Route
            element={<NeedHelp />}
            handle={{crumb: needHelpPage}}
            path={userRoutes.navBar.needHelpPage.route}
        />
        <Route
            element={<EventDetails/>}
            handle={{crumb: [eventsPage, eventDetails]}}
            path={userRoutes.events.eventDetails.route}
        />
        <Route
            element={<UserProfile />}
            path={userRoutes.userProfilePage.route}
        />
        <Route
        element={<MyEvents/>}
        path={userRoutes.events.myEvents.route}
        />
    </Route>
)