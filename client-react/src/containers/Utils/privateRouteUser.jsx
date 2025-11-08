import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutesUser = () => {
    const isLogged = localStorage.getItem('isLoggedIn');
    return(
        isLogged==="true" ? <Outlet/> : <Navigate to="/login"/>
    )
    
}

export default PrivateRoutesUser