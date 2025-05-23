import { spec } from 'node:test/reporters'
import { guestRoutes } from '~/router/constants/guestRoutes'

export const userRoutes = {
  navBar: {
    homePage: { route: 'homePage', path: guestRoutes.home.path },
    eventsPage: { route: 'volunteer-events', path: '/volunteer-events' },
    needHelpPage: { route: 'need-help', path: '/need-help' }
  },
  events: {
    eventDetails: { route: 'event-details/:id', path: '/event-details' },
    myEvents: { route: 'my-events', path: '/my-events' }
  },
  userProfilePage: { route: 'user/:id', path: '/user-profile' },
  chats: { route: 'chat', path: '/chat' },
  chat: {
    route: 'chat/:id',
    path: '/chat/:id'
  }
}
