import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const DropdownRestaurants = ({ restaurants}) => {
    const { restaurant } = useParams();
    const [selectedRestaurant, setSelectedRestaurant] = useState(restaurant);
    const navigate = useNavigate();

    const handleRestaurantChange = (event) => {
        // Handles the change on Restaurant value
        const selectedSlug = event.target.value;
        setSelectedRestaurant(selectedSlug);
        navigate(`/${selectedSlug}/tickets`);
      };

    useEffect(() => {
        // Handle the default selection when the restaurant param changes
        setSelectedRestaurant(restaurant);
      }, [restaurant]);

    return (
        <>
            <label>
                Restaurant:
                <select name="selectRestaurant" 
                value={selectedRestaurant}
                onChange={handleRestaurantChange}
                >
                    {
                        restaurants.map(({ name, slug, id }) => {
                            return (
                                <option key={id} value={slug}>{name}</option>
                            )
                        })

                    }
                </select>
            </label>
        </>
    )
}