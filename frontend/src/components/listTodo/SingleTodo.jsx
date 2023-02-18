import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { BsCheck } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import styles from './ListTodo.module.scss';

const SingleTodo = (props) => {
    const { _id, name, checked } = props.todo;
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <div
            className={`${styles.all_lists} ${
                !props.isDarkMode
                    ? styles.todo_checkbox_light
                    : styles.todo_checkbox_dark
            }`}
        >
            <p>
                <span className={`${styles.checkbox}`}>
                    <label htmlFor={_id}>
                        {isChecked && (
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
                        id={_id}
                        value={isChecked}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            props.updateTodo(e);
                        }}
                        hidden
                    />
                </span>
                <small className={styles.todo_name}>
                    <span className={checked ? styles.todo_status : ''}>
                        {name}
                    </span>
                    <small>
                        <RxCross1 onClick={props.deleteTodo} id={_id} />
                    </small>
                </small>
            </p>
            <div
                className={
                    !props.isDarkMode ? styles.light_line : styles.dark_line
                }
            ></div>
        </div>
    );
};

export default SingleTodo;
