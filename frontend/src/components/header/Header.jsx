import React from "react";
import styles from "./Header.module.scss";
import lightLogo from "../../assets/images/icon-moon.svg";
import darkLogo from "../../assets/images/icon-sun.svg";

const Header = (props) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>TODO</h1>
            <img
                src={
                    !props.isDarkMode ? lightLogo : darkLogo
                }
                alt=""
                onClick={props.darkModeSetter}
                className={styles.icon}
            />
        </div>
    );
};

export default Header;
