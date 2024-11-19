import React, { useRef, useState } from "react";
import { Box, Breadcrumbs, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function ProductAddNew() {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const handleAddImagesClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      file, // Store file object for backend submission
      preview: URL.createObjectURL(file), // Generate preview URL for display
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleSetThumbnail = (index) => {
    setThumbnail(index);
  };

  const handleSaveProduct = async () => {
    if (thumbnail === null) {
      alert("Please select a thumbnail image.");
      return;
    }

    const formData = new FormData();
    formData.append("thumbnailIndex", thumbnail); // Add thumbnail index
    formData.append("name", document.getElementById("name").value); // Add product name
    formData.append("quantity", document.getElementById("QTY").value); // Add product price
    formData.append("description", document.getElementById("description").value); // Add product description
    formData.append("sku", document.getElementById("sku").value); // Add product SKU
    formData.append("price", document.getElementById("price").value); // Add product price
   

    images.forEach((image) => {
      formData.append("images", image.file); // Add all image files
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/products/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to save product.");
      }
      alert("Product saved successfully!");

        // Clear form fields and images
        document.getElementById("name").value = "";
        document.getElementById("QTY").value = "";
        document.getElementById("description").value = "";
        document.getElementById("sku").value = "";
        document.getElementById("price").value = "";
        setImages([]);
        setThumbnail(null);
        fileInputRef.current.value = null;
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
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
    <Link key="2" to="/product/add-new" style={{ textDecoration: "none" }}>
      <Box
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          color: "#001EB9",
        }}
        className="mt-5 mb-5"
      >
        Add new product
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
                <input className="form-input form-control" type="text" id="sku" name="sku" />
              </td>
              <td>
                <label className="form-label1" htmlFor="price">price</label>
              </td>
              <td>
                <input className="form-input form-control" type="text" id="price" name="price" />
              </td>
            </tr>
            <tr>
              <td>
                <label className="form-label1" htmlFor="name">Name</label>
              </td>
              <td>
                <input className="form-input form-control" type="text" id="name" name="name" />
              </td>
              <td>
                <label className="form-label1" htmlFor="price">QTY</label>
              </td>
              <td>
                <input className="form-input form-control" type="text" id="QTY" name="QTY" />
              </td>
            </tr>
          </tbody>
        </table>
        <label className="form-label" htmlFor="description">Product Description</label>
        <br />
        <span>A small description about the product</span>
        <textarea className="form-input form-control" width="100%" id="description" name="description" rows="4" cols="50"></textarea>

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

          <Link
            to="#"
            underline="hover"
            sx={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#001EB9',
              cursor: 'pointer',
              '&:hover': { color: '#0056b3' }
            }}
            onClick={handleAddImagesClick}
          >
            Add Images
          </Link>
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
                <img src={image.preview} alt={`Uploaded ${index}`} style={{ width: '100px', height: '100px' }} />
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: thumbnail === index ? '#0056b3' : '#001EB9',
                    '&:hover': { backgroundColor: '#0056b3' }
                  }}
                  onClick={() => handleSetThumbnail(index)}
                >
                  {thumbnail === index ? 'Thumbnail' : 'Set as Thumbnail'}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleSaveProduct}
        >
          Save Product
        </Button>
      </form>
    </Container>
  );
}