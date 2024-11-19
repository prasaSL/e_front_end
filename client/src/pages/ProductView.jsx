import { Box, Breadcrumbs, Container, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function ProductView() {

    const location = useLocation();
  
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  
  const [product, setProduct] = useState({
    sku: '',
    name: '',
    price: '',
    quantity: '',
    description: ''
  });

  useEffect(() => {
    const productID = location.pathname.split('/').pop();
    if (productID) {
      getProduct(productID);
    }
  }, [location.pathname]);

  const getProduct = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      setProduct(data.product);
      setImages(data.product.images.map(image => ({
        file: null,
        preview: `${import.meta.env.VITE_SERVER_URL}/${image}`
      })));
      
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

 

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  

   const breadcrumbs = [
    <Link key="1" to="/" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          fontSize: "36px",
          fontWeight: 700,
          color: "#162427",
        }}
        className="mt-3 mb-3"
      >
        PRODUCTS
      </Box>
    </Link>,
    <Link key="2" to="#" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#001EB9",
        }}
        className="mt-5 mb-5"
      >
       product details
      </Box>
    </Link>,
  ];
  return (
    <Container maxWidth="lg">
    <style>
      {`
          .form-label1{
              font-size: 19px;
              font-weight: 500;
              color: #162427;
              margin-top:  2rem;
              margin-bottom:  2rem;
          }
          .form-input{
              font-size: 24px;
              font-weight: 700;
              color: #162427;
              border: none;
              background-color: #F5F5F5;
              width: 75%;
              margin-top: 2rem;
              margin-bottom:  2rem;
          }
              
          `}
    </style>
    <Breadcrumbs
      separator={
        <ArrowForwardIosIcon
          className="mx-2"
          sx={{
            width: "37px",
            height: "37px",
            color: "#001EB9",
          }}
        />
      }
      aria-label="breadcrumb"
    >
      {breadcrumbs}
    </Breadcrumbs>

    <form>
      <table width="100%">
        <tbody>
          <tr>
            <td>
              <label className="form-label1" htmlFor="sku">SKU</label>
            </td>
            <td>
              <input
                className="form-input form-control"
                type="text"
                id="sku"
                name="sku"
                value={product.sku}
                readOnly
               
              />
            </td>

            <td>
              <label className="form-label1" htmlFor="price">Price</label>
            </td>
            <td>
              <input
                className="form-input form-control"
                type="text"
                id="price"
                name="price"
                value={product.price}
                readOnly
                
              />
            </td>
          </tr>
          <tr>
            <td>
              <label className="form-label1" htmlFor="name">Name</label>
            </td>
            <td>
              <input
                className="form-input form-control"
                type="text"
                id="name"
                name="name"
                value={product.name}
                readOnly
                
              />
            </td>
            <td>
              <label className="form-label1" htmlFor="quantity">Quantity</label>
            </td>
            <td>
              <input
                className="form-input form-control"
                type="text"
                id="quantity"
                name="quantity"
                value={product.quantity}
                readOnly
                
              />
            </td>
          </tr>
        
        </tbody>
      </table>
      <label className="form-label" htmlFor="description">Product Description</label>
      <br />
      <span>A small description about the product</span>
      <textarea
        className="form-input form-control"
        width="100%"
        id="description"
        name="description"
        rows="4"
        cols="50"
        value={product.description}
       readOnly
      ></textarea>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            color: '#333'
          }}
        >
          Product Images
        </Typography>

       
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />

        <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {images.map((image, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img src={image.preview || image} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
            
            </Box>
          ))}
        </Box>
      </Box>
      
    </form>
  </Container>
  )
}
