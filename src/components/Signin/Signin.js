import React from 'react';
import styles from './Signin.module.scss';
import { Link } from 'react-router-dom';



export default function Signin() {
    return (
        <div className={styles.signin_content}>
            <h1>BookLand</h1>
            <div className={styles.signin_content_hero}>
                <form className={styles.signin_form}>
                    <i className="fa-solid fa-user-large"></i>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" placeholder="type your name" autoFocus />
                        {/* <button type="submit">Sign-in</button> */}
                        <Link to="/bookList">Sign-in</Link>
                </form>
            </div>
        </div>
    )
}

