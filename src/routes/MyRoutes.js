import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from '../context/use-user';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';
import App from '../containers/App';
import Signin from '../components/Signin/Signin';
import BookList from '../components/BookList/BookList';
import SpecificBook from '../components/SpecificBook/SpecificBook';
import Cart from '../components/Cart/Cart';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';

export default function MyRoutes() {
    const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USER) || '');
    useEffect(() => LocalStorageService.set(LS_KEYS.USER, user), [user]);

    return (
        <UserProvider value={{
            user,
            setUser,
        }}>
            <Routes >
                <Route path='/' element={<App />}>
                    <Route index element={<Signin />} />
                    <Route element={<ProtectedRoute user={user}/>}>
                        <Route path='/bookList' element= {<BookList />} />
                        <Route path='/specificBook/:bookId' element={<SpecificBook />} />
                        <Route path='/cart' element={ <Cart /> } />
                    </Route>
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </UserProvider>
    )
}

