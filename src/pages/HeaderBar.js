import React, {useContext} from 'react'
import CreateTodoItem from '../CreateTodoItem'
import AppUserBar from '../UserInfo/AppUserBar'
import Header from '../Header'
import {Link} from 'react-navi'
import {Navbar, Nav, Container} from 'react-bootstrap'
import {ThemeContext, StateContext} from '../Contexts'


export default function HeaderBar () {
    const {state} = useContext(StateContext)
    const {user} = state;

    return (
        <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="/">
          <Header text="Multi-User Todo App" />
        </Navbar.Brand>          
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link>
              <Link href="/users">Registered Users</Link>
            </Nav.Link>
            {user.username && (<Nav.Link><Link href="/todo/create">Create New Todo Item</Link>
            </Nav.Link>
            )}
          </Nav>
              <React.Suspense fallback="Loading.........">
                <AppUserBar />
              </React.Suspense>
          </Navbar.Collapse>
         </Container>
        </Navbar>
    );
}