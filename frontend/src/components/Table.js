import React, { useState, useEffect } from "react";
import fetchData from "./getData";
import Cars from "./Cars";
import Pagination from "./Pagination";
import SelectPageLimit from "./SelectPageLimit";
import "./Table.css";


const Table = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [carsPerPage, setCarsPerPage] = useState(10);

    const url = "http://127.0.0.1:8000/cars";

    useEffect(() => {
        fetchData(url, setLoading, setCars)
    }, [])

    const lastCarIndex = currentPage * carsPerPage;
    const firstCarIndex = lastCarIndex - carsPerPage;
    const currentCar = cars.slice(firstCarIndex, lastCarIndex)

    return (
        <div>
            <div className="controls">
                <SelectPageLimit setCarsPerPage={ setCarsPerPage } />
            </div>
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
                <Cars cars={ currentCar } loading={ loading } />
            </table>
            <Pagination carsPerPage={carsPerPage} totalCars={cars.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
    )
}

export default Table;
