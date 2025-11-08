import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./containers/Admin/context";
import './index.css'



/*const { store, persistor } = reduxStore()*/
import { AuthProvider } from './services/auth.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

        <BrowserRouter>
            <ThemeProvider>
                <MaterialTailwindControllerProvider>
                <React.StrictMode>
                <AuthProvider>
                    <App />
                </AuthProvider>
                </React.StrictMode>
                </MaterialTailwindControllerProvider>
            </ThemeProvider>
        </BrowserRouter>

)

