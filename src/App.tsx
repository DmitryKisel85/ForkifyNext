import Header from "./components/Header";

import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Header />
            </div>
        </div>
    );
}

export default App;
