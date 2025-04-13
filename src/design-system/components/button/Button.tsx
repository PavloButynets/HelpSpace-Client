import { forwardRef, ReactNode } from "react";
import {
  Button as MuiButton,
  CircularProgress,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

import { cn } from "~/utils/cn";

import "~scss-components/button/Button.scss";

const sizes = ["xs", "sm", "md", "lg"] as const;

const variants = [
  "primary",
  "tonal",
  "text-primary",
  "text-secondary",
  "tonal-success",
  "tonal-error",
] as const;

type BaseButtonProps = {
  loading?: boolean;
  size?: (typeof sizes)[number];
  variant?: (typeof variants)[number];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  to?: string;
};

export type ButtonProps = BaseButtonProps &
  Omit<MuiButtonProps, keyof BaseButtonProps>;

type Ref = MuiButtonProps["ref"];

const Button = forwardRef(
  (
    {
      size = "md",
      variant = "primary",
      className,
      disabled,
      loading,
      startIcon,
      endIcon,
      children,
      ...props
    }: ButtonProps,
    forwardedRef: Ref,
  ) => {
    const loader = (
      <CircularProgress
color="inherit" data-testid="loader" size={25} />
    );
    const isDisabled = disabled || loading;

    const content = (
      <>
        {startIcon}
        <span className="help-space-label">{children}</span>
        {endIcon}
      </>
    );

    return (
      <MuiButton
        className={cn(
          "help-space-btn",
          `help-space-btn-${size}`,
          `help-space-btn-${variant}`,
          isDisabled && "help-space-btn-disabled",
          className,
        )}
        disabled={isDisabled}
        ref={forwardedRef}
        variant="base"
        {...props}
      >
        {loading ? (
          <>
            <span className="help-space-btn-hidden-content">{content}</span>
            <span className="help-space-btn-loader">{loader}</span>
          </>
        ) : (
          content
        )}
      </MuiButton>
    );
  },
);
Button.displayName = "Button";

export default Button;
