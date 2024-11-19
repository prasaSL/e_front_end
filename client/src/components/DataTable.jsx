import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useDispatch, useSelector } from 'react-redux';
import { updateFavorites } from '../redux/user/userSlice';
import Button from '@mui/material/Button';
import {   Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import { Navigate, useNavigate } from 'react-router-dom';

export default function DataTable({ rows = [] }) {
  const dispatch = useDispatch();
 

  const {currentUser}= useSelector(state=>state.user);

  const favorites = currentUser.user?.favorites || [];

  const userID = currentUser.user?._id;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
 
const navigate = useNavigate();
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

   // Function to handle dialog open
   const handleDialogOpen = (id) => {
    setDeleteId(id);
   
    setDeleteDialogOpen(true);
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }
      const data = await response.json();
      console.log(data);
     let updatedRows = rows.filter((row) => row._id !== id);
      console.log(updatedRows);
      rows = updatedRows;
      location.reload();

    } catch (error) {
      console.error(error);
    }
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
                  <EditIcon onClick={() => navigate(`/product/update/${row._id}`)} />
                  <DeleteIcon 
                    onClick={() => handleDialogOpen(row._id)}
                  />

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
      <Dialog
      open={deleteDialogOpen}
      onClose={handleDialogClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent
        sx={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <ErrorIcon
          sx={{ fontSize: "50px", color: "red", marginBottom: "16px" }}
        />
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          ARE YOU SURE?
        </Typography>
        <Typography variant="body2" color="textSecondary">
          You will not be able to undo this action if you proceed!
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <Button
          onClick={handleDialogClose}
          variant="outlined"
          sx={{
            borderColor: "#000",
            color: "#000",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f1f1f1",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete(deleteId);
            handleDialogClose();
          }}
          variant="contained"
          sx={{
            backgroundColor: "#0028FF",
            color: "#fff",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#001FCC",
            },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
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