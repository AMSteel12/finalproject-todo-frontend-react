import React, {useContext} from 'react';
import Todo from './Todo';
import {ThemeContext, StateContext} from './Contexts';


export default function TodoList() {

  const {state} = useContext(StateContext);
  const {todos} = state;

  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo}/>
      ))}
    </div>
  );
}