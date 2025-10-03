import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addProductsApi } from "@/routes/api-routes/dashboardApiRoutes";

// ✅ Validation Schema
const validationSchema = Yup.object({
  productCode: Yup.string().required("Product Code is required"),
  productName: Yup.string().required("Product Name is required"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .required("Rate is required"),
  gst: Yup.number()
    .typeError("GST must be a number")
    .required("GST is required"),
  unit: Yup.string().required("Unit is required"),
  crate: Yup.number()
    .typeError("Crate must be a number")
    .required("Crate is required"),
});

const ProductForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      productCode: "",
      productName: "",
      rate: "",
      gst: "",
      unit: "",
      crate: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);

        // ✅ Call API
        const response = await addProductsApi(values);
        console.log("Product Added:", response.data);

        resetForm();

        // ✅ Navigate back to product list
        navigate("/itemList");
      } catch (error) {
        console.error("Error adding product:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      sx={{
        // maxWidth: 800,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Product Form
      </Typography>

      <form onSubmit={formik.handleSubmit} className="mt-20">
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={2} mb={2}>
          <TextField
            label="Product Code"
            name="productCode"
            value={formik.values.productCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.productCode && Boolean(formik.errors.productCode)
            }
            helperText={formik.touched.productCode && formik.errors.productCode}
          />
          <TextField
            label="Product Name"
            name="productName"
            value={formik.values.productName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.productName && Boolean(formik.errors.productName)
            }
            helperText={formik.touched.productName && formik.errors.productName}
          />
          <TextField
            label="Rate"
            name="rate"
            type="number"
            value={formik.values.rate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.rate && Boolean(formik.errors.rate)}
            helperText={formik.touched.rate && formik.errors.rate}
          />
          <TextField
            label="GST (%)"
            name="gst"
            type="number"
            value={formik.values.gst}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gst && Boolean(formik.errors.gst)}
            helperText={formik.touched.gst && formik.errors.gst}
          />
          <TextField
            label="Unit"
            name="unit"
            value={formik.values.unit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.unit && Boolean(formik.errors.unit)}
            helperText={formik.touched.unit && formik.errors.unit}
          />
          <TextField
            label="Crate"
            name="crate"
            type="number"
            value={formik.values.crate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.crate && Boolean(formik.errors.crate)}
            helperText={formik.touched.crate && formik.errors.crate}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "+ Add Product"}
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
