import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ProductList from "./components/Table";
import { getProductsApi } from "@/routes/api-routes/dashboardApiRoutes";

const ProductManagerSpecialRate = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDistributors = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProduct(response?.data?.data?.products || []); // adjust based on API response
    } catch (error) {
      console.error("Error fetching distributors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDistributors();
  }, []);
  return <ProductList data={product} />;
};

export default ProductManagerSpecialRate;
