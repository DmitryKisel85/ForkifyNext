import logo from "../../assets/logo.png";

import SearchBox from "../SearchBox";
import HeaderNavigation from "../HeaderNavigation";

import styles from "./header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.headerLogo} />
            <SearchBox />
            <HeaderNavigation />
        </header>
    );
};

export default Header;
