import palette from "./app.pallete";
import { textfieldScrollbar } from "~/styles/app-theme/custom-scrollbar";

export const textField = {
  styleOverrides: {
    root: {
      ...textfieldScrollbar,
      "& label": {
        lineHeight: "inherit",
        "&.Mui-focused": {
          color: palette.text.primary,
        },
        "&.Mui-error": {
          color: '#F54636',
        },
        color: palette.text.secondary,
      },
      "& .MuiAutocomplete-inputRoot.MuiOutlinedInput-root ": {
        padding: "5px",
      },
      "& .MuiInputBase-input": {
        padding: "12.5px 14px",
        "&.MuiInputBase-inputMultiline": {
          padding: 0,
        },
        "& fieldset": {
          borderColor: palette.text.secondary,
        },
        "&.Mui-focused ": {
          "&.Mui-error fieldset": {
            borderColor: '#F54636',
          },
          "& fieldset": {
            borderColor: palette.text.primary,
          },
        },
      },
      "& .MuiInput-root:before ": {
        borderColor: palette.text.secondary,
      },
    },
  },
};
