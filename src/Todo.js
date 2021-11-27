import React, {useContext, useEffect} from 'react'
import {Link} from 'react-navi'
import {Card, Button} from 'react-bootstrap'

import {ThemeContext, StateContext} from './Contexts'

import {useResource} from 'react-request-hook'

function Todo ({title, description, author, completeStatus, completedDate, todoId, short = false}) {
     
     const {secondaryColor} = useContext(ThemeContext)
     const {dispatch} = useContext(StateContext)

     const [deletedTodo, deleteTodo] = useResource((todoId) => ({
         url: `/todos/${todoId}`,
         method: "delete"
     }));
 
     const [toggledTodo, toggleTodo] = useResource((todoId, completed) => ({
         url: `/todos/${todoId}`,
         method: "patch",
         data: {
             completeStatus:completed,
             completedDate: Date.now()
         }
     }));
 
     useEffect(() => {
         if (deletedTodo && deletedTodo.data && deletedTodo.isLoading === false) {
             dispatch({type: 'DELETE_TODO', todoId: todoId})
         }
     }, [deletedTodo])
 
     useEffect(() => {
         if (toggledTodo && toggledTodo.data && toggledTodo.isLoading === false) {
             dispatch({type: 'TOGGLE_TODO', completeStatus:toggledTodo.data.completeStatus, completedDate:toggledTodo.data.completedDate, todoId})
         }
     }, [toggledTodo])

     let processedDescription = description

     if (short) {
          if (description.length > 30) {
               processedDescription = description.substring(0, 30) + '...'
          }
     }

     
     return (
          <Card>
          <Card.Body>
          <Card.Title><Link style={{ color: secondaryColor }} href={`/todo/${todoId}`}>{title}</Link>
              </Card.Title>
              <Card.Subtitle>
              <i>Created by: <b>{author}</b></i>
              </Card.Subtitle>
              <Card.Text>
                  {processedDescription}
              </Card.Text>
               <input type="checkbox" checked={completeStatus} onChange={e => {toggleTodo(todoId, e.target.checked)}} />
               <Button variant="link" onClick={(e) => {deleteTodo(todoId)}}>Delete Todo Item</Button>
              {completeStatus && <i>Item Completed on: {new Date(completedDate).toLocaleDateString('en-us')}</i>}
              {short && <Link href={`/todo/${todoId}`}>View Full-Length Todo Item</Link>}
          </Card.Body>
          </Card>

 )
}

export default React.memo(Todo);
