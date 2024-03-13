import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/use-user';
import styles from './Signin.module.scss';

export default function Signin() {
    const {user, setUser} = useUser();
    const [activeButton, setActiveButton] = useState(false);
    const [styleButton, setStyleButton] = useState({opacity: 0.5});
    const navigate = useNavigate();

    function handleChange(event) {
        setStyleButton({ opacity: 0.5 });
        setActiveButton(false);
        const userName = event.target.value.toUpperCase();
        setUser(userName);
        if ((event.target.value).length >= 4 && (event.target.value).length <= 16) {
            setActiveButton(true);
            setStyleButton({ opacity: 1 });
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        navigate('/bookList');
    }

    return (
        <div className={styles.signin}>
            <h1>BookLand</h1>
            <div className={styles.signin_hero}>
                <form className={styles.signin_form} onSubmit={handleSubmit}>
                    <i className="fa-solid fa-user-large"></i>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" placeholder="type your name" value={user} onChange=
                        {handleChange} autoFocus />
                    <button disabled={!activeButton} style={styleButton} type="submit">Sign-in</button>
                </form>
            </div>
        </div>
    )
}

