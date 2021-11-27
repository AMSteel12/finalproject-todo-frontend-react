import React, {useContext} from 'react';
import User from './User';
import {ThemeContext, StateContext} from '../Contexts'


export default function UsersList() {

  const {state } = useContext(StateContext);
  const {users} = state;

  return (
    <div>
      <h3>List of Registered Users</h3>
      {users.map((user) => (
        <User key={user.id} {...user}/>
      ))}
    </div>
  );
}