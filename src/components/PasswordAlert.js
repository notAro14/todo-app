import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => {
  return {
    alert: {
      alignSelf: "flex-start",
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(2),
    },
    weak: {
      color: theme.palette.error.main,
    },
    good: {
      color: theme.palette.warning.main,
    },
    strong: {
      color: theme.palette.success.main,
    },
  };
});

export function PasswordAlert({ passwordStrength }) {
  const classes = useStyles();
  let qualifier = "";
  let style;
  switch (passwordStrength) {
    case 0:
    case 1:
    case 2:
      qualifier = "Weak";
      style = classes.weak;
      break;
    case 3:
      qualifier = "Good";
      style = classes.good;
      break;
    default:
      qualifier = "Strong";
      style = classes.strong;
      break;
  }
  return (
    <div role="alert" className={classes.alert}>
      <Typography component="p" variant="caption" className={style}>
        {`${qualifier} password`}
      </Typography>
    </div>
  );
}
