import { guestRoutes } from "~/router/constants/guestRoutes";

export const userRoutes = {
  navBar: {
    homePage: { route: "homePage", path: guestRoutes.home.path },
    eventsPage: { route: "volunteer-events", path: "/volunteer-events" },
    needHelpPage: { route: "need-help", path: "/need-help" },
  },
};
