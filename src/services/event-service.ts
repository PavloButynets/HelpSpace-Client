import {createUrlPath} from "~/utils/helper-functions";
import {URLs} from "~/constants/request";
import {EventCategory, EventsQueryParams, PaginatedResponse} from "~/types";
import {baseService} from "~/services/base-service";
import {Event} from "~/types";

export const EventService = {
    getAllEvents: (params?: EventsQueryParams) => {
        const url = createUrlPath(URLs.events.get, null, params);
        return baseService.get<PaginatedResponse<Event>>(url);
    },
    getEventById: (id: string) => {
        const baseUrl = URLs.events.getEventById.replace(':id', '');
        const url = createUrlPath(baseUrl, id);
        return baseService.get<Event>(url);
    },
    getEventCategories: () => {
        const url = createUrlPath(URLs.events.getEventCategories);
        return baseService.get<EventCategory[]>(url);
    },
    createEvent: (event: FormData) => {
        const url = createUrlPath(URLs.events.create);
        return baseService.post<Event>(url, event);
    },
}