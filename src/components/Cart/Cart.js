import { Link } from 'react-router-dom';
// import { useUser } from '../../context/use-user';
import { useBooks } from '../../context/use-books';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';
import Navbar from '../Navbar/Navbar';
import styles from './Cart.module.scss';
// import BookList from '../BookList/BookList';
// import Book from '../Book/Book';
import BookInCart from '../BookInCart/BookInCart';

export default function Cart() {
    const { addedBooks, setAddedBooks } = useBooks();
    // console.log(addedBooks);

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

    const handleRemoveAll = () => {
        console.log('remove all');
        LocalStorageService.remove(LS_KEYS.ADDEDBOOKS, addedBooks);
        setAddedBooks([]);
    }

    let totalPrice = 0;

    return (
        <>
            <Navbar />
            <div className={styles.cart}>
                <button className={styles.removeAllButton} onClick={handleRemoveAll} disabled={addedBooks.length === 0}>Remove all</button>

                {(addedBooks.length === 0) ? (
                    <div className={`container pt-5 ${styles.emptyCart}`}>
                        <a className={styles.cartIcon} href="#">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <p>Cart is empty yet ... </p>
                    </div>
                ) : (
                    <>
                        <div className="container">
                            {/* <Link to="/bookList" className={styles.button}>Go to catalog</Link> */}
                            {/* <div className="row"> */}
                            {addedBooks.map(function (book) {
                                const priceForItem = +(book.count * book.price).toFixed(2);
                                totalPrice = +(totalPrice + priceForItem).toFixed(2);
                                return (
                                    // <div className={`d-flex justify-content-between ${styles.}`} >
                                    <div className={`row p-2 rounded mt-5 ${styles.cart_bookWrapper}`}>
                                        <div className="col" key={book.id}>
                                            <BookInCart book={book} />
                                        </div>
                                        <div className="col">
                                            <span> {book.price}$ </span>
                                        </div>
                                        <div className="col">
                                            <input id="count" type="number" min={1} max={42} value={book.count} book-id={book.id} onChange={handleCountInput} inputMode="numeric" />

                                        </div>
                                        <div className="col">
                                            <p>
                                                <span> Price</span>
                                                <span> {priceForItem}$ </span>
                                            </p>
                                        </div>
                                        <div className="col">
                                            <button className={styles.removeButton} book-id={book.id} onClick={handleRemove}>Remove</button>
                                        </div>



                                    </div>
                                    // </div>
                                );
                            })}

                            <div className={styles.totalPrice}>
                                Total Price:
                                <span> {totalPrice}$ </span>
                            </div>
                        </div>
                        {/* </div> */}

                    </>
                )}
            </div>
        </>
    )
}