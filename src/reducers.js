function userReducer(state, action) {
    switch (action.type) {
      case 'LOGIN':
      case 'REGISTER':
        return {
          id: action.id,
          username: action.username,
          access_token: action.access_token,
        };
      case 'LOGOUT':
        return {
          id: '',
          username: '',
          access_token: '',
        };
      default:
        return state;
    }
  }


  function usersReducer(state, action) {
    switch (action.type) {
      case 'FETCH_USERS':
        return action.users;
      default:
        return state;
    }
  }


  function todoReducer(state, action) {
    switch (action.type) {
      case 'CREATE_TODO': {
        const filterTodo = state.filter((t) => t.id === action.newTodo.id);
        if (filterTodo.length === 0) {
          return [action.newTodo, ...state];
        }
        return state;
      }

      case 'TOGGLE_TODO': {
        return state.map((todo) => {
          const tempItem = todo;
          if (todo.id === action.id) {
            tempItem.completeStatus = action.completeStatus;
            tempItem.completedDate = action.completedDate;
          }
          return tempItem;
        });
      }

      case 'DELETE_TODO': {
        const todosUponDelete = state.filter((t) => t.id !== action.id);
        return [...todosUponDelete];
      }
      
      case 'FETCH_TODOS':
        return action.todos;
      default:
        return state;
    }
  }


  export default function appReducer (state, action) {
    return {
        user: userReducer(state.user, action),
        users: usersReducer(state.users, action),
        todos: todoReducer(state.todos, action)
    }
}
