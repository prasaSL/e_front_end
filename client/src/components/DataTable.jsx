import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../redux/user/userSlice';

export default function DataTable({ rows = [] }) {
  const dispatch = useDispatch();
  const {currentUser}= useSelector(state=>state.user);

  const favorites = currentUser.user?.favorites || [];

  const userID = currentUser.user?._id;


  const handleFavorite = async(productId) => {

    let updatedFavorites;
    if (favorites.includes(productId)) {
      // Remove productId from favorites
      updatedFavorites = favorites.filter(id => id !== productId);
    } else {
      // Add productId to favorites
      updatedFavorites = [...favorites, productId];
    }

    const data = JSON.stringify({
      userId: userID,
      productId: productId,
    })
  
   await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/favorites`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:data,
      credentials: 'include',
    });

    await dispatch(updateFavorites(updatedFavorites));

  };

  return (
    <TableContainer className='mt-5'>
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
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "& td": {
                    fontSize: "19px", // Font size for all body cells
                  },
                }}
              >
                <TableCell sx={{ color: "#969191" }}>{row.sku}</TableCell>
                <TableCell align="right">
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/${row.mainImage}`}
                    alt={row.name}
                    style={{ width: '66px', height: '66px' }}
                  />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right"
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

                  {favorites.includes(row._id) ? (
                    <StarIcon 
                    onClick={() => handleFavorite(row._id)}
                    />
                  ) : (
                    <StarOutlineIcon 
                      onClick={() => handleFavorite(row._id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      sku: PropTypes.string.isRequired,
      mainImage: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};