import React, {useState, useReducer, useEffect} from 'react';
import {mount, route} from 'navi';
import {Router, View} from 'react-navi';
import {Container} from 'react-bootstrap';
import appReducer from './reducers';
import {ThemeContext, StateContext} from './Contexts';
import CreateTodo from './CreateTodo';
import TodoPage from './pages/TodoPage';
import HeaderBar from './pages/HeaderBar';
import HomePage from './pages/HomePage';

export default function App() {

  const [ state, dispatch ] = useReducer(appReducer, { user: {}, todos: [] });

  const {user} = state;

  const [theme, setTheme] = useState({
    primaryColor: 'dodgerblue',
    secondaryColor: 'darkorange'
 })

 const routes = mount({
  '/': route({view: <HomePage />}),
  '/todo/create':route({view: <CreateTodo/>}),
  '/todo/:id': route(req => {
      return {view: <TodoPage id={req.params.id} />}
  }),
})

  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <StateContext.Provider value={{state: state, dispatch: dispatch}}>
          <Router routes={routes}>
            <Container>
                <HeaderBar setTheme={setTheme} />
                <hr />
                <View />
            </Container>
            </Router>
        </StateContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}