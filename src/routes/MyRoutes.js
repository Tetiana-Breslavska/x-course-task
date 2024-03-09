import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginProvider } from '../context/use-login';
import { LocalStorageService, LS_KEYS } from '../services/localStorage';
import App from '../containers/App';
import Signin from '../components/Signin/Signin';
import BookList from '../components/BookList/BookList';
import SpecificBook from '../components/SpecificBook/SpecificBook';
import Cart from '../components/Cart/Cart';
import NotFoundPage from '../components/NotFoundPage/NotFoundPage';


export default function MyRoutes() {
    const [login, setLogin] = useState(LocalStorageService.get(LS_KEYS.LOGIN) || false
    );
    useEffect(() => LocalStorageService.set(LS_KEYS.LOGIN, login), [login]);

    return (
        <LoginProvider value={{
            login,
            setLogin,
        }}>
            <Routes >
                <Route path='/' element={<App />}>
                    <Route index element={<Signin />} />
                    <Route path='/bookList' element={login ? <BookList /> : <Navigate to={'/'} />} />
                    <Route path='/specificBook/:bookId' element={login ? <SpecificBook /> : <Navigate to={'/'} />} />
                    <Route path='/cart' element={login ? <Cart /> : <Navigate to={'/'} />} />
                    <Route path='/*' element={<NotFoundPage />} />
                </Route>
            </Routes>

        </LoginProvider>
    )
}

