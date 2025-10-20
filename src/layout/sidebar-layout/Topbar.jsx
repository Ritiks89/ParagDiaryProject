import React, { useState } from "react";
import {
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Drawer,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { MdArrowDropDown } from "react-icons/md";
import { useCart } from "@/context/CartContxt";
import { useNavigate } from "react-router-dom";

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Topbar = ({ open, handleDrawerOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 👇 navigate to product list page
  const handleAddProduct = () => {
    setCartOpen(false);
    navigate("/items"); // ✅ redirect to product list page
  };

  return (
    <>
      <AppBar
        position="fixed"
        open={open}
        sx={{ boxShadow: "none", zIndex: 10 }}
      >
        <Toolbar
          sx={{
            height: 70,
            px: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Drawer Toggle */}
          <div>
            <IconButton
              color="inherit"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[{ mr: 0 }, open && { display: "none" }]}
            >
              <MenuIcon />
            </IconButton>
          </div>

          {/* Right Side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Cart Icon */}
            {profile?.user !== "Admin" ? (
              <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                <Badge badgeContent={cart.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            ) : (
              ""
            )}

            {/* Profile */}
            <Box
              onClick={handleMenuOpen}
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            >
              <Avatar alt={profile?.user?.name} />
              <Typography sx={{ ml: 1 }}>{profile?.user?.name}</Typography>
              <MdArrowDropDown />
            </Box>
          </Box>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 400, p: 2 }}>
          <Typography variant="h6">Your Cart</Typography>

          {cart.length === 0 ? (
            <>
              <Typography sx={{ mt: 2 }}>Cart is empty</Typography>
              <Button
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleAddProduct}
              >
                Add Products
              </Button>
            </>
          ) : (
            <>
              {cart.map((item) => (
                <Box
                  key={item.productCode}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="body2">
                    {item.productName} × {item.quantity}
                  </Typography>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => removeFromCart(item.productCode)}
                  >
                    Remove
                  </Button>
                </Box>
              ))}

              {/* Add More Products Button */}
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3 }}
                fullWidth
                onClick={handleAddProduct}
              >
                Add More Products
              </Button>

              {/* Place Order Button */}
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => {
                  console.log("Final Order:", cart);
                  clearCart();
                  setCartOpen(false);
                }}
              >
                Place Order
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Topbar;
