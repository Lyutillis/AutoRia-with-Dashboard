import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import fetchData from "../getData";
import Car from "./Car.js"
import Pagination from "./Pagination";


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const url = "http://127.0.0.1:8000/cars";

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(10);

  useEffect(() => {
    fetchData(url, setLoading, setCars)
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = cars.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const visibleRows = useMemo(
    () =>
      stableSort(cars, getComparator(order, orderBy)).slice(
        (currentPage - 1) * carsPerPage,
        (currentPage - 1) * carsPerPage + carsPerPage,
      ),
    [cars, order, orderBy, currentPage, carsPerPage],
  );

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <Box sx={{ width: '100%', my: 5 }}>
      <Paper sx={{ width: '95%', mx: 5, my: "auto", }}>
        <EnhancedTableToolbar numSelected={selected.length} setCarsPerPage={setCarsPerPage} />
        <Table
          sx={{ 
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
          size={'medium'}
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={cars.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              return (
                <Car key={row.id} row={row} index={index} selected={selected} setSelected={setSelected} />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      <Pagination carsPerPage={carsPerPage} totalCars={cars.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </Box>
  );
}