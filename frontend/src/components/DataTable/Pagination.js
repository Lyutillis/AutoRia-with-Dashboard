import React, { useEffect, useState } from 'react';


const Pagination = ({ carsPerPage, totalCars, setCurrentPage, currentPage }) => {
    const [rightMost, setRightMost] = useState(0)
    const [leftMost, setLeftMost] = useState(Math.ceil(totalCars / carsPerPage))
    const pageNumbers = [];
    const pageLimit = 9;

    for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const nextPage = () => {
        setCurrentPage( prev => prev + 1 )
    }

    const prevPage = () => {
        setCurrentPage( prev => prev - 1 )
    }

    const firstPage = () => {
        setCurrentPage( 1 )
    }

    const lastPage = () => {
        setCurrentPage( pageNumbers[pageNumbers.length - 1] )
    }

    useEffect(
        () => {
            setRightMost(currentPage <= Math.ceil(pageLimit/2) ? 0 : Math.min(currentPage - Math.ceil(pageLimit/2), Math.ceil(totalCars/carsPerPage) - pageLimit));
            setLeftMost(currentPage <= Math.ceil(pageLimit/2) ? pageLimit : currentPage + Math.floor(pageLimit/2));
        }
    , [currentPage, carsPerPage, totalCars])
    
    return (
        <div className='text-center my-5'>
            <div className="btn-group" role="group">
                <button
                    type="button"
                    onClick={firstPage}
                    className={
                        currentPage===1  ? "btn btn-outline-primary disabled" : "btn btn-outline-primary" }
                >
                    First
                </button>
                <button
                    type="button"
                    onClick={prevPage}
                    className={
                        currentPage===1  ? "btn btn-outline-primary disabled" : "btn btn-outline-primary" }
                >
                    Previous
                </button>
                {
                    pageNumbers.slice(rightMost, leftMost).map(number => (
                            <button type="button" className={number === currentPage ? "btn btn-outline-primary active" : "btn btn-outline-primary"} onClick={() => paginate(number)} key={number}>
                                {number}
                            </button>
                    ))
                }
                <button
                    type="button"
                    onClick={ nextPage }
                    className= {currentPage===pageNumbers[pageNumbers.length - 1] ? "btn btn-outline-primary disabled" : "btn btn-outline-primary" }
                >
                    Next
                </button>
                <button
                    type="button"
                    onClick={ lastPage }
                    className= {currentPage===pageNumbers[pageNumbers.length - 1] ? "btn btn-outline-primary disabled" : "btn btn-outline-primary" }
                >
                    Last
                </button>
            </div>
        </div>
  )
}


export default Pagination;
