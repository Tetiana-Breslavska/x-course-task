import { Link } from "react-router-dom";
import styles from './Book.module.scss';

export default function Book({ book }) {
    return (
        <div className={`card ${styles.book}`}>
            <div className="card-body">
                <div className={`card-icon ${styles.bookIcon}`}>
                    <img src={book.image || `${process.env.PUBLIC_URL}/imageNotFound.png`} alt="book" />
                </div>
                <h5 className="card-title mt-3">{book.title}</h5>
                <p className="card-text">
                    <span>{book.author}</span>
                    <br />
                    <span>{book.price}$</span>
                </p>
                    <Link className={`btn btn-outline-danger ${styles.button}`} to={`/specificBook/${book.id}`} >View</Link>                
            </div>
        </div>
    )
}