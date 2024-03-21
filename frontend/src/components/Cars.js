import React from "react";
import ImagePreview from "./ImagePreview";


const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
}


const Cars = ({ cars, loading }) => {
    
    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <tbody>
            { cars.map((car) => (
                    <tr key={ car.id }>
                        <td>{ car.id }</td>
                        <td><a href={ car.url }>{ car.title }</a></td>
                        <td>{ car.price_usd }</td>
                        <td>{ car.odometer }</td>
                        <td>{ car.car_number }</td>
                        <td>{ car.car_vin }</td>
                        <td>{ car.username }</td>
                        <td>{ car.phone_number }</td>
                        <ImagePreview image_url={ car.image_url } />
                        <td>{ car.images_count }</td>
                        <td>{ getFormattedDate(car.datetime_found) }</td>
                    </tr>
                ))}
        </tbody>
    )
}

export default Cars;
