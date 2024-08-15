import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo, updateTodo, deleteTodo } from '../features/todoSlice';
import { AppDispatch } from '../app/store';

interface TodoItemProps {
    todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch<AppDispatch>();

    const toggleCompletion = () => {
        dispatch(updateTodo({
            ...todo,
            completed: !todo.completed,
        }));
    };

    const removeTodo = () => {
        dispatch(deleteTodo(todo.id));
    };

    return (
        <li className='item' style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.completed} onChange={toggleCompletion} />
            {todo.text}
            <button className='buttonRed' onClick={removeTodo}>Delete</button>
        </li>
    );
};

export default TodoItem;
