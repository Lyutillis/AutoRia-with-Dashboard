import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy , numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const headCells = [
        {
            id: 'id',
            numeric: true,
            disablePadding: true,
            label: 'ID',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'price_usd',
            numeric: true,
            disablePadding: false,
            label: 'Price, USD',
        },
        {
            id: "odometer",
            numeric: true,
            disablePadding: false,
            label: "Odometer",
        },
        {
            id: "car_number",
            numeric: false,
            disablePadding: false,
            label: "Car Number",
        },
        {
            id: "car_vin",
            numeric: false,
            disablePadding: false,
            label: "Car VIN",
        },
        {
            id: "username",
            numeric: false,
            disablePadding: false,
            label: "Seller username",
        },
        {
            id: "phone_number ",
            numeric: false,
            disablePadding: false,
            label: "Phone number",
        },
        {
            id: "image_url",
            numeric: false,
            disablePadding: false,
            label: "Main image",
        },
        {
            id: "images_count",
            numeric: true,
            disablePadding: false,
            label: "Images Count",
        },
        {
            id: "datetime_found",
            numeric: false,
            disablePadding: false,
            label: "Date and Time Found",
        },
    ];
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


export default EnhancedTableHead;
