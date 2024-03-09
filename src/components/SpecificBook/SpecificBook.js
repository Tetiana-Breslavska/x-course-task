import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from '../../context/use-books';
import Navbar from '../Navbar/Navbar';
import styles from './SpecificBook.module.scss';

export default function SpecificBook(props) {
    const { bookId } = useParams();
    const {books} = useBooks();
    const book = books.find((book) => +book.id === +bookId);
    const { addedBooks, setAddedBooks } = useBooks();
    const bookShortName = book.title.length > 24 ? book.title.slice(0, 24) + '...' : book.title
    const [bookTitle, setBookTitle] = useState(bookShortName);
    const [count, setCount] = useState(book.count || 0);

    const handleMouseEnter = (event) => {
        setBookTitle(book.title);
    }

    const handleMouseLeave = (event) => {
        setBookTitle(bookShortName);
    }

    const handleCountInput = (event) => {
        if (event.target.value >= 0 && event.target.value <= 42) {
            setCount(event.target.value);
        }
    }

    const handleButton = (event) => {
        const bookId = + event.target.getAttribute('book-id');
        const foundBook = addedBooks.find(item => item.id === bookId);
        const currentCount = +count;
        if (!foundBook) {
            setAddedBooks(prevState => [
                ...prevState,
                { ...book, count: currentCount }
            ]);
        }
        else {
            setAddedBooks(prevState => prevState.map(book => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        count: currentCount <= 42 ? currentCount : 42,
                    };
                } else {
                    return { ...book };
                }
            }));
        }
    }

    return (
        <>
            <Navbar />
            <section className={styles.specificBook}>
                <div className="container">
                    <h1>Book</h1>
                    <div className="row mt-3">
                        <div className={`col-sm-5 col-md-4 d-flex align-items-center justify-content-center  ${styles.specificBook_image}`}>
                            <img className="img-fluid" src={book.image || "../../imageNotFound.png"}
                                alt="book" />
                        </div>
                        <div className="col-sm-5 col-md-4 mt-3">
                            <h4 
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                Book name: <span>{bookTitle}</span>
                            </h4>
                            <h4>Book author: <span>{book.author}</span> </h4>
                            <h4>Book level: <span>{book.level}</span> </h4>
                            <h4>Book tags: <span>{book.tags.join(', ')}</span></h4>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <div>
                                <h4>Price:
                                    <span id="price"> {book.price}$</span>
                                </h4>
                            </div>
                            <div>
                                <h4>Count:
                                    <input id="count" type="number" min={1} max={42} value={count} onChange={handleCountInput} inputMode="numeric" />
                                </h4>
                            </div>
                            <div>
                                <h4>Total price:
                                    <span id="totalPrice"> {(count * book.price).toFixed(2)}$</span>
                                </h4>
                            </div>
                            <button className={`btn btn-outline-danger ${styles.button}`} onClick={handleButton} book-id={book.id} disabled={+count === 0}>Add to cart</button>
                        </div>
                    </div>
                    <div className={styles.specificBook_descriptionInfa}>
                        <h4>Description</h4>
                        <p>{book.description}</p>
                    </div>
                </div>
            </section>
        </>
    )
}