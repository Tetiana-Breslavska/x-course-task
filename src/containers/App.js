import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from "react-router-dom";
import { BooksProvider } from '../context/use-books';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import styles from './App.module.scss';


function App() {
  const [addedBooks, setAddedBooks] = useState(LocalStorageService.get(LS_KEYS.ADDEDBOOKS) || []);
  const [books, setBooks] = useState(LocalStorageService.get(LS_KEYS.BOOKS) || []);
  useEffect(() => LocalStorageService.set(LS_KEYS.ADDEDBOOKS, addedBooks), [addedBooks]);
  useEffect(() => LocalStorageService.set(LS_KEYS.BOOKS, books), [books]);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/books.json`)
      .then(res => res.json())
      .then(data => setBooks(data.books))
      .catch(err => console.log('error: ', err)
      );
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <NotFoundPage />
      }
    >
      <BooksProvider value={{
          books,
          addedBooks,
          setAddedBooks
        }}>
          <div className={styles.app}>
            <Header />
            <Outlet />
            <Footer />
          </div>
        </BooksProvider>
    </ErrorBoundary>
  );
}

export default App;
