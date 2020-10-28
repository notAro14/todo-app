// react
import React from 'react'
// router
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
// material-ui
import { CssBaseline } from '@material-ui/core'
import Container from '@material-ui/core/Container'
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
            <ul>
              <li>
                <Link to='/'>Homepage</Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={() => auth.signOut().then(() => setUser(null))}
                  >
                    Sign out
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to='/signup'>Sign up</Link>
                  </li>
                  <li>
                    <Link to='/signin'>Sign in</Link>
                  </li>
                </>
              )}
            </ul>
            <Switch>
              <Route exact path='/' component={Homepage} />
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
