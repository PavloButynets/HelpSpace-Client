export const authRoutes = {
  chat: { route: "chat", path: "/chat" },
  userProfile: { route: "user/:id", path: "/user" },
  myProfile: { route: "my-profile", path: "/my-profile" },
  accountMenu: {
    admin: {
      myProfile: { route: "my-profile", path: "/my-profile" },
      logout: { route: "logout", path: "/logout" },
    },
    user: {
      myProfile: { route: "my-profile", path: "/my-profile" },
      myRequests: {
        route: "my-requests",
        path: "/my-requests",
      },
      logout: { route: "logout", path: "/logout" },
    },
    logout: { route: "logout", path: "/logout" },
  },
  editProfile: {
    route: "my-profile/edit",
    path: "/my-profile/edit",
  },
};
