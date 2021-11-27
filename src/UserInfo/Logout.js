import React, {useContext} from 'react'
import {ThemeContext, StateContext} from '../Contexts'
import {useNavigation} from 'react-navi';


export default function Logout() {   //{user, dispatchUser}) {
    
  const {state, dispatch} = useContext(StateContext)
  const {user} = state

  const navigation = useNavigation();

  return (
    <form onSubmit={evt => {evt.preventDefault(); dispatch({type:'LOGOUT'});
    navigation.navigate('/');
    }}>
          Currently logged in as user:  <b>{user.username}</b>
          <input type="submit" value="Logout"/>
    </form>
  )
}
  