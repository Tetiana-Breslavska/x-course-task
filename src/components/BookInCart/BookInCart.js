import { Link } from "react-router-dom";
import styles from './BookInCart.module.scss';





export default function Book({ book }) {

    return (
        <div className={styles.bookInCart}>
            <div>
                <img src={book.image || "./imageNotFound.png"} alt="book" />
            </div>
            <div className={styles.button}>
                <Link to="/specificBook" state={book}>View</Link>
            </div>
        </div>
    )
}