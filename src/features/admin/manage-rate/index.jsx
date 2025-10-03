import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import axios from "axios";
import {
  getDistributorApi,
  getProductsApi,
} from "@/routes/api-routes/dashboardApiRoutes";

const DistributorRateUpdate = () => {
  const [distributors, setDistributors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rate, setRate] = useState("");

  // Load distributors
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const { data } = await getDistributorApi();
        setDistributors(data);
      } catch (err) {
        console.error("Error fetching distributors", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await getProductsApi();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchDistributors();
    fetchProducts();
  }, []);

  // Handle submit
  const handleSubmit = async () => {
    if (!selectedDistributor || !selectedProduct || !rate) {
      alert("Please select distributor, product, and enter rate");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_API_URL}/api/distributor-rates`,
        {
          distributor_id: selectedDistributor,
          product_id: selectedProduct,
          rate: parseFloat(rate),
        }
      );
      alert("Rate updated successfully!");
      setRate("");
      setSelectedDistributor("");
      setSelectedProduct("");
    } catch (err) {
      console.error("Error updating rate", err);
      alert("Failed to update rate");
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 500,
        margin: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h6" mb={3}>
        Update Distributor Rate
      </Typography>

      {/* Distributor Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Distributor</InputLabel>
        <Select
          value={selectedDistributor}
          onChange={(e) => setSelectedDistributor(e.target.value)}
        >
          {distributors.map((d) => (
            <MenuItem key={d.id} value={d.id}>
              {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Product Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Product</InputLabel>
        <Select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {products.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.item_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rate Input */}
      <TextField
        label="Rate"
        type="number"
        fullWidth
        margin="normal"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
      >
        Update Rate
      </Button>
    </Box>
  );
};

export default DistributorRateUpdate;
