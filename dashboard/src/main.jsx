import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import {Toaster} from "sonner";
import {store} from '/src/Redux-Toolkit/store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Toaster
                position="top-right"
                expand={true}         // Allows stacked toasts
                duration={4000}       // Auto close after 4s
                richColors={true}     // Enables color variations
            />
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
