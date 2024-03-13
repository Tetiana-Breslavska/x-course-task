import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../../context/use-user';
import { useBooks } from '../../context/use-books';
import { LocalStorageService } from "../../services/localStorage";
import styles from './Navbar.module.scss';

export default function Navbar() {
    const [ totalCount, setTotalCount ] = useState(0);
    const { user, setUser } = useUser();
    const { addedBooks } = useBooks();
    const [isMarked, setIsMarked] = useState(false);
    const style = {
        color: isMarked ? '#dc3545' : '',
        transition: '0.2s', 
    };

    useEffect(()=>{
        setTotalCount(addedBooks.reduce((acc, curr) => {return acc + curr.count}, 0));
        setIsMarked(true);
        setTimeout(() => {
            setIsMarked(false);
        }, 200);
    }, [addedBooks])

    const clean = () => {
        LocalStorageService.removeAll();
        setUser('');
    };

    return (
        <nav className={styles.navbar}>
            <div className='container d-flex justify-content-end'>
                <Link to="/bookList">
                    <i className="fa-solid fa-book"></i>
                </Link>
                <Link className={styles.cart_icon} to="/cart">
                    <i style={style}  className="fa-solid fa-cart-shopping"></i>
                    <span  className={styles.cart_counter} >{totalCount}</span>
                </Link>
                <p>
                    <i className="fa-solid fa-user-large"></i>
                    <span className={styles.user}>{user}</span>
                </p>
                <Link onClick={clean} to="/">
                    <i className="fa-solid fa-person-walking-dashed-line-arrow-right"></i>
                </Link>
            </div>
        </nav>
    )
}