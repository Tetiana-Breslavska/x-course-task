import { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { UserProvider } from '../context/use-user';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';


function App() {
  const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USER) || '');
  const [addedBooks, setAddedBooks] = useState(LocalStorageService.get(LS_KEYS.ADDEDBOOKS) || []);
  useEffect(() => LocalStorageService.set(LS_KEYS.USER, user), [user]);
  useEffect(() => LocalStorageService.set(LS_KEYS.ADDEDBOOKS, addedBooks), [addedBooks]);


  return (
    <UserProvider value={{
      user,
      setUser,
      addedBooks,
      setAddedBooks
    }}>
      <div className="App">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserProvider>
  );
}

export default App;
