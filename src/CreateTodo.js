import React, {useState, useEffect, useContext} from 'react'
import {StateContext} from './Contexts'
import {useResource} from 'react-request-hook'

import {useNavigation} from 'react-navi'

export default function CreatePost () {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const navigation = useNavigation()

    const {state, dispatch} = useContext(StateContext)
    const {user} = state;

    const [todo , createTodo] = useResource(({ title, description, author}) => ({
            url: '/todo',
            method: 'post',
            headers: {"Authorization": `${state.user.access_token}`},
            data: {title, description, author}
        }))

    function handleTitle (evt) {setTitle(evt.target.value)}

    function handleDescription (evt) {setDescription(evt.target.value)}

    function handleCreate () {
            createTodo({title, description, author: user.username})
        }
        
    useEffect(() => {
        if (todo && todo.data) {
            dispatch({type: 'CREATE_TODO', title: todo.data.title, description: todo.data.description, id: todo.data.id, author: user.username})
            console.log(todo.data)
            navigation.navigate(`/todo/${todo.data.id}`)
        }
    }, [todo])
        

     return (
          <form onSubmit={e => {e.preventDefault(); handleCreate();} }>
             
             <div>Author: <b>{user.username}</b></div>

             <div>
                 <label htmlFor="create-title">Title:</label>
                 <input type="text" value={title} onChange={handleTitle} name="create-title"  id="create-title" />
             </div>

             <textarea value={description} onChange={handleDescription} />
             <input type="submit" value="Publish Todo" />
         </form>   
          )
 }
 