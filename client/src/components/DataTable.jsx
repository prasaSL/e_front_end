import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function DataTable({ rows }) {
  return (
    <TableContainer className="mt-5">
      <Table>
        <TableHead
          sx={{
            "& th": {
              fontSize: "19px", // Font size for all header cells
              fontWeight: 700, // Bold font weight for all header cells
              color: "#001EB9", // Text color
              border: 'none',
            },
          }}
        >
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell align="right">IMAGE</TableCell>
            <TableCell align="right">PRODUCT NAME</TableCell>
            <TableCell align="right">PRICE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "& td": {
                  fontSize: "19px", // Font size for all body cells
                },
              }}
            >
              <TableCell sx={{ color: "#969191" }}>{row.sku}</TableCell>
              <TableCell align="right"> <img
                  src={row.image}
                  alt={row.name}
                  style={{ width: '66px', height: '66px' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/50'; }}
                /></TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell
                align="right"
                sx={{
                  "& svg": {
                    fontSize: "25px",
                    color: "#001EB9",
                    cursor: "pointer",
                    ":hover": {
                      color: "#0056b3",
                    },
                  },
                }}
              >
                <EditIcon />
                <DeleteIcon />
                <StarIcon />
                <StarOutlineIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// Define PropTypes
DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id : PropTypes.number.isRequired,
      sku: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};
