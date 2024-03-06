import { Link } from "react-router-dom";
import styles from './Book.module.scss';
import { logDOM } from "@testing-library/react";




export default function Book({ book }) {
    

    return (
        <div className={`card ${styles.book}`}>
            <div className="card-body">
                <div className={`card-icon ${styles.book_icon}`}><img src={book.image || "./imageNotFound.png"} alt="book's image" /></div>
                <h5 className="card-title mt-3">{book.title}</h5>
                <p className="card-text">
                    <span>{book.author}</span>
                    <br />
                    <span>{book.price}$</span>
                </p>
                <div className={`btn btn-outline-danger ${styles.button}`}>
                    <Link to={`/specificBook/${book.id}`} >View</Link>
                </div>
            </div>
        </div>
    )
}