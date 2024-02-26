import { Link } from "react-router-dom";
import styles from './Book.module.scss';
import { logDOM } from "@testing-library/react";




export default function Book({ book }) {
    
    // console.log(book);
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-icon"><img src={book.image || "./imageNotFound.png"} alt="book's image" /></div>
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">
                    <span>{book.author}</span>
                    <br />
                    <span>{book.price}</span>
                </p>
                <div className="btn btn-primary button">
                    <Link to="/specificBook" state={ book }>View</Link>
                </div>
            </div>
        </div>
    )
}