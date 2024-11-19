import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export default function SearchResultPage() {
  const [results, setResults] = useState([]);
  const [rows, setRows] = useState([]); // Initialize as an empty array
  const location = useLocation();
 const navigate = useNavigate();
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      getProducts(query);
    }
  }, [location.search]);

  const getProducts = async (query) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products`);
      const data = await response.json();
      setRows(data.products || []); // Ensure products is an array

      // Filter rows to only include products that match the search query
      const filteredRows = data.products.filter((row) =>
        row.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredRows);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container maxWidth="lg">
    <Typography variant="h4" gutterBottom>
      Products
    </Typography>
    <SearchBar />
    <div>
      {results.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {results.map((result) => (
           <Card key={result._id} style={{ width: "100%" }} className='mt-4 d-flex '>
           <CardContent>
             <Typography variant="h6" color="textSecondary">
               #{result.sku}
             </Typography>
             <Typography variant="h5" component="div">
               {result.name}
             </Typography>
             <Typography variant="body2" color="textSecondary">
               {result.description}
             </Typography>
           </CardContent>
           <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
             <CardActions>
               <Button size="small" color="primary">
                 <ArrowForwardIosIcon
                 onClick={() => navigate(`/product/view/${result._id}`)} 
                 />
               </Button>
             </CardActions>
           </Box>
         </Card>
          ))}
        </div>
      )}
    </div>
  </Container>
  );
}