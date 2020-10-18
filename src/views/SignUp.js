import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// styles
const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  formControl: {
    margin: "1rem 0",
    width: "100%",
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

export function SignUp() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  function handleFormChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const { email, password, passwordConfirmation } = formData;
  console.log(formData);
  return (
    <>
      <Box>
        <Typography component="h1" variant="h3" color="primary" align="center">
          Sign up
        </Typography>
      </Box>
      <form className={classes.form} onChange={handleFormChange}>
        <TextField
          variant="outlined"
          name="email"
          type="email"
          required
          label="E-mail address"
          className={classes.formControl}
          autoFocus
          value={email}
        />
        <TextField
          variant="outlined"
          name="password"
          type="password"
          required
          label="Password"
          className={classes.formControl}
          value={password}
        />
        <TextField
          variant="outlined"
          name="passwordConfirmation"
          type="password"
          required
          label="Confirm Password"
          className={classes.formControl}
          value={passwordConfirmation}
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
        >
          Create account
        </Button>
        <Link variant="body2" component={RouterLink} to="/">
          Already have an account? Sign in
        </Link>
      </form>
    </>
  );
}
