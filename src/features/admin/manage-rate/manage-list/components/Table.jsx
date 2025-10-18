import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button as PrimeButton } from "primereact/button";
import { useParams } from "react-router-dom";
import { updateRateApi } from "@/routes/api-routes/dashboardApiRoutes";
import { Toast } from "primereact/toast";

// ✅ MUI imports
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const ProductList = ({ data = [] }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newRate, setNewRate] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const { id } = useParams(); // assuming distributor ID from route

  // ✅ open modal
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setNewRate(product.specialRate || "");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setNewRate("");
  };

  // ✅ show success/error message
  const showToast = (status, message) => {
    toast.current.show({
      severity: status === 200 ? "success" : "error",
      summary: status === 200 ? "Success" : "Error",
      detail: message,
      life: 3000,
    });
  };

  // ✅ save / update rate
  const handleSave = async () => {
    if (!id || !selectedProduct || !newRate) {
      showToast(500, "Please select distributor, product, and enter rate");
      return;
    }

    const payload = {
      distributorId: id,
      productId: selectedProduct.id, // adjust if key name differs
      price: newRate,
    };

    try {
      setLoading(true);
      await updateRateApi(payload);
      showToast(200, "Rate updated successfully!");
      handleClose();
    } catch (err) {
      showToast(500, "Rate already updated or failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ column template for button
  const specialRateTemplate = (rowData) => (
    <PrimeButton
      label="Update Rate"
      icon="pi pi-pencil"
      className="p-button-sm p-button-text"
      onClick={() => handleOpenModal(rowData)}
    />
  );

  return (
    <>
      <Toast ref={toast} />

      {/* DataTable */}
      <DataTable value={data} responsiveLayout="scroll">
        <Column field="productCode" header="Product Code" />
        <Column field="productName" header="Product Name" />
        <Column field="rate" header="Rate" />
        <Column field="gst" header="GST (%)" />
        <Column field="unit" header="Unit" />
        <Column field="crate" header="Crate" />
        <Column
          header="Special Distributor Rate"
          body={specialRateTemplate}
          style={{ textAlign: "center", width: "200px" }}
        />
      </DataTable>

      {/* ✅ MUI Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="update-rate-modal"
        aria-describedby="modal-to-update-special-rate"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="update-rate-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            Update Special Distributor Rate
          </Typography>

          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Product: <strong>{selectedProduct?.productName}</strong>
          </Typography>

          <TextField
            fullWidth
            label="New Rate"
            variant="outlined"
            size="small"
            value={newRate}
            onChange={(e) => setNewRate(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}
          >
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={loading}
              startIcon={
                loading ? <CircularProgress size={18} color="inherit" /> : null
              }
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProductList;
