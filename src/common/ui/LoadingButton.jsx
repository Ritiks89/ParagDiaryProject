import React from "react";
import { Button, CircularProgress } from "@mui/material";

function LoadingButton({ isLoading, children, disabled, ...props }) {
  return (
    <Button
      {...props}
      disabled={isLoading || disabled}
      style={{
        position: "relative",
        ...props.style,
      }}
    >
      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            position: "absolute",
            color: "white",
          }}
        />
      )}
      <span style={{ opacity: isLoading ? 0 : 1 }}>{children}</span>
    </Button>
  );
}

export default LoadingButton;
