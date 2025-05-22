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
    myProfile: '/users/myProfile',

    search: '/users/search',
    onlineStatus: '/users/online-status'
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
  },
  chat: {
    conversations: {
      getAll: '/conversations',
      getById: '/conversations/:id',
      createOrFind: '/conversations',
      createGroup: '/conversations/group',
      addUsers: '/conversations/group/:conversationId/users',
      leave: '/conversations/group/:conversationId/leave',
      unreadCounts: '/conversations/unread'
    },
    messages: {
      getByConversation: '/messages/conversation/:conversationId',
      send: '/messages',
      sendWithAttachments: '/messages/attachments',
      markAsRead: '/messages/read',
      delete: '/messages/:id',
      edit: '/messages/:id'
    }
  }
} as const
