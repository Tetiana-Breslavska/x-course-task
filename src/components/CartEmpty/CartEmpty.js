import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import styles from './CartEmpty.module.scss';

export default function CartEmpty() {
    return (
        <>
            <Navbar />
            <div className={styles.cartEmpty}>
                <div className="container">
                    <Link to ="/bookList" className={styles.button} href="#">Go to purchase</Link>
                    <a className={styles.cartIcon} href="#">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </a>
                    <p>Cart is empty yet ... </p>
                </div>
            </div>
        </>
    )
}