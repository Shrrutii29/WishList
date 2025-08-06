import './App.css';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

function App() {

  const [todo, setTodo] = useState();
  const [todoList, setTodolist] = useState([]);
  const [editingText, setEditingText] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);


  const onTodoInputChange = (e) => {
    setTodo(e.target.value);
  }

  const onAddTodoClick = () => {
    setTodolist([...todoList, { id: uuid(), todo: todo, isCompleted: false }]);
    setTodo('');
  }

  const onDeleteTodoClick = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id);
    setTodolist(updatedTodoList);
  }

  const onTodoCheckChange = (id) => {
    const updatedTodoList = todoList.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    setTodolist(updatedTodoList);
    console.log(updatedTodoList);
  }

  const onEditTodoClick = (id, newText) => {
    setEditingText(newText);
    setEditingTodoId(id);
  }

  const onSaveTodoClick = (id) => {
    const updatedTodoList = todoList.map(todo => todo.id === id ? { ...todo, todo: editingText } : todo);
    setTodolist(updatedTodoList);
    setEditingText('');
    setEditingTodoId(null);
  }

  return (
    <div className="App">
      <h1>My WishList</h1>
      <div>
        <input value={todo} onChange={onTodoInputChange} placeholder="Add Your WishList Here" type='text' />
        <button onClick={onAddTodoClick}>Add</button>
      </div>

      <div>
        {
          todoList.length > 0 && todoList.map(todo => (
            <div key={todo.id} className='todo-item'>
              
              <div className='left-section'>
                <input onChange={() => onTodoCheckChange(todo.id)} type='checkbox' />

                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <span className={todo.isCompleted ? 'strike-through' : ''}>{todo.todo}</span>
                )}
              </div>


              <div className='right-section'>
                {editingTodoId === todo.id ? (
                  <button onClick={() => onSaveTodoClick(todo.id)}>Save</button>
                ) : (
                  <button onClick={() => onEditTodoClick(todo.id, todo.todo)}>Edit</button>
                )}

                <button onClick={() => onDeleteTodoClick(todo.id)}> Delete</button>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
