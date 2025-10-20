import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useCart } from "@/context/CartContxt";

const ProductList = ({ data = [] }) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setQuantity("");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleAddToCart = () => {
    if (!quantity || quantity <= 0) return alert("Enter valid quantity");
    addToCart(selectedProduct, parseInt(quantity));
    handleClose();
  };

  return (
    <>
      <DataTable value={data} responsiveLayout="scroll">
        <Column field="productCode" header="Product Code" />
        <Column field="productName" header="Product Name" />
        <Column field="price" header="Rate" />
        <Column field="gst" header="GST (%)" />
        <Column field="unit" header="Unit" />
        <Column field="crate" header="Crate" />
        <Column
          header="Action"
          body={(rowData) => (
            <Button
              variant="contained"
              size="small"
              onClick={() => handleOpenModal(rowData)}
              sx={{ textTransform: "none" }}
            >
              Add to Cart
            </Button>
          )}
        />
      </DataTable>

      {/* Add to Cart Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle>Add to Cart</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1">
            Product: {selectedProduct?.productName}
          </Typography>
          <TextField
            label="Quantity"
            fullWidth
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddToCart} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductList;
