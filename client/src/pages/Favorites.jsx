import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import DataTable from '../components/DataTable';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';

export default function Favorites() {
  const { currentUser } = useSelector((state) => state.user);
  const favorites = currentUser.user?.favorites || [];

  const [rows, setRows] = useState([]); // Initialize as an empty array
  const [favoritesRows, setFavoritesRows] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      // Filter rows to only include favorites
      const filteredRows = rows.filter((row) => favorites.includes(row._id));
      setFavoritesRows(filteredRows);
    }
  }, [rows, favorites]);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/products`
      );
      const data = await response.json();
      setRows(data.products || []); // Ensure products is an array
      console.log(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box
          sx={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#162427',
          }}
          className="mt-5 mb-5"
        >
          FAVORITE PRODUCTS
        </Box>

        <SearchBar />

        <DataTable rows={favoritesRows} />
      </Container>
    </>
  );
}
