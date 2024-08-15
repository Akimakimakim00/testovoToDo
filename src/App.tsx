import React from 'react';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

const App: React.FC = () => {
  return (
      <div className="App">
          <div className="todobody">
            <h1 className='tittle'>ToDo List</h1>
            <AddTodo />
            <TodoList />
          </div>
      </div>
  );
};

export default App;
