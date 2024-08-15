import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';
import { AppDispatch } from '../app/store';
import './st/stl.css'

const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <div>
            <input
                className='input'
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter todo..."
            />
            <button className='button' onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};

export default AddTodo;
