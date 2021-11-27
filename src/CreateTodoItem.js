import React, {useState, useEffect, useContext} from 'react'
import {ThemeContext, StateContext} from './Contexts'
import {useResource} from 'react-request-hook'
import {useNavigation} from 'react-navi'

export default function CreateTodoItem() {

	const {state, dispatch} = useContext(StateContext);
	const {user} = state;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const navigation = useNavigation();

	const [todoItem, createTodo] = useResource(
	  ({title, description, author}) => ({
		url: '/todo',
		method: 'post',
		headers: {Authorization: `${user.access_token}`},
		data: {title, description, author},
	  })
	);
  
	useEffect(() => {
	  if (todoItem && todoItem.data && todoItem.isLoading === false) {
		const newTodo = {
		  id: todoItem.data.id,
		  title: todoItem.data.title,
		  author: user.username,
		  description: todoItem.data.description
		};
		dispatch({
		  type: 'CREATE_TODO',
		  newTodo,
		});
		navigation.navigate(`/todo/${todoItem.data.id}`);
	   }
	}, [todoItem]);
  
	const handleTitle = (evt) => {
	  setTitle(evt.target.value);
	};
  
	const handleDescription = (evt) => {
	  setDescription(evt.target.value);
	};
  
	const handleCreate = () => {
	  createTodo({
		title,
		description,
		author: user.username,
	  });
	  setTitle('');
	  setDescription('');
	};
  
	return (
	  <form
		onSubmit={(e) => {
		  e.preventDefault();
		  handleCreate();
		}}
	  >
		<div>
		  <label htmlFor="create-title">Title:</label>
		  <input
			type="text"
			id="create-title"
			value={title}
			onChange={handleTitle}
			placeholder="New Todo Item Title"
			name="create-title"
		  />
		</div>
		<br />
		<textarea value={description} onChange={handleDescription} placeholder="New Todo Item Description"/>
		<br />
		<input type="submit" value="Publish Todo Item" disabled={title.length === 0} />
	  </form>
	);
  }