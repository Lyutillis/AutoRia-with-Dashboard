import React, { useState, useEffect } from "react";
import axios from "axios";
import ImagePreview from "./ImagePreview";
import "./Table.css";


const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
}


const Table = () => {
    const [cars, setCars] = useState([]);

    useEffect(
        () => {
            axios.get("http://127.0.0.1:8000/cars")
            .then(response => {
                setCars(response.data);
            })
            .catch((ex) => console.log("Error fetching data:", ex));
    }, [])

    return (
        <table>
            <thead>
                <tr className="head">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price, USD</th>
                    <th>Odometer</th>
                    <th>Car Number</th>
                    <th>Car VIN</th>
                    <th>Seller Username</th>
                    <th>Phone Number</th>
                    <th>Image url</th>
                    <th>Images count</th>
                    <th>Date and Time found</th>
                </tr>
            </thead>
            <tbody>
                { cars.map((car) => {
                    return (
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
                    )
                }) }
            </tbody>
        </table>
    )
}

export default Table;
