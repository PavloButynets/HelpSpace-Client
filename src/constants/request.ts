export const URLs = {
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password'
  },
  users: {
    get: '/users',
    getUserById: '/users/:id',
    getUserFeedbacks: '/users/:id/feedbacks',
    update: '/users',
    delete: '/users/delete',
    activate: '/users/activate',
    myProfile: '/users/myProfile'
  },
  events: {
    get: '/events',
    getEventById: '/events/:id',
    getEventCategories: '/events/categories',
    create: '/events/create',
    getUserJoinedEvents: '/events/user/joined/:id',
    getUserCreatedEvents: '/events/user/created/:id',
    getEventApplicants: '/events/:id/applicants',
    applyForEvent: '/events/:id/apply',
    acceptOrRejectApplicant: '/events/:eventId/applicants/:userId/action'
  },
  location: {
    getCities: '/location/cities'
  }
} as const
