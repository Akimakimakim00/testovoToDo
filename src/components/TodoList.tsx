import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, Todo } from '../features/todoSlice';
import { RootState, AppDispatch } from '../app/store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const { todos, loading, error } = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <ul>
            {todos.map((todo: Todo) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
};

export default TodoList;
