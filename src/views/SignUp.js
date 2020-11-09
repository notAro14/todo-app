// react
import React from 'react'
// router
import { Link as RouterLink, useHistory } from 'react-router-dom'
// material ui
import { Box, Typography, TextField, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// components
import { PasswordAlert } from '../components/PasswordAlert'
import { FieldAlert } from '../components/FieldAlert'
// hooks
import { usePasswordValidation } from '../hooks/usePasswordValidation'
import { useFormFieldValidation } from '../hooks/useFormFieldValidation'
import { validateFullname } from '../utils/index'
import { useDialogAlert } from '../hooks/useDialogAlert'
// library
import * as isemail from 'isemail'
// firebase
import { auth } from '../firebase'
// context
import { UserContext } from '../context/index'

// styles
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(1),
    marginTop: theme.spacing(4),
  },
  formControl: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginTop: theme.spacing(-2),
    marginBottom: theme.spacing(2),
    alignSelf: 'flex-start',
  },
}))

export function SignUp() {
  const classes = useStyles()
  const [password, setPassword, score] = usePasswordValidation()
  const [fullname, setFullname, isFullnameValid] = useFormFieldValidation(
    validateFullname
  )
  const [email, setEmail, isEmailValid] = useFormFieldValidation(
    isemail.validate
  )
  const [openDialog, DialogAlert] = useDialogAlert()

  const history = useHistory()
  const user = React.useContext(UserContext)
  React.useEffect(() => {
    if (user) history.push('/todo-app')
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!isFullnameValid || !isEmailValid || score < 3) {
      openDialog()
      return
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        const { code, message } = error
        if (code === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(message)
        }
        console.log(error)
      })
  }

  return (
    <>
      <DialogAlert
        dialogContent='Some fields are invalid'
        buttonLabel='Close'
      />
      <Box>
        <Typography component='h1' variant='h3' color='primary' align='center'>
          Sign up
        </Typography>
      </Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant='outlined'
          name='fullname'
          type='text'
          required
          label='Fullname'
          className={classes.formControl}
          autoFocus
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        {fullname.length > 0 && !isFullnameValid ? (
          <FieldAlert className={classes.alert}>Fullname is invalid</FieldAlert>
        ) : null}
        <TextField
          variant='outlined'
          autoComplete='username'
          name='email'
          type='email'
          required
          label='E-mail address'
          className={classes.formControl}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {email.length > 0 && !isEmailValid ? (
          <FieldAlert className={classes.alert}>Email is invalid</FieldAlert>
        ) : null}

        <TextField
          autoComplete='current-password'
          variant='outlined'
          name='password'
          type='password'
          required
          label='Password'
          className={classes.formControl}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {password.length > 0 && <PasswordAlert passwordStrength={score} />}

        <Button
          className={classes.button}
          type='submit'
          variant='contained'
          fullWidth
          color='primary'
        >
          Create account
        </Button>
        <Link variant='body2' component={RouterLink} to='/signin'>
          Already have an account? Sign in
        </Link>
      </form>
    </>
  )
}
