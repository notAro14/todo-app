// react
import React from 'react'
// router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom'
// material-ui
import { CssBaseline, Grid } from '@material-ui/core'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
// views
import { Homepage } from './views/Homepage'
import { SignUp } from './views/SignUp'
import { SignIn } from './views/SignIn'
// firebase
import { auth } from './firebase/index'
// context
import { UserContext } from './context/index'

function NotFound() {
  return <h1>404 Page</h1>
}

export default function App() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm'>
        <UserContext.Provider value={user}>
          <Router>
            <Grid
              style={{ paddingTop: '1.5rem', marginBottom: '1.5rem' }}
              container
              spacing={4}
              direction='row'
              alignItems='center'
              justify='center'
            >
              <Grid item>
                <Link component={RouterLink} to='/todo-app'>
                  Homepage
                </Link>
              </Grid>
              {user ? (
                <Grid item>
                  <Link
                    component='button'
                    color='error'
                    onClick={() => auth.signOut().then(() => setUser(null))}
                  >
                    Sign out
                  </Link>
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <Link component={RouterLink} to='/signup'>
                      Sign up
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to='/signin'>
                      Sign in
                    </Link>
                  </Grid>
                </>
              )}
            </Grid>
            <Switch>
              <Route exact path='/todo-app' component={Homepage} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </Container>
    </>
  )
}
