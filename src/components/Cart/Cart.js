import { useBooks } from '../../context/use-books';
import { LocalStorageService, LS_KEYS } from '../../services/localStorage';
import Navbar from '../Navbar/Navbar';
import BookInCart from '../BookInCart/BookInCart';
import styles from './Cart.module.scss';

export default function Cart() {
    const { addedBooks, setAddedBooks } = useBooks();
    let totalPrice = 0;

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
        LocalStorageService.remove(LS_KEYS.ADDEDBOOKS, addedBooks);
        setAddedBooks([]);
    }
    return (
        <>
            <Navbar />
            <div className={styles.cart}>
                <button className={styles.removeAllButton} onClick={handleRemoveAll} disabled={addedBooks.length === 0}>Remove all</button>
                {(addedBooks.length === 0) ? (
                    <div className={`container pt-5 ${styles.emptyCart}`}>
                        <div className={styles.cartIcon}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </div>
                        <p>Cart is empty yet ... </p>
                    </div>
                ) : (
                    <>
                        <div className="container">
                            {addedBooks.map(function (book) {
                                const priceForItem = +(book.count * book.price).toFixed(2);
                                totalPrice = +(totalPrice + priceForItem).toFixed(2);
                                return (
                                    <div className={`row p-2 rounded mt-5 ${styles.cart_bookWrapper}`}>
                                        <div className="col-12 col-sm-3 col-md-3" key={book.id}>
                                            <BookInCart book={book} />
                                        </div>
                                        <div className={`col-12 col-sm-3 col-md-3  ${styles.mainBookInfa}`}>
                                            <p>{book.title}</p>
                                            <p>{book.author}</p>
                                            <p> {book.price}$ </p>
                                        </div>
                                        <div className="col-12 col-sm-2 col-md-2">
                                            <input id="count" type="number" min={1} max={42} value={book.count} book-id={book.id} onChange={handleCountInput} inputMode="numeric" />
                                            pcs.
                                        </div>
                                        <div className="col-12 col-sm-2 col-md-2">
                                            <p>
                                                <span> Price</span>
                                                <span> {priceForItem}$ </span>
                                            </p>
                                        </div>
                                        <div className="col-12 col-sm-1 col-md-1">
                                            <button className={styles.removeButton} book-id={book.id} onClick={handleRemove}>Remove</button>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className={styles.totalPrice}>
                                Total Price:
                                <span> {totalPrice}$ </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}