import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductList from "./components/Table";
import { getProductsApi } from "@/routes/api-routes/dashboardApiRoutes";

const ProductManager = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDistributors = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProduct(response?.data || []); // adjust based on API response
    } catch (error) {
      console.error("Error fetching distributors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Product List</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/itemList/form"
        >
          + Add Product
        </Button>
      </Box>

      {/* Table */}
      <ProductList data={product} />
    </Box>
  );
};

export default ProductManager;
