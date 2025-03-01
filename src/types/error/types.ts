import { Draft } from "@reduxjs/toolkit";
import { TOptions } from "i18next/typescript/options";

export type UseFormErrors<T> = Record<keyof T, string>;

export type UseFormEventHandler<Fields, Event> = (
  key: keyof Fields,
) => (event: Event) => void;

export type ExtendedSnackbarMessage = {
  text: string;
  options: Draft<TOptions>;
};

export type SnackbarMessage = string | ExtendedSnackbarMessage;
