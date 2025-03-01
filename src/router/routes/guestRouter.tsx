import { lazy } from "react";
import { Route } from "react-router-dom";

import { guestRoutes } from "~/router/constants/guestRoutes";
import GuestHomePage from "~/pages/guest-home/GuestHome";

const GuestHome = lazy(() => import("~/pages/guest-home/GuestHome"));

export const guestRouter = (
  <Route
element={<GuestHome />} path={guestRoutes.home.route}
  />
);
