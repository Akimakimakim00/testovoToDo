import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

// Mock API calls with timeouts to simulate real HTTP requests
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    return new Promise<Todo[]>((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: 'Что то сделать', completed: false },
                { id: 2, text: 'Еще что то сделать', completed: false },
                { id: 3, text: 'Ну и еще что то', completed: true },
            ]);
        }, 1000);
    });
});

export const addTodo = createAsyncThunk('todos/addTodo', async (text: string) => {
    return new Promise<Todo>((resolve) => {
        setTimeout(() => {
            resolve({ id: Date.now(), text, completed: false });
        }, 500);
    });
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo: Todo) => {
    return new Promise<Todo>((resolve) => {
        setTimeout(() => {
            resolve(updatedTodo);
        }, 500);
    });
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id: number) => {
    return new Promise<number>((resolve) => {
        setTimeout(() => {
            resolve(id);
        }, 500);
    });
});

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.todos = action.payload;
                state.loading = false;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch todos';
            })
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload);
                state.loading = false;
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add todo';
            })
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update todo';
            })
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete todo';
            });
    }
});

export default todoSlice.reducer;
