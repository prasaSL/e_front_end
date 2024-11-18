import  { useState } from "react";
import Container from "@mui/material/Container";
import { Avatar, Button, Grid, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center" justifyContent="flex-end" className="mt-3">
        {/* Move this item to the left */}
        <Grid item>
          <Button
            endIcon={
              <Avatar
                alt="Admin"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 58, height: 58, marginLeft: 2 }}
              />
            }
            onClick={handleClick}
            sx={{
              textDecoration: "none",
              color: "#162427",
              fontWeight: 700,
              fontSize: 19,
            }}
          >
            ADMIN
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My Account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Container>
  );
}
