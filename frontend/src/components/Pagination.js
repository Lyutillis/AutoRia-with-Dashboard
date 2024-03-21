
import React from 'react';


const Pagination = ({ carsPerPage, totalCars, paginate, nextPage, prevPage, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalCars / carsPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <div className='justify-content-center my-4'>
            <ul className='pagination justify-content-center'>
                <li className={currentPage===1  ? "page-item disabled":"page-item"}>
                    <button 
                        className='btn page-link'
                        onClick={prevPage}
                    >
                        Previous
                    </button>
                </li>
                {
                    pageNumbers.map(number => (
                        <li className='page-item' key={number}>
                            <button className='btn page-link' onClick={() => paginate(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
                <li className={currentPage===pageNumbers[pageNumbers.length - 1]  ? "page-item disabled":"page-item"}>
                    <button
                        className='btn page-link'
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
  )
}


export default Pagination;
