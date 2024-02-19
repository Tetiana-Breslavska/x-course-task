import { Routes, Route } from 'react-router-dom';
import App from '../../App';
import Signin from '../Signin/Signin';
import BookList from '../BookList/BookList';
import SpecificBook from '../SpecificBook/SpecificBook';
import CartEmpty from '../CartEmpty/CartEmpty';
import NotFoundPage from '../NotFoundPage/NotFoundPage';


export default function MyRoutes() {
    return (
        <Routes>
            <Route exact path='/' element={<App />}>
                <Route path='/' element={<Signin />} />
                <Route path='/bookList' element={<BookList />} />
                <Route path='/specificBook' element={<SpecificBook />} />
                <Route path='/cart' element={<CartEmpty />} />
                <Route path='/*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    )
}