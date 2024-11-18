import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Box, Container, hexToRgb, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import DataTable from '../components/DataTable';
export default function Home() {

  
  const [rows, setRows] = useState([
    {id:1, sku: '12345', image: 'https://drive.google.com/file/d/13M-k-2o9i3yFreFAix5Npo3bIuQlTSxE/view?usp=drive_link', imageLink: 'https://drive.google.com/file/d/13M-k-2o9i3yFreFAix5Npo3bIuQlTSxE/view?usp=drive_link', name: 'Product 1', price: '$10' },
    {id:2, sku: '67890', image: 'https://drive.google.com/file/d/13M-k-2o9i3yFreFAix5Npo3bIuQlTSxE/view?usp=drive_link', imageLink: 'https://drive.google.com/file/d/13M-k-2o9i3yFreFAix5Npo3bIuQlTSxE/view?usp=drive_link', name: 'Product 2', price: '$20' },
    // Add more rows as needed
  ]);

  const handleSearch = (searchTerm) => {
    const filteredRows = rows.filter((row) => {
      return row.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setRows(filteredRows);
  }

  return (
    <>

   
  <Container maxWidth="lg" >
  <Box 
  sx={{
    fontSize: "36px",
    fontWeight: 700,
    color: "#162427",
   
  }}
  className="mt-5 mb-5"
  >
    PRODUCTS
    </Box>
  
  <SearchBar onSearch={handleSearch} />

  <DataTable rows={rows} />

  </Container>
    </>
  )
}


