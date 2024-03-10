import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styles from './BookList.module.scss';
import Navbar from '../Navbar/Navbar';
import Book from '../Book/Book';
import { useBooks } from '../../context/use-books';


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
        setSearchByBookName(value);
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
                                }) : ""
                                }
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}


// export default function BookList() {
//     const [bookData, setBookData] = useState({
//         allBooks: null,
//         filteredByPrice: [],
//         filteredGeneral: [],
//         searchByPrice: '',
//         searchByBookName: ''
//     });

//     useEffect(() => {
//         fetch('./books.json')
//             .then(res => res.json())
//             .then(data => setBookData(prevState => ({
//                 ...prevState,
//                 allBooks: data.books
//             })))
//             .catch(err => console.error('Error fetching books:', err));
//     }, []);

//     useEffect(() => {
//         const { allBooks, searchByPrice } = bookData;
//         if (allBooks && searchByPrice) {
//             const [min, max] = JSON.parse(searchByPrice);
//             setBookData(prevState => ({
//                 ...prevState,
//                 filteredByPrice: allBooks.filter(book => max ? (book.price >= min && book.price <= max) : (book.price >= min))
//             }));
//         }
//     }, [bookData.allBooks, bookData.searchByPrice]);

//     useEffect(() => {
//         const { allBooks, filteredByPrice, searchByBookName } = bookData;
//         if (allBooks) {
//             setBookData(prevState => ({
//                 ...prevState,
//                 filteredGeneral: (filteredByPrice.length === 0 ? allBooks : filteredByPrice).filter(book => book.title.toLowerCase().includes(searchByBookName))
//             }));
//         }
//     }, [bookData.allBooks, bookData.filteredByPrice, bookData.searchByBookName, bookData.searchByPrice]);

//     const handleInput = event => {
//         const { value } = event.target;
//         setBookData(prevState => ({
//             ...prevState,
//             searchByBookName: value
//         }));
//     };

//     const handleSelect = event => {
//         const { value } = event.target;
//         setBookData(prevState => ({
//             ...prevState,
//             searchByPrice: value
//         }));
//     };

//     return (
//         <>
//             <Navbar />
//             <div className={styles.bookList}>
//                 <div className="container p-3 book-list-content">
//                     <form action="">
//                         <label>
//                             Book:
//                             <input type="text" id="inputSearchByBookName" placeholder="Search by book name" onChange={handleInput} />
//                         </label>
//                         <label>
//                             Price:
//                             <select type="number" id="inputSearchByPrice" onChange={handleSelect} >
//                                 <option value="[0]" selected>All books</option>
//                                 <option value="[0, 15]">up to 15$</option>
//                                 <option value="[15, 30]">15$ - 30$</option>
//                                 <option value="[30]">30$ and more</option>
//                             </select>
//                         </label>
//                     </form>
//                     <section>
//                         <h1>all books</h1>
//                         <div className="container">
//                             <div className="row">
//                                 {bookData.allBooks ? bookData.filteredGeneral.map(book => (
//                                     <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={book.id}>
//                                         <Book book={book} />
//                                     </div>
//                                 )) : ""}
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// }