import { Link } from 'react-router-dom';
import { useUser } from '../../context/use-user';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';
import Navbar from '../Navbar/Navbar';
import styles from './Cart.module.scss';
// import BookList from '../BookList/BookList';
import Book from '../Book/Book';

export default function Cart() {
    const { addedBooks, setAddedBooks } = useUser();
    console.log(addedBooks);

    const handleCountInput = (event) => {
        const bookId = + event.target.getAttribute('book-id');
        const newCountValue = + event.target.value;
        if (newCountValue >= 0 && newCountValue <= 42) {
            setAddedBooks(prevState => prevState.map(book => {
                if (book.id === bookId) {
                    return {
                        ...book,
                        count: newCountValue,
                    };
                } else {
                    return { ...book };
                }
            }));
        }
    };

    const handleRemove = (event) => {
        const bookId = + event.target.getAttribute('book-id');

        setAddedBooks(prevState => prevState.filter(book => book.id !== bookId));

    }





    return (
        <>
            <Navbar />
            {(addedBooks.length === 0) ? (
                <div className={styles.cartEmpty}>
                    <div className="container">
                        <Link to="/bookList" className={styles.button} href="#">Go to purchase</Link>
                        <a className={styles.cartIcon} href="#">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <p>Cart is empty yet ... </p>
                    </div>
                </div>) : (
                <div className="row" key="cartItems">
                    {addedBooks.map(function (book) {
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5 d-flex" key={book.id}>
                                <Book book={book} />
                                <label>
                                    Quantity
                                    <input id="count" type="number" min={1} max={42} value={book.count} book-id={book.id} onChange={handleCountInput} inputMode="numeric" />
                                </label>
                                <button book-id={book.id} onClick={handleRemove}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            )
            }
        </>
    )
}