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
  CircularProgress,
} from "@mui/material";
import {
  getDistributorApi,
  getProductsApi,
  updateRateApi,
} from "@/routes/api-routes/dashboardApiRoutes";
import { useToast } from "@/hooks/useToast";

const DistributorRateUpdate = () => {
  const [distributors, setDistributors] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedDistributor, setSelectedDistributor] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const showToast = useToast();
  // Load distributors and products
  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await getDistributorApi();
        setDistributors(response?.data?.data);
      } catch (err) {
        console.error("Error fetching distributors", err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await getProductsApi();
        setProducts(response?.data?.data?.products);
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

    const payload = {
      distributorId: selectedDistributor,
      productId: selectedProduct,
      price: rate,
    };

    try {
      setLoading(true);
      await updateRateApi(payload);
      showToast(200, "Rate updated successfully!");
      setRate("");
      setSelectedDistributor("");
      setSelectedProduct("");
    } catch (err) {
      showToast(500, "Rate Already updated successfully!");
    } finally {
      setLoading(false);
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
              {p.productName}
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

      {/* Submit Button with Loader */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Update Rate"
        )}
      </Button>
    </Box>
  );
};

export default DistributorRateUpdate;
