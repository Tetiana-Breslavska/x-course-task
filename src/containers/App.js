import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { UserProvider } from '../context/use-user';
import { BooksProvider } from '../context/use-books';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import styles from './App.module.scss';


function App() {
  const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USER) || '');
  const [addedBooks, setAddedBooks] = useState(LocalStorageService.get(LS_KEYS.ADDEDBOOKS) || []);
  const [books, setBooks] = useState(LocalStorageService.get(LS_KEYS.BOOKS) || []);
  useEffect(() => LocalStorageService.set(LS_KEYS.USER, user), [user]);
  useEffect(() => LocalStorageService.set(LS_KEYS.ADDEDBOOKS, addedBooks), [addedBooks]);
  useEffect(() => LocalStorageService.set(LS_KEYS.BOOKS, books), [books]);

  useEffect(() => {
    fetch('./books.json')
      .then(res => res.json())
      .then(data => setBooks(data.books))
      .catch(err => console.log('error: ', err)
      );
  }, []);

  return (
    <UserProvider value={{
      user,
      setUser,
    }}>
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
    </UserProvider>
  );
}

export default App;
