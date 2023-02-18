import axios from 'axios';
import React, { useEffect } from 'react';
import { BsCheck } from 'react-icons/bs';
import { useStore } from '../../utils/useStore';
import styles from './InputTodo.module.scss';

const InputTodo = (props) => {
    const [inputChecked, inputCheckedSetter, inputValue, inputValueSetter] =
        useStore((state) => [
            state.inputChecked,
            state.inputCheckedSetter,
            state.inputValue,
            state.inputValueSetter,
        ]);
    const checkChangeHandler = (e) => {
        inputCheckedSetter(e.target.checked);
        if (e.target.checked && inputValue.trim() !== '') {
            createTodo();
        } else {
            alert('A name must be entered!');
            inputCheckedSetter(false);
        }
    };
    const handleKeypress = (e) => {
        if (inputValue.trim() !== '') {
            if (e.charCode === 13) {
                createTodo();
            }
        }
    };
    const createTodo = async () => {
        try {
            const body = { name: inputValue };
            const res = await axios.post('http://localhost:5100/todo', body);
            props.getAllTodos();
            inputValueSetter('');
            inputCheckedSetter(false);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div
            className={`${styles.todo_input} ${
                !props.isDarkMode
                    ? styles.todo_input_light
                    : styles.todo_input_dark
            }`}
        >
            <span>
                <label htmlFor="checked">
                    {inputChecked && (
                        <BsCheck
                            className={
                                !props.isDarkMode
                                    ? styles.check_icon_light
                                    : styles.check_icon_dark
                            }
                        />
                    )}
                </label>
                <input
                    type="checkbox"
                    id="checked"
                    value={inputChecked}
                    onChange={checkChangeHandler}
                    hidden
                />
            </span>
            <input
                type="text"
                placeholder="Create a new todo..."
                value={inputValue}
                onChange={(e) => {
                    inputValueSetter(e.target.value);
                }}
                onKeyPress={handleKeypress}
            />
        </div>
    );
};

export default InputTodo;
