import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthentication } from '../store/auth';


export const PrivateRoute = ({ children }) => {

    const dispatch = useDispatch();
    const { logged } = useSelector( state => state.auth);

    useEffect(() => {
        if (!logged){
            dispatch( checkAuthentication() );
        }
    },[])

    
    return (logged)
        ? children
        : <Navigate to={"/login"}/>
}

export default PrivateRoute