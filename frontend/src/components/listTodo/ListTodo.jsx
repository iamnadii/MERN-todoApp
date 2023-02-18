import React, { useEffect } from 'react';
import { useStore, usePersistData } from '../../utils/useStore';
import SingleTodo from './SingleTodo';
import styles from './ListTodo.module.scss';
import axios from 'axios';

const ListTodo = (props) => {
    const [listItems, activeId, activeIdSetter] = useStore((state) => [
        state.listItems,
        state.activeId,
        state.activeIdSetter,
    ]);
    const [todoList, todoListSetter] = usePersistData((state) => [
        state.todoList,
        state.todoListSetter,
    ]);
    // delete todo
    const deleteTodo = async (e) => {
        const id = e.target.id;
        try {
            const res = await axios.delete(`http://localhost:5100/todo/${id}`);
            props.getAllTodos();
        } catch (err) {
            console.error(err);
        }
    };
    // update todo status
    const updateTodo = async (e) => {
        const id = e.target.id;
        const body = { checked: e.target.checked };
        try {
            const res = await axios.patch(
                `http://localhost:5100/todo/${id}`,
                body,
            );
            props.getAllTodos();
        } catch (err) {
            console.error(err);
        }
    };
    // filter todo
    const filterTodo = async (id) => {
        let code;
        if (id) {
            code = id;
        } else {
            code = activeId;
        }
        try {
            const res = await axios.put(`http://localhost:5100/todo/${code}`);
            const data = res.data.data?.filteredData;
            console.log(data);
            if (data) {
                todoListSetter(data);
            } else {
                props.getAllTodos();
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        activeIdSetter(listItems[0].id);
    }, []);

    useEffect(() => {
        filterTodo();
    }, [activeId]);

    return (
        <>
            <div
                className={`${styles.list_todo} ${
                    !props.isDarkMode
                        ? styles.todo_list_light
                        : styles.todo_list_dark
                }`}
            >
                <div className={styles.lists_container}>
                    {todoList.map((todo) => {
                        return (
                            <SingleTodo
                                key={todo._id}
                                todo={todo}
                                isDarkMode={props.isDarkMode}
                                deleteTodo={deleteTodo}
                                updateTodo={updateTodo}
                            />
                        );
                    })}
                </div>
                <div className={styles.bottom}>
                    <p>
                        {todoList.filter((list) => !list.checked).length} items
                        left
                    </p>
                    <ul className={styles.center_content}>
                        {listItems.map((item) => {
                            return (
                                <li
                                    onClick={() => activeIdSetter(item.id)}
                                    className={`${
                                        item.id === activeId
                                            ? styles.active
                                            : ''
                                    }`}
                                    key={item.id}
                                >
                                    {item.name}
                                </li>
                            );
                        })}
                    </ul>
                    <span
                        id={4}
                        onClick={(e) => {
                            filterTodo(+e.target.id);
                        }}
                    >
                        Clear Completed
                    </span>
                </div>
            </div>
            <div>
                <ul
                    className={`${styles.selections} ${
                        !props.isDarkMode
                            ? styles.selection_light
                            : styles.selection_dark
                    }`}
                >
                    {listItems.map((item) => {
                        return (
                            <li
                                onClick={() => activeIdSetter(item.id)}
                                className={`${
                                    item.id === activeId ? styles.active : ''
                                }`}
                                key={item.id}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default ListTodo;
