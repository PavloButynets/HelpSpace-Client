import { EventCategory } from '~/types'
import { EventAssignmentStatus } from '../common/enums/common.enums'
export interface EventFilters {
  sort: string
  city: string
  eventDate: string
  showCompleted: boolean
  categories: string[]
  search: string
  page: string | number
}
export interface EventsQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string | string[]
  startDate?: string
  endDate?: string
  location?: string
  status?: string
}

export interface EventFormData {
  title: string
  city: string
  address: string
  startDate: Date | null
  endDate: Date | null
  categories: EventCategory[]
  volunteerSlots: string
  registrationDeadline: Date | null
  description: string
  imageFile: File | null
}

export interface EventAssignment {
  id: number
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
  event: Event
  status: EventAssignmentStatus
  hoursWorked: number
  stars?: number
  feedback?: string
  joinedAt: string
}
