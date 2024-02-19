import Navbar from '../Navbar/Navbar';
import styles from './SpecificBook.module.scss';


export default function SpecificBook (){
    return (
        <>
            <Navbar />
            <section className={styles.specificBook}>
                <div className={styles.specificBook_Wrapper}>
                    <div className={styles.specificBook_image}>
                        <img src="https://courses.prometheus.org.ua/asset-v1:Ciklum+FEB101+2022_T3+type@asset+block@javascript_the_definitive_guide.jpg"
                            alt="book" width="250px" height="330px" />
                    </div>
                    <div className={styles.specificBook_generalInfa}>
                        <p>Book name: <span>Javascript</span></p>
                        <p>Book author: <span>Haverbeke</span></p>
                        <p>Book level: <span>Beginner</span></p>
                        <p>Book tags: <span>core</span></p>
                    </div>
                    <div className={styles.specificBook_placeToBay}>
                        <div>
                            <span>price,$</span>
                            <span id="price">17</span>
                        </div>
                        <div>
                            <span>Count</span>
                            <input id="count" type="number" min={1} max={42} />
                        </div>
                        <div>
                            <span>Total price</span>
                            <span id="totalPrice"></span>
                        </div>
                        <button>Add to cart</button>
                    </div>
                </div>
                <div className={styles.specificBook_descriptionInfa}>
                    <span>Description</span>
                    <p>JavaScript is the programming language of the web and is used by more software developers today
                        than any other
                        programming language. For nearly 25 years this best seller has been the go-to guide for
                        JavaScript programmers. The
                        seventh edition is fully updated to cover the 2020 version of JavaScript, and new chapters cover
                        classNamees, modules,
                        iterators, generators, Promises, async/await, and metaprogramming. You’ll find illuminating and
                        engaging example code
                        throughout. This book is for programmers who want to learn JavaScript and for web developers who
                        want to take their
                        understanding and mastery to the next level. It begins by explaining the JavaScript language
                        itself, in detail, from the
                        bottom up. It then builds on that foundation to cover the web platform and Node.js.</p>
                </div>
            </section>
        
        </>
        
        
    )
}