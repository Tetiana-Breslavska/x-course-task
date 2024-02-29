import { useState } from 'react';
import { useUser } from '../../context/use-user';
import { useLogin } from '../../context/use-login';
import styles from './Signin.module.scss';
// import { LocalStorageService } from '../../services/localStorage';
// import { Link } from 'react-router-dom';

export default function Signin() {
    const {user, setUser} = useUser();
    const {login, setLogin} = useLogin();
    const [activeButton, setActiveButton] = useState(false)
    const [styleButton, setStyleButton] = useState({opacity: 0.5});
    if (user === "") {
        setLogin(false)
    }
    // console.log(login);



    function handleChange(event) {
        setStyleButton({ opacity: 0.5 });
        setActiveButton(false);
        const userName = event.target.value.toUpperCase();
        setUser(userName);
        if ((event.target.value).length >= 4 && (event.target.value).length <= 16) {
            setActiveButton(true);
            setStyleButton({opacity: 1});
            
        }
    }


    function handleSubmit(event) {
        console.log(' submit is done');
        setLogin(true);
        // event.preventDefault();


    }
    return (
        <div className={styles.signin_content}>
            <h1>BookLand</h1>
            <div className={styles.signin_content_hero}>
                <form className={styles.signin_form} onSubmit={handleSubmit} action = './bookList'>
                    <i className="fa-solid fa-user-large"></i>
                    <label htmlFor="username">Username:</label>
                    <input id="username" type="text" name="username" placeholder="type your name" value={user} onChange=
                        {handleChange} autoFocus />
                    <button disabled={!activeButton} style={styleButton} type="submit">Sign-in</button>
                    {/* <Link to="/bookList">Sign-in</Link> */}
                </form>
            </div>
        </div>
    )
}

