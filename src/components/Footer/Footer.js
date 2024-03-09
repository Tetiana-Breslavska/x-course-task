import styles from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p>Виконано в <a href='https://prometheus.org.ua/' target="_blank" rel="noreferrer"> Prometheus </a> © 2024</p>
            </div>
        </footer>
    )
}