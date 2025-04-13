import {Crumbfunc, UpdateFiltersInQuery, UserRole} from "~/types";
import { Params } from "react-router-dom";
import {ButtonProps} from "@mui/material";

export interface LocalStorage {
  "emoji-mart.last"?: string;
  language?: string;
  activation?: string;
  cookieConsent?: boolean;
}
export interface ErrorResponse {
  code: string;
  message: string;
  status: number;
}

export interface AccessToken {
  id: string;
  isFirstLogin: boolean;
  role: UserRole;
}

export interface ItemsWithCount<T> {
  count: number;
  items: T[];
}
export interface CommonEntityFields {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryAppearance {
  icon: string;
  color: string;
}

export interface Faq {
  id?: string;
  question: string;
  answer: string;
}
export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null;
}

export interface Breakpoints {
  isDesktop: boolean;
  isLaptopAndAbove: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}
export interface RouteItem {
  route: string;
  path: string;
}

export interface AddDocuments {
  maxFileSize: number;
  maxAllFilesSize: number;
  filesTypes: string[];
  fileSizeError: string;
  allFilesSizeError: string;
  typeError: string;
  maxQuantityFiles: number;
  quantityError: string;
  maxFileNameLength: number;
  maxFileNameError: string;
}
export interface Matches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: {
    crumb: Crumb | Crumbfunc;
  };
}
export interface Crumb {
  name: string;
  path?: string;
}

export interface ButtonActions {
  label: string
  buttonProps?: ButtonProps<'button', { to?: string }>
}

export interface FormatedDate {
  date: Date | string
  locales?: string
  options?: Intl.DateTimeFormatOptions
  isCurrentDayHours?: boolean
  includeOrdinal?: boolean
}
export interface FiltersActions<T> {
  updateFiltersInQuery: UpdateFiltersInQuery<T>
  resetFilters: () => void
  updateQueryParams: () => void
}

declare global {
  export interface File {
    src?: string;
  }
}
