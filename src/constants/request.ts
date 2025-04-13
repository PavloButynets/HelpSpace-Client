export const URLs = {
  auth: {
    login: "/auth/login",
    googleAuth: "/auth/google-auth",
    signup: "/auth/signup",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    confirm: "/auth/confirm-email",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
  },
  users: {
    get: "/users",
    getUserById: "/users/:id",
    update: "/users",
    delete: "/users/delete",
    activate: "/users/activate",
    myProfile: "/users/myProfile",
  },
  events: {
    get: "/events",
    getEventById: "/events/:id",
    getEventCategories: "/events/categories",
    create: "/events/create",
  },
  location: {
    getCities: "/location/cities",
  },
} as const;
