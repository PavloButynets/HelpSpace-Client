import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "~/design-system/components/icon-button/IconButton";

const useInputVisibility = (inputError: string) => {
  const [showInputText, setShowInputText] = useState(false);

  const iconColor = inputError ? "error" : "secondary";

  const inputVisibility = {
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle input visibility"
          onClick={() => setShowInputText(!showInputText)}
        >
          {showInputText ? (
            <Visibility color={iconColor} />
          ) : (
            <VisibilityOff color={iconColor} />
          )}
        </IconButton>
      </InputAdornment>
    ),
  };

  return { inputVisibility, showInputText };
};

export default useInputVisibility;
