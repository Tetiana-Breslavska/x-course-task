import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>
            </Link>
            <p>
                <i className="fa-solid fa-user-large"></i>
                <span>Username</span>
            </p>
            <Link to="/">Sign-out</Link>

        </nav>
    )
}