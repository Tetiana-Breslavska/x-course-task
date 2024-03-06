import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useUser } from '../../context/use-user';
import styles from './Navbar.module.scss';
import { LocalStorageService } from "../../services/localStorage";

export default function Navbar() {
    const [ totalCount, setTotalCount ] = useState(0);
    const { user, setUser } = useUser();
    const { addedBooks } = useUser();
    const [isEnlarged, setIsEnlarged] = useState(false);
    const style = {
        fontSize: isEnlarged ? '16px' : '', 
        transition: 'font-size 0.5s', 
    };

    useEffect(()=>{
        setTotalCount(addedBooks.reduce((acc, curr) => {return acc + curr.count}, 0));
        setIsEnlarged(true);

        setTimeout(() => {
            setIsEnlarged(false);
        }, 1000);
    }, [addedBooks])

    const clean = () => {
        LocalStorageService.removeAll();
        setUser('');
    };

    return (
        <nav className={styles.navbar}>
            <div className='container d-flex justify-content-end'>
                <Link to="/bookList">
                    <i class="fa-solid fa-book"></i>
                </Link>
                <Link className={styles.cart_icon} to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span style={style} className={styles.cart_counter} >{totalCount}</span>
                </Link>
                <p>
                    <i className="fa-solid fa-user-large"></i>
                    <span className={styles.userName}>{user}</span>
                </p>
                <Link onClick={clean} to="/">
                    <i class="fa-solid fa-person-walking-dashed-line-arrow-right"></i>
                </Link>
            </div>


        </nav>
    )
}