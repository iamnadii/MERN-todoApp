import React, { useEffect } from 'react';
import axios from 'axios';
import { Header, InputTodo, ListTodo } from './components';
import { usePersistData } from './utils/useStore';

const App = () => {
    const [isDarkMode, darkModeSetter, todoListSetter] = usePersistData(
        (state) => [
            state.isDarkMode,
            state.darkModeSetter,
            state.todoListSetter,
        ],
    );
    // func to get the list of all todos
    const getAllTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5100/todo');
            const data = res.data.data?.allTodos;
            todoListSetter(data);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getAllTodos();
    }, []);
    return (
        <div
            className={`wrapper ${
                !isDarkMode ? 'light-bg-color' : 'dark-bg-color'
            }`}
        >
            <div
                className={`bg-image ${
                    !isDarkMode ? 'light-bg-img' : 'dark-bg-img'
                }`}
            >
                <div className="content">
                    <Header
                        isDarkMode={isDarkMode}
                        darkModeSetter={darkModeSetter}
                    />
                    <InputTodo
                        isDarkMode={isDarkMode}
                        getAllTodos={getAllTodos}
                    />
                    <ListTodo
                        isDarkMode={isDarkMode}
                        getAllTodos={getAllTodos}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
