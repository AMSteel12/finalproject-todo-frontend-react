import React, {useEffect, useContext} from 'react'
import {ThemeContext, StateContext} from '../Contexts'
import {useResource} from 'react-request-hook'
import {Link} from 'react-navi'
import TodoList from '../TodoList'
import CreateTodoItem from '../CreateTodoItem'


export default function HomePage() {
    const {state, dispatch} = useContext(StateContext)

    const {user} = state
    
    const [todos, getTodos] = useResource(() => ({
        url: `/users/${user.id}`,
        method: 'get',
        headers: {"Authorization": `${user.access_token}`}
    }))


    useEffect(() => {
        if (user.id) {
          getTodos();
        }
      }, [user.access_token]);
    
    useEffect(() => {
        if (todos && todos.data) {
          dispatch({type: 'FETCH_TODOS', todos: todos.data.todos});
        }
      }, [todos]);

    
    const { isLoading } = todos;


    return (
        <>
            {isLoading && 'Todos loading...'} 
            <TodoList />
        </>
    )
}