import { useState, useEffect } from 'react';
import styles from './BookList.module.scss';
import Navbar from '../Navbar/Navbar';
import Book from '../Book/Book';


export default function BookList() {
    const [books, setBooks] = useState(null);
    // const [loaded, setLoaded] = useState(false);

    // Fetch Function 
    useEffect(() => {
        fetch('./books.json')
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .catch(err => console.log('error: ', err)
            );

    }, [])
    console.log(books);

        return (
            <>
                <Navbar />
                <div className={styles.bookList}>
                    <div className="container p-3 book-list-content">
                        <form action="">
                            <input type="text" id="inputSearchByBookName" placeholder="Search by book name" />
                            <input type="number" id="inputSearchByPrice" placeholder="Price" />
                        </form>
                        <section>
                            <h1>all books</h1>
                            <div className="container">
                                {/* <div className={styles.booksList_content} id="booksListWrapper"> */}
                                    <div className="row">
                                        {books ? books.map(function (book) {
                                            return (
                                                <div className="col-lg-3 col-md-4 col-sm-6 mb-5" key={book.id}>
                                                    <Book book={book} />
                                                </div>
                                            );
                                        }): ""
                                        }

                                    {/* </div> */}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        )
}