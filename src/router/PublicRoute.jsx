import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const PublicRoute = ({ children }) => {

    const { logged } = useSelector(state => state.auth);
    const { restaurants, status } = useSelector(state => state.restaurants);

    return (
        <>
            {!logged ? children
            // If is logged redirect to the first restaurant page
                : (status == 'loaded' ? 
                        (<Navigate to={`/${restaurants[0].slug}/tickets`}/>) 
                        :
                        (<h1>Loading ...</h1>)
                  )
            }
        </>
    )
}

export default PublicRoute