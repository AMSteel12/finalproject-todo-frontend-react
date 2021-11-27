import React, {useState, useEffect, useContext} from 'react'
import {useResource} from 'react-request-hook';
import {ThemeContext, StateContext} from '../Contexts'
import {Form, Modal, Button} from 'react-bootstrap'

export default function RegisterNewUser({show, handleClose}) {
	const {dispatch} = useContext(StateContext);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
		repeatPassword: ""
	}
	)
  
	const [status, setStatus] = useState('');

	const [userRegisterFailed, setUserRegisterFailed] = useState(false);
    
	const [user, register] = useResource((username, password, repeatPassword) => ({
	  url: '/auth/register',
	  method: 'post',
	  data: {username, password, passwordConfirmation: repeatPassword},
	}));
  
	useEffect(() => {
		if (user && user.data) {
			dispatch({type: 'REGISTER', username: user.data.username, id: user.data.id,})
		}
	  }, [user])
  

	useEffect(() => {
		if (user && user.isLoading === false && (user.data || user.error)) {
			if (user.error) {
				console.log(user)
				setStatus("Registration attempt failed.  Please try again later.");
				setUserRegisterFailed(true);
				alert("fail");
			} else {
				console.log(user)
				setStatus("Registration attempt successful. You may now log in.")
				setUserRegisterFailed(false);
				alert("success");
				handleClose();
			}
		}
	}, [user])

  
	return (
		<Modal show={show} onHide={handleClose}>
		  <Form onSubmit={evt => {evt.preventDefault(); register(formData.username, formData.password, formData.repeatPassword); }}>
			<Modal.Header closeButton>
			  <Modal.Title>Register New User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			  <Form.Label htmlFor="register-userid">User ID:</Form.Label>
			  <Form.Control type="text" value={formData.username} onChange={evt => setFormData({ ...formData, username: evt.target.value })} name="register-userid" id="register-userid" />
			  <Form.Label htmlFor="register-password">Password:</Form.Label>
			  <Form.Control type="password" name="register-password" id="register-password" value={formData.password} onChange={evt => setFormData({ ...formData, password: evt.target.value })} />
			  <Form.Label htmlFor="register-password-again">Please enter password again to confirm:</Form.Label>
			  <Form.Control type="password" name="register-password-again" id="register-password-again" value={formData.repeatPassword} onChange={evt => setFormData({ ...formData, repeatPassword: evt.target.value })} />
			</Modal.Body>
			<Modal.Footer>
			  <Button variant="secondary" onClick={handleClose}>Cancel</Button>
			  <Button variant="primary" type="submit" disabled={formData.username.length === 0 || formData.password.length === 0 || formData.password !== formData.repeatPassword}>Register</Button>
			</Modal.Footer>
		  </Form>
		</Modal>
	
	  )
	}