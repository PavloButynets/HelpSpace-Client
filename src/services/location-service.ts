import {createUrlPath} from "~/utils/helper-functions";
import {URLs} from "~/constants/request";
import {baseService} from "~/services/base-service";
export const LocationService = {
    getCities: (query: string, countryCode: string) => {
        const url = createUrlPath(URLs.location.getCities, null, {query, countryCode});
        return baseService.get<string[]>(url);
    }
}