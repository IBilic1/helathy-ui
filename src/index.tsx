import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {AuthProvider} from "./auth/AuthProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
