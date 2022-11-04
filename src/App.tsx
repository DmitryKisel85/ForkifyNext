import { useEffect } from "react";
import { useAppDispatch } from "./hooks/typedHooks";
import { changeViewportSizes } from "./store/viewport/viewportSlice";

import Header from "./components/Header";
import SearchResults from "./components/SearchResults";
import Recipe from "./components/Recipe";
import Footer from "./components/Footer";

import styles from "./App.module.scss";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleWindowResize = () => {
            dispatch(changeViewportSizes({ width: window.screen.width, height: window.screen.height }));
        };

        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [dispatch]);

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
