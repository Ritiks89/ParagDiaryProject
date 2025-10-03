// XLDialog.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AttachmentInput from "../ui/AttachmentInput";

const CreateShipmentModal = ({ open, onClose }) => {
  const addressOptions = [
    {
      label: "Primary",
      value: "7/2 chandramouli nagar, guntur, AP, India",
      id: 1,
    },
    {
      label: "Banglore",
      value: "Industrial road, bangalore, karnataka, India",
      id: 2,
    },
  ];

  const [selectedAddress, setSelectedAddress] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: "90vw",
          maxWidth: "1200px",
        },
      }}
    >
      <DialogTitle>Create Shipment</DialogTitle>
      <DialogContent dividers>
        <div className="">
          <h5 className="fw-400 fs-16 mb-8">Select Address</h5>
        </div>
        <div className="row">
          {addressOptions.map((option) => (
            <div
              className="col-md-3"
              key={option.id}
              onClick={() => setSelectedAddress(option.value)}
            >
              <div
                className={`${
                  selectedAddress === option.value
                    ? "bg-blue-1 border-blue-5 border"
                    : "border"
                } rounded-2 px-16 py-12 h-100 cursor-pointer`}
              >
                <h5 className="fw-400 fs-16">{option.label}</h5>
                <p className="text-grey-12 fs-14">{option.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="row my-16">
          <div className="col-md-4 mb-32">
            <label
              htmlFor="courierService"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Courier Service
            </label>
            <FormControl fullWidth>
              <Select
                id="courierService"
                defaultValue=""
                displayEmpty
                size="small"
              >
                <MenuItem value="" disabled>
                  Courier Service
                </MenuItem>
                <MenuItem value="customer1">Customer 1</MenuItem>
                <MenuItem value="customer2">Customer 2</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="shippingCost"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Shipping Cost
            </label>
            <TextField
              fullWidth
              id="shippingCost"
              variant="outlined"
              placeholder="Enter shipping cost"
              size="small"
            />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="boxes"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Number of Boxes
            </label>
            <TextField
              fullWidth
              id="boxes"
              type="number"
              variant="outlined"
              placeholder="Enter number of boxes"
              size="small"
            />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="trackingNumber"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Tracking Number
            </label>
            <TextField
              fullWidth
              id="trackingNumber"
              variant="outlined"
              placeholder="Auto generated if left empty"
              size="small"
            />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="trackingLink"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Tracking Link (Optional)
            </label>
            <TextField
              fullWidth
              id="trackingLink"
              variant="outlined"
              placeholder="Enter Tracking Link"
              size="small"
            />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="images"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Images
            </label>
            <AttachmentInput name="images" placeholder="Upload Image" />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="videos"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Videos
            </label>
            <AttachmentInput name="videos" placeholder="Upload Video" />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="dispatchPersonName"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Dispatch Person Name
            </label>
            <TextField
              fullWidth
              id="dispatchPersonName"
              variant="outlined"
              placeholder="Enter dispatch person name"
              size="small"
            />
          </div>

          <div className="col-md-4 mb-32">
            <label
              htmlFor="receiverName"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Receiver Name
            </label>
            <TextField
              fullWidth
              id="receiverName"
              variant="outlined"
              placeholder="Enter receiver name"
              size="small"
            />
          </div>

          <div className="col-md-12 mb-32">
            <label
              htmlFor="notes"
              className="form-label text-grey-12 mb-1 fw-14"
            >
              Notes
            </label>
            <TextField
              fullWidth
              multiline
              rows={3}
              id="notes"
              variant="outlined"
              size="small"
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" className="me-16">
          Close
        </Button>
        <Button variant="contained">Create Shipment</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateShipmentModal;
