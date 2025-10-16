import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  CardHeader,
  Avatar,
} from "@mui/material";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  // Example API response (replace this with actual API call)
  useEffect(() => {
    const response = [
      {
        id: 3,
        productCode: "INC001",
        productName: "HARSHIT",
        rate: "123.00",
        gst: "18.00",
        unit: "KGS",
        crate: 12,
        isActive: 1,
        createdAt: "2025-10-15T17:15:44.000Z",
      },
      {
        id: 4,
        productCode: "INC002",
        productName: "APPLE JUICE",
        rate: "95.00",
        gst: "12.00",
        unit: "LTR",
        crate: 8,
        isActive: 0,
        createdAt: "2025-10-15T17:15:44.000Z",
      },
    ];
    setProducts(response);
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Product Listing
      </Typography>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-3px)" },
              }}
            >
              <CardHeader
                avatar={
                  <Avatar
                    sx={{
                      bgcolor: product.isActive ? "success.main" : "error.main",
                    }}
                  >
                    {product.productName.charAt(0)}
                  </Avatar>
                }
                title={
                  <Typography variant="h6" fontWeight={600}>
                    {product.productName}
                  </Typography>
                }
                subheader={`Code: ${product.productCode}`}
                action={
                  <Chip
                    label={product.isActive ? "Active" : "Inactive"}
                    color={product.isActive ? "success" : "error"}
                    size="small"
                  />
                }
              />

              <Divider />

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rate:</strong> ₹{product.rate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>GST:</strong> {product.gst}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Unit:</strong> {product.unit}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Crate:</strong> {product.crate}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ display: "block", mt: 1 }}
                >
                  Created on: {new Date(product.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListPage;
