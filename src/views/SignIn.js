// react
import React from 'react'
// router
import { Link as RouterLink, useHistory } from 'react-router-dom'
// material ui
import { Box, Typography, TextField, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// library
import { auth } from '../firebase'
// context
import { UserContext } from '../context/index'
// component
import { FieldAlert } from '../components/FieldAlert'

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

export function SignIn() {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const history = useHistory()
  const user = React.useContext(UserContext)

  React.useEffect(() => {
    if (user) history.push('/todo-app')
  })

  function handleSubmit(e) {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      const { message } = error
      setErrorMessage(message)
      console.log(error)
    })
  }

  return (
    <>
      <Box>
        <Typography component='h1' variant='h3' color='primary' align='center'>
          Sign in
        </Typography>
      </Box>
      <form className={classes.form} onSubmit={handleSubmit}>
        {errorMessage && (
          <FieldAlert className={classes.alert}>{errorMessage}</FieldAlert>
        )}
        <TextField
          autoComplete='username'
          autoFocus
          className={classes.formControl}
          label='E-mail address'
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          required
          type='email'
          value={email}
          variant='outlined'
        />

        <TextField
          autoComplete='current-password'
          className={classes.formControl}
          label='Password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          required
          type='password'
          value={password}
          variant='outlined'
        />

        <Button
          className={classes.button}
          color='primary'
          fullWidth
          type='submit'
          variant='contained'
        >
          Connect
        </Button>
        <Link variant='body2' component={RouterLink} to='/signup'>
          Don't have an account? Sign up here
        </Link>
      </form>
    </>
  )
}
