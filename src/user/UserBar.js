import React, {useContext, useState} from 'react'

import Register from './Register'
import Login from './Login'

import {StateContext} from '../Contexts'
import {Button} from 'react-bootstrap'

export default function UserBar() {

  const Logout = React.lazy(() => import('./Logout'))
  const {state} = useContext(StateContext)

  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  
  if (state.user.username) {
      return <Logout />
  } else {
      return (
        
            <div className="justify-content-end">
                <Button variant="link" onClick={(e) => setShowLogin(true)}>
                    Login
                </Button>
                <Login show={showLogin} handleClose={() => setShowLogin(false)} />
                <Button variant="link" onClick={(e) => setShowRegister(true)}>
                    Register
                </Button>
                <Register show={showRegister} handleClose={() => setShowRegister(false)} />
            </div>

      )
  }
}
