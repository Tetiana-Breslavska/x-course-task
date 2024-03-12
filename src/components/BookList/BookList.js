import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useBooks } from '../../context/use-books';
import Navbar from '../Navbar/Navbar';
import Book from '../Book/Book';
import styles from './BookList.module.scss';


export default function BookList() {
    const {books} = useBooks();
    const [searchByPrice, setSearchByPrice] = useState('');
    const [searchByBookName, setSearchByBookName] = useState('');
    const [filteredBooksByPrice, setFilteredBooksByPrice] = useState([]);
    const [filteredBooksGeneral, setFilteredBooksGeneral] = useState([]);

    useEffect(() => {
        if (books && searchByPrice) {
            const [min, max] = JSON.parse(searchByPrice);
            setFilteredBooksByPrice(books.filter((book) => {
                if (max) {
                    return (book.price >= min && book.price <= max)
                }
                else {
                    return (book.price >= min)
                }
            }));
        }
    }, [books, searchByPrice]);

    useEffect(() => {
        if (books) {
            setFilteredBooksGeneral((filteredBooksByPrice.length === 0 ? books : filteredBooksByPrice).filter((book) => book.title.toLowerCase().includes(searchByBookName)));
        }
    }, [books, filteredBooksByPrice, searchByBookName, searchByPrice]);


    const debouncedHandleInput = debounce((value) => {
        setSearchByBookName(value.toLowerCase());
    }, 500);

    const handleInput = (event) => {
        debouncedHandleInput(event.target.value);
    }

    const handleSelect = (event) => {
        setSearchByPrice(event.target.value);
    }

    return (
        <>
            <Navbar />
            <div className={styles.bookList}>
                <div className="container p-3">
                    <form action="">
                        <label>
                            Book:
                            <input type="text" placeholder="Search by book name" onChange={handleInput} />
                        </label>
                        <label>
                            Price:
                            <select type="number" id="inputSearchByPrice" onChange={handleSelect} >
                                <option value="[0]">All books</option>
                                <option value="[0, 15]">up to 15$</option>
                                <option value="[15, 30]">15$ - 30$</option>
                                <option value="[30]">30$ and more</option>
                            </select>
                        </label>
                    </form>
                    <section>
                        <h1>All books</h1>
                        <div className={`container ${styles.containerWrap}`}>
                            <div className="row">
                                {books ? filteredBooksGeneral.map(function (book) {
                                    return (
                                        <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={book.id}>
                                            <div className="p-3 rounded bg-warning-subtle flex-column h-100">
                                                <Book book={book} />
                                            </div>
                                        </div>
                                    );
                                }) : "is loaded..."
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
