import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRestaurantList } from '../api/ticketsApi';


export const PublicRoute = ({ children }) => {

    const { logged } = useSelector( state => state.auth);
    
    const navigate = useNavigate();

    // If is logged redirect to the first restaurant page
    const redirect = () => {
        getRestaurantList()
            .then((res) => {
                const url = `/${res[0].slug}/tickets`
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