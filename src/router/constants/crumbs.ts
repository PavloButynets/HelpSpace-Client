import {guestRoutes} from "~/router/constants/guestRoutes";
import {userRoutes} from "~/router/constants/userRoutes";

export const home = {
    name: "breadCrumbs.home",
    path: guestRoutes.home.route,
};

export const eventsPage = {
    name: "breadCrumbs.eventsPage",
    path: userRoutes.navBar.eventsPage.route,
}

export const needHelpPage = {
    name: "breadCrumbs.needHelp",
    path: userRoutes.navBar.needHelpPage.route,
}