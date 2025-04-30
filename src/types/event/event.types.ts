import { CommonEntityFields } from '~/types'
import { EventAssignmentStatus } from '~/types/common/common.index'
export type UpdateFiltersInQuery<T> = (filtersToUpdate: Partial<T>) => void
export type EventCategory = {
  id: string
  name: string
  color:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
    | 'default'
  description: string
}

export enum EventStatus {
  NEW = 'NEW',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED'
}
export interface Event extends CommonEntityFields {
  comment: string
  rating: number
  title: string
  description: string
  address: string
  city: string
  status: EventStatus
  volunteerSlots: number
  participantsCount: number
  registrationDeadline: string
  creator: {
    id: string
    photo?: string
    firstName: string
    lastName: string
    email: string
  }
  applicationStatus?: EventAssignmentStatus

  hoursWorked?: number
  stars?: number
  feedback?: string
  joinedAt?: string
  startDate: string
  endDate: string
  coverImage?: string
  categories: EventCategory[]
}
