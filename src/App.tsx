import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Recipe from "./components/Recipe";
import Footer from "./components/Footer";

import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Header />
                <SearchResults />
                <Recipe />
                <Footer />
            </div>
        </div>
    );
}

export default App;
