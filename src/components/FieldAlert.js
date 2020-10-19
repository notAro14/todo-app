import React from "react";
import { Typography } from "@material-ui/core";

export function FieldAlert({ children, ...otherProps }) {
  return (
    <div role="alert" {...otherProps}>
      <Typography component="p" variant="caption" color="error">
        {children}
      </Typography>
    </div>
  );
}
