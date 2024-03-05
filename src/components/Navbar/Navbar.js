import { Link } from "react-router-dom";
import { useUser } from '../../context/use-user';
import styles from './Navbar.module.scss';
import { LocalStorageService } from "../../services/localStorage";

export default function Navbar() {
    const { user, setUser } = useUser();
    // console.log(user);

    const clean = () => {
        LocalStorageService.removeAll();
        setUser('');

    };
    return (
        <nav className={styles.navbar}>
            <div className='container d-flex justify-content-end'>
                <Link className={styles.cart_icon} to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className = {styles.cart_counter} >10</span>
                </Link>
                <p>
                    <i className="fa-solid fa-user-large"></i>
                    <span className={styles.userName}>{user}</span>
                </p>
                <Link onClick={clean} to="/">Sign-out</Link>
            </div>


        </nav>
    )
}