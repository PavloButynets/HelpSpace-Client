import {EventCategory} from "~/types";

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
    page?: number;
    limit?: number;
    search?: string;
    category?: string | string[];
    startDate?: string;
    endDate?: string;
    location?: string;
    status?: string;
  }

  export interface EventFormData {
    title: string;
      city: string;
    address: string;
    startDate: Date | null;
    endDate: Date | null;
    categories: EventCategory[];
    volunteerSlots: string;
    registrationDeadline: Date | null;
    description: string;
    imageFile: File | null;
  }