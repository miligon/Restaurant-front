import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../auth';
import { getRestaurantList } from '../helpers/ApiConn';


export const PublicRoute = ({ children }) => {

    const { logged } = useContext( AuthContext );
    const navigate = useNavigate();

    // If is logged redirect to the first restaurant page
    const redirect = () => {
        getRestaurantList()
            .then((res) => {
                const url = `/${res.data[0].slug}/tickets`
                console.log(url)
                navigate(url, {
                    replace: true
                });
            })
    }

    return (!logged)
        ? children
        : redirect()
}

export default PublicRoute