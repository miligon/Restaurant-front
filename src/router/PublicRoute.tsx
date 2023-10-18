import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

interface PrivateRouteProps {
  children: React.ReactNode,
}

export const PublicRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { logged } = useSelector((state: RootState) => state.auth)
  const { restaurants, status } = useSelector(
    (state: RootState) => state.restaurants,
  )

  return (
    <>
      {!logged ? (
        children
      ) : // If is logged redirect to the first restaurant page
      status == 'loaded' ? (
        <Navigate to={`/${restaurants[0].slug}/tickets`} />
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  )
}

export default PublicRoute
