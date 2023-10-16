import React, { useEffect } from "react";
import { useState } from "react";


export const DropdownRestaurants = ({onRestaurantChange, restaurants}) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState("");

    const handleRestaurantChange = (event) => {
        // Handles the change on Restaurant value
        const selectedId = event.target.value;
        setSelectedRestaurant(selectedId);
        onRestaurantChange(selectedId);
        localStorage.setItem('restaurant', selectedId);
      };

    useEffect(() => {
        // Handle the default selection when the restaurant list changes
        if (restaurants.length > 0) {
          setSelectedRestaurant(restaurants[0].id);
          onRestaurantChange(restaurants[0].id);
        }
      }, [restaurants]);

      
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
                                <option key={id} value={id}>{name}</option>
                            )
                        })

                    }
                </select>
            </label>
        </>
    )
}