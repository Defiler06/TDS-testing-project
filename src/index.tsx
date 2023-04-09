import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import App from "./App";
import ReactDOM from 'react-dom/client';
// import contactReducer from "./store/contactSlice";
import infoSlices from "./store/infoSlices";

const store = configureStore({
    reducer: {
        countries: infoSlices
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);