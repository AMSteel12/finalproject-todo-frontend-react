import React, {useState, useEffect, useContext} from 'react'
import {useResource} from 'react-request-hook';
import {Form, Modal, Button} from 'react-bootstrap'
import {StateContext} from '../Contexts';

export default function Register({show, handleClose}) {

  const {dispatch} = useContext(StateContext)

  const [formData, setFormData] = useState({
    username: "",
    password: "", 
    repeatedPassword: ""
})

const [status, setStatus] = useState("")

const [user, register] = useResource((username, password) => ({
  url: 'auth/register',
  method: 'post',
  data: {username, password, 'passwordConfirmation': password}
}))


useEffect(() => {
  if (user && user.data) {
      dispatch({ type: 'REGISTER', username: user.data.username })
  }
}, [user])

useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        console.log(user)
        setStatus("Registration attempt failed.  Please try again.")
        alert("fail")
      } else {
        console.log(user)
        setStatus("Registration completed successfully. You may now login.")
        alert("success")
      }
    }
  }, [user])
  

  return (

    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={e => { e.preventDefault(); register(formData.username, formData.password); handleClose(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="register-username">User ID:</Form.Label>
          <Form.Control type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} name="register-username" id="register-username" />
          <Form.Label htmlFor="register-password">Password:</Form.Label>
          <Form.Control type="password" name="register-password" id="register-password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          <Form.Label htmlFor="register-password-repeat">Enter Password Again to Confirm:</Form.Label>
          <Form.Control type="password" name="register-password-repeat" id="register-password-repeat" value={formData.repeatedPassword} onChange={e => setFormData({ ...formData, repeatedPassword: e.target.value })} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={formData.username.length === 0 || formData.password.length === 0 || formData.password !== formData.repeatedPassword}>Submit Registration</Button>
        </Modal.Footer>
      </Form>
    </Modal>

  )
}