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

    const handleRemoveAll = () =>{
        console.log('remove all');
        LocalStorageService.remove(LS_KEYS.ADDEDBOOKS, addedBooks);
        setAddedBooks([]);
    }

    let totalPrice = 0;
    
    return (
        <>
            <Navbar />
            {(addedBooks.length === 0) ? (
                <div className={styles.cartEmpty}>
                    <div className="container">
                        <Link to="/bookList" className={styles.button} href="#">Go to catalog</Link>
                        <a className={styles.cartIcon} href="#">
                            <i className="fa-solid fa-cart-shopping"></i>
                        </a>
                        <p>Cart is empty yet ... </p>
                    </div>
                </div>) : (
                <div className="row" key="cartItems">
                    {addedBooks.map(function (book) {
                        const priceForItem = +(book.count * book.price).toFixed(2);
                        totalPrice = +(totalPrice + priceForItem).toFixed(2);
                        return (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-5 d-flex" key={book.id}>
                                <Book book={book} />
                                <p>
                                    <span> Price for 1 book</span>
                                    <span> {book.price}$ </span>
                                </p>
                                <label>
                                    Quantity
                                    <input id="count" type="number" min={1} max={42} value={book.count} book-id={book.id} onChange={handleCountInput} inputMode="numeric" />
                                </label>
                                <p>
                                    <span> Price</span>
                                    <span> {priceForItem}$ </span>
                                </p>
                                <button book-id={book.id} onClick={handleRemove}>Remove</button>
                            </div>
                        );
                    })}
                </div>
            )
            
        }
            <div>
                <span>Total Price</span>
                <span> {totalPrice}$ </span>
            </div>
        
            <button onClick={handleRemoveAll} disabled={addedBooks.length === 0}>Purchase</button>
        </>
    )
}