import {createUrlPath} from "~/utils/helper-functions";
import {URLs} from "~/constants/request";
import {baseService} from "~/services/base-service";


export interface UserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    city: string;
    photo?: string | null;
    aboutUser?: string | null;
    totalHoursWorked: number;
    created_at: string;
    updated_at: string;
    feedbacks: Feedback[];
    eventsCreated: VolunteerEvent[];
    assignedEvents: VolunteerEvent[];
  }
  
  export interface Feedback {
    feedback: string;
    stars: number;
    joinedAt: string;
    eventId: string;
    eventTitle: string;
  }
  
  export interface VolunteerEvent {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    status: string;
    city: string;
    description: string;
    creator: {
      id: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
    categories: {
        id: string;
        name: string;
      }[];
  }
  
export interface UserFeedbackResponse {
    feedback: string;
    stars: number;
    joinedAt: string;
    eventId: string;
    eventTitle: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
      photo: string;
    };
}

  
export const UserService = {
    getUserById: (userId: string) => {
        const baseUrl = URLs.users.getUserById.replace(':id', '');
        const url = createUrlPath(baseUrl, userId);
        return baseService.get<UserResponse>(url);
    },

    getUserFeedbacks: (userId: string) => {
        const url = URLs.users.getUserFeedbacks.replace(':id', userId);
        return baseService.get<UserFeedbackResponse[]>(url);
    },
}