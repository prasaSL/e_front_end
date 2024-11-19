import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import { Box, Container, hexToRgb, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import DataTable from '../components/DataTable';
export default function Home() {
  const [rows, setRows] = useState();
  useEffect(() => {
   getProducts();
  }, []);

 const getProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
      const data = await response.json();
      setRows(data.products);
      console.log(data.products);
    } catch (error) {
      console.error(error);
    }
  }



  


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


