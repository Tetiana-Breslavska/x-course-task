import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../../context/use-user';
import Navbar from '../Navbar/Navbar';
import styles from './SpecificBook.module.scss';


export default function SpecificBook(props) {
    const location = useLocation()
    const book = location.state;
    const { addedBooks, setAddedBooks } = useUser();
    const bookShortName = book.title.length > 24 ? book.title.slice(0, 24) + '...' : book.title
    const [bookTitle, setBookTitle] = useState(bookShortName);
    const [isTitleHovered, setIsTitleHovered] = useState(false);
    const [count, setCount] = useState(1);


    const handleMouseEnter = (event) => {
        setBookTitle(book.title);
        setIsTitleHovered(true);
    }

    const handleMouseLeave = (event) => {
        setBookTitle(bookShortName);
        setIsTitleHovered(false);
    }

    const handleCountInput = (event) => {
        if (event.target.value >= 0 && event.target.value <= 42) {
            setCount(event.target.value);
        }
    }

    const handleButton = (event) => {
        const bookId = + event.target.getAttribute('book-id');
        const foundBook = addedBooks.find(item => item.id === bookId);
        console.log(foundBook);
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
                        count: book.count + currentCount,
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
                <div className={styles.specificBook_Wrapper}>
                    <div className={styles.specificBook_image}>
                        <img src={book.image || "./imageNotFound.png"}
                            alt="book" />
                    </div>
                    <div className={styles.specificBook_generalInfa}>
                        <p className={`${styles.specificBook} ${isTitleHovered ? styles.hovered : ''}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            Book name:
                            <span>{bookTitle}</span>
                        </p>
                        <p>Book author: <span>{book.author}</span></p>
                        <p>Book level: <span>{book.level}</span></p>
                        <p>Book tags: <span>{book.tags}</span></p>
                    </div>
                    <div className={styles.specificBook_placeToBay}>
                        <div>
                            <span>price</span>
                            <span id="price"> {book.price}$</span>
                        </div>
                        <div>
                            <span>Count</span>
                            <input id="count" type="number" min={1} max={42} value={count} onChange={handleCountInput} inputMode="numeric" />
                        </div>
                        <div>
                            <span>Total price</span>
                            <span id="totalPrice"> {(count * book.price).toFixed(2)}$ </span>
                        </div>
                        <button onClick={handleButton} book-id={book.id} disabled={+count === 0}>Add to cart</button>
                    </div>
                </div>
                <div className={styles.specificBook_descriptionInfa}>
                    <span>Description</span>
                    <p>{book.description}</p>
                </div>
            </section>

        </>
    )
}