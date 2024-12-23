import { Button, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , justifyContent: "space-between"}}>
    <Paper
      elevation={3}
      sx={{
       p:1,
        display: "flex",
        boxShadow: "none",
        backgroundColor: "#F7F7F7",
        borderRadius: "75px",
        width: "70%",


      }}
    >
    
 
        <InputBase
          placeholder="Search..."
          fullWidth
          sx={{ ml: 1, flex: 1 }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{
            backgroundColor: "#001EB9",
            color: "white",
            borderRadius: "75px",
            paddingLeft: "30px",
            paddingRight: "30px",
            boxShadow: "none",
            fontSize: "19px",
          }}
        >
          <SearchIcon />
          Search
        </Button>
    </Paper>

    <div  className="d-flex ">
        <Button
            variant="contained"
            sx={{
            backgroundColor: "#001EB9",
            color: "white",
            paddingLeft: "30px",
            paddingRight: "30px",
            boxShadow: "none",
            fontSize: "19px",

            }}

            onClick={() => {
              navigate("/product/add-new");

            }}
            className="me-3"
        >
            Add New
        </Button>

        <Button
          variant="outlined" // Use outlined variant to show border
          onClick={() => {
            navigate("/favorites");
          }}
          sx={{
            borderColor: "#001EB9",
            color: "#001EB9", // Set text color to match border
           
           
            boxShadow: "none",
           
          }}
          className="bg-transparent"
        >
          <StarIcon 
          sx={
            {width: "35px",
            height: "35px",
            }
          }
          />
         
        </Button>


    </div>
    </div>
      
  );
}
