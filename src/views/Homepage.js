// react
import React from 'react'
// router
import { useHistory } from 'react-router-dom'
// components
import { TodoList } from '../components/TodoList'
// material ui
import { Typography, Box } from '@material-ui/core'
// context
import { UserContext } from '../context/index'

export function Homepage() {
  const history = useHistory()

  const user = React.useContext(UserContext)

  React.useEffect(() => {
    if (user === null) history.push('/signin')
  })

  return (
    <>
      <Box component='div'>
        <Typography component='h1' variant='h3' color='primary' align='center'>
          Todoism
        </Typography>
      </Box>
      <TodoList />
    </>
  )
}
