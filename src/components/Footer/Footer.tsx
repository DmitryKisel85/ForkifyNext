import styles from "./footer.module.scss";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>&copy; Design by Jonas Schmedtmann.</p>
        </footer>
    );
};

export default Footer;
