import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  EventAssignmentStatus,
  EventCategory,
  EventsQueryParams,
  PaginatedResponse
} from '~/types'
import { baseService } from '~/services/base-service'
import { Event as VolounteerEvent } from '~/types'
import { EventAssignment } from '~/types/event/event.interface'

export const EventService = {
  getAllEvents: (params?: EventsQueryParams) => {
    const url = createUrlPath(URLs.events.get, null, params)
    return baseService.get<PaginatedResponse<VolounteerEvent>>(url)
  },
  getEventById: (id: string) => {
    const baseUrl = URLs.events.getEventById.replace(':id', '')
    const url = createUrlPath(baseUrl, id)
    return baseService.get<VolounteerEvent>(url)
  },
  getEventCategories: () => {
    const url = createUrlPath(URLs.events.getEventCategories)
    return baseService.get<EventCategory[]>(url)
  },
  createEvent: (event: FormData) => {
    const url = createUrlPath(URLs.events.create)
    return baseService.post<Event>(url, event)
  },
  getUserJoinedEvents: () => {
    const baseUrl = URLs.events.getUserJoinedEvents.replace(':id', '')
    const url = createUrlPath(baseUrl)
    return baseService.get<VolounteerEvent[]>(url)
  },
  getUserCreatedEvents: () => {
    const baseUrl = URLs.events.getUserCreatedEvents.replace(':id', '')
    const url = createUrlPath(baseUrl)
    return baseService.get<VolounteerEvent[]>(url)
  },

  getEventApplicants: (eventId: string) => {
    const baseUrl = URLs.events.getEventApplicants.replace(':id', eventId)
    const url = createUrlPath(baseUrl)
    return baseService.get<EventAssignment[]>(url)
  },

  applyForEvent: (eventId: string) => {
    const baseUrl = URLs.events.applyForEvent.replace(':id', eventId)
    const url = createUrlPath(baseUrl)
    return baseService.post<EventAssignment>(url, {})
  },

  acceptOrRejectApplicant: (
    eventId: string,
    userId: string,
    action: EventAssignmentStatus
  ) => {
    const baseUrl = URLs.events.acceptOrRejectApplicant
      .replace(':eventId', eventId)
      .replace(':userId', userId)
    return baseService.put<EventAssignment>(baseUrl, { action: action })
  }
}
