import { checkboxClasses } from "@mui/material/Checkbox";
import palette from "./app.pallete";

export const checkbox = {
  styleOverrides: {
    root: {
      color: palette.text.disabled,
      [`&.${checkboxClasses.checked}`]: {
        color: palette.text.secondary,
      },
    },
  },
};
