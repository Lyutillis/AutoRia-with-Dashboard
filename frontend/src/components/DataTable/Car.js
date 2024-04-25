import React from "react";
import ImagePreview from "./ImagePreview";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';



const getFormattedDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
}


const Car = ({ row, index, selected, setSelected }) => {

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const isItemSelected = isSelected(row.id);
    const labelId = `enhanced-table-checkbox-${index}`;

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
        setSelected(newSelected);
      };

    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                        'aria-labelledby': labelId,
                    }}
                />
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                {Number(row.id)}
            </TableCell>
            <TableCell align="right"><a href={row.url}>{row.title}</a></TableCell>
            <TableCell align="right">{Number(row.price_usd)}</TableCell>
            <TableCell align="right">{Number(row.odometer)}</TableCell>
            <TableCell align="right">{row.car_number}</TableCell>
            <TableCell align="right">{row.car_vin}</TableCell>
            <TableCell align="right">{row.username}</TableCell>
            <TableCell align="right">{row.phone_number}</TableCell>
            <TableCell align="right"><ImagePreview image_url={row.image_url} /></TableCell>
            <TableCell align="right">{Number(row.images_count)}</TableCell>
            <TableCell align="right">{getFormattedDate(row.datetime_found)}</TableCell>
        </TableRow>
    )
}

export default Car;
