import React, {useEffect, useContext} from 'react'
import {StateContext} from '../Contexts'
import {useResource} from 'react-request-hook'
import {Link} from 'react-navi'
import TodoList from '../TodoList'

export default function UserProfilePage({userId}) {

    const {dispatch} = useContext(StateContext)

    const [todos, getTodos] = useResource(() => ({
      url: `/users/${userId}`,
      method: 'get',
    }));

    useEffect(getTodos, []);

    useEffect(() => {
      if (todos && todos.isLoading === false && todos.data) {
        dispatch({type: 'FETCH_TODOS', todos: todos.data.todos });
      }
    }, [todos]);

    const {isLoading} = todos;

    return (
      <div>
        <hr />
        <div>
          <Link href="/users">Return</Link>
          {isLoading && 'Getting Ready..'} <TodoList/>
        </div>
      </div>
    );
  }

