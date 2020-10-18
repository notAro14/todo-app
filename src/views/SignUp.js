import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, TextField, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import zxcvbn from "zxcvbn";
import { PasswordAlert } from "../components/PasswordAlert";

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
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

export function SignUp() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formData;

  const [passwordStrength, setPasswordStrength] = useState(0);

  function handleFormChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  useEffect(() => {
    const { score } = zxcvbn(password);
    setPasswordStrength(score);
  }, [password]);

  return (
    <>
      <Box>
        <Typography component="h1" variant="h3" color="primary" align="center">
          Sign up
        </Typography>
      </Box>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
      >
        <TextField
          variant="outlined"
          name="firstName"
          type="text"
          required
          label="First name"
          className={classes.formControl}
          autoFocus
          value={firstName}
        />
        <TextField
          variant="outlined"
          name="lastName"
          type="text"
          required
          label="Last name"
          className={classes.formControl}
          value={lastName}
        />
        <TextField
          variant="outlined"
          name="email"
          type="email"
          required
          label="E-mail address"
          className={classes.formControl}
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

        {password.length > 0 && (
          <PasswordAlert passwordStrength={passwordStrength} />
        )}

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
