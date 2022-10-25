import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// import store, { persistor } from "./store";
import store from "./store";

// import Spinner from "./components/Spinner";

if (document.getElementById("root")) {
    const root = ReactDOM.createRoot(document.getElementById("root") as Element);
    root.render(
        <Provider store={store}>
            {/* <PersistGate persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
        </Provider>
    );
}
