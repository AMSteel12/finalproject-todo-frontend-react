import React, {useContext, useEffect, useState} from 'react'
import {useResource} from 'react-request-hook';
import {ThemeContext, StateContext} from './Contexts'
import {Link} from 'react-navi'
import {Card, Button} from 'react-bootstrap'


 function Todo({id, title, author, description, completeStatus, completedDate, short = false}) {

  const {state, dispatch} = useContext(StateContext);
  const {user} = state;
  const {secondaryColor} = useContext(ThemeContext)

  const [toggleDeleteFailed, setToggleDeleteFailed] = useState(false);

  const [todoItem, deletedTodo] = useResource((todoId) => ({
    url: '/todo/',
    method: 'delete',
    data: {id: todoId, author},
    headers: {Authorization: `${user.access_token}`},
  }));

  const [todoUpdate, toggledTodo] = useResource(({completeStatus, completedDate}) => ({
    url: '/todo',
    method: 'patch',
    data: {id, completeStatus, completedDate, author},
    headers: {Authorization: `${user.access_token}`},
  }));

  useEffect(() => {
    if (todoItem && (todoItem.data || todoItem.error) && todoItem.isLoading === false) {
      if (todoItem.error) {
        setToggleDeleteFailed(true);
      } else {
        setToggleDeleteFailed(false);
        dispatch({type: 'DELETE_TODO', id: todoItem.data.id});
      }
    }
  }, [todoItem]);

  useEffect(() => {
    if (todoUpdate && (todoUpdate.data || todoUpdate.error) && todoUpdate.isLoading === false) {
      if (todoUpdate.error) {
        setToggleDeleteFailed(true);
      } else {
        setToggleDeleteFailed(false);
        dispatch({type: 'TOGGLE_TODO',
          completeStatus: todoUpdate.data.completeStatus,
          completedDate: todoUpdate.data.completeDate, id,
        });
      }
    }
  }, [todoUpdate]);


  const handleChecked = (evt) => {
    let toggledDate = null;
    if (evt.target.checked) {
      toggledDate = Date.now();
    } else {
      toggledDate = null;
    }
    toggledTodo({completeStatus: evt.target.checked, completedDate: toggledDate});
  };

  const handleDelete = () => {
    deletedTodo(id);
  };

  let processedDescription = description;

  if (short) {
    if (description.length > 30) {
      processedDescription = `${description.substring(0, 30)} ...`;
    }
  }

  return (
    <Card>
    <Card.Body>
      <Card.Title>
      <Link style={{color: secondaryColor}} href={`/todo/${id}`}>{title}</Link>      
      </Card.Title>
      <Card.Subtitle>
        <i>
          Todo Item Authored by: <b>{user.username}</b>
        </i>
      </Card.Subtitle>
      <Card.Text>{processedDescription}</Card.Text>
      <input type="checkbox" checked={completeStatus} onChange={handleChecked} />
      <Button variant="link" onClick={handleDelete}>
        Delete Todo Item
      </Button>
      {completedDate && <i>Todo Item finished on: {new Date(completedDate).toLocaleDateString('en-us')}</i>}
      {short && <Link href={`/todo/${id}`}>View Full-Length Todo Item</Link>}
      {toggleDeleteFailed && (
        <Card.Text style={{color: 'crimson'}}>User Unauthorized to Update Todo.  If Mistake, Please Try Again.</Card.Text>
      )}
    </Card.Body>
  </Card>
);
}

export default React.memo(Todo);
