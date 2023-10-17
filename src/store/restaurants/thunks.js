import { setRestaurants, setLoading, setSelectedRestaurant } from "./"
import { getRestaurantList } from "../../api";

export const getRestaurants = () => {
    return async (dispatch) => {
        dispatch(setLoading());
        const restaurantList = await getRestaurantList()
        if (restaurantList.status === 200){
            dispatch(setRestaurants(restaurantList.data))
        }
        else{
            // There should be a better way to handle this
            dispatch(setRestaurants([]));
        }
    }
}

export const setCurrentRestaurant = (restaurantIndex) => {
    return (dispatch) => {
        dispatch(setSelectedRestaurant({index: restaurantIndex}));
    }
}