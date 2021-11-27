import React, {useEffect, useContext} from 'react'
import {useResource} from 'react-request-hook'
import {ThemeContext, StateContext} from '../Contexts'
import {Link} from 'react-navi'
import Todo from '../Todo'
import UsersList from './UsersList'

export default function UsersPage() {

    const {dispatch} = useContext(StateContext);

    const [usersList, getUsersList] = useResource(() => ({
      url: '/users',
      method: 'get',
    }));

    useEffect(getUsersList, []);

    useEffect(() => {
      if (usersList && usersList.data) {
        dispatch({type: 'FETCH_USERS', usersList: usersList.data.usersList});
      }
    }, [usersList]);

    const {isLoading} = usersList;


    return (
      <>
        {isLoading && 'Users loading...'}
        <UsersList />
      </>
    );
  }
  