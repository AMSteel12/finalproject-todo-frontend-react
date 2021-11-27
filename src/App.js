import React, {useReducer, useEffect, useState} from 'react';
import {useResource} from 'react-request-hook';
import {mount, route} from 'navi';
import {Router, View} from 'react-navi';
import {Container} from 'react-bootstrap';
import appReducer from './reducers';
import TodoList from './TodoList';
import {ThemeContext, StateContext} from './Contexts';
import CreateTodoItem from './CreateTodoItem';
import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';
import TodosPage from './pages/TodosPage';
import UsersPage from './pages/UsersPage';
import UserProfilePage from './pages/UserProfilePage';


function App() {
  const [state, dispatch] = useReducer(appReducer, {user: {}, users: [], todos: []});
  const {user} = state;

  const [theme, setTheme] = useState({
    primaryColor: 'dodgerblue',
    secondaryColor: 'darkorange'
 })
 

 const routes = mount({
  '/': route({view: <HomePage/>}),
  '/todo/create': route({view: <CreateTodoItem/>}),
  '/todo/:id': route((req) => ({view: <TodosPage id={req.params.id}/>})),
  '/users': route({view: <UsersPage/>}),
});


  return (
    <div>
      <StateContext.Provider value={{state, dispatch}}>
      <Router routes={routes}>
          <Container>
            <HeaderBar/>
            <hr/>
            <View/>
          </Container>
        </Router>
      </StateContext.Provider>
    </div>
  );
}


export default App;
