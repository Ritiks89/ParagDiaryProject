import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { BsFonts } from "react-icons/bs";

const LabelPrintModal = ({ open, onClose }) => {
  const [fontColor, setFontColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("14px");
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [bold, setBold] = useState(false);

  const fontStyles = {
    color: fontColor,
    fontSize: fontSize,
    fontFamily: fontFamily,
    fontWeight: bold ? "bold" : "normal",
  };

  const handlePrint = () => {
    const content = document.getElementById("print-section").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Shipping Label</title>
          <link href="https://fonts.googleapis.com/css2?family=${fontFamily}&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: '${fontFamily}', sans-serif;
              font-size: ${fontSize};
              font-weight: ${bold ? "bold" : "normal"};
              color: ${fontColor};
              margin: 20px;
            }
            .text-center { text-align: center; }
            .fw-600 { font-weight: bold; }
            .border { border: 1px solid #ccc; }
            .rounded { border-radius: 6px; }
            .p-12 { padding: 12px; }
            .p-16 { padding: 16px; }
            .p-20 { padding: 20px; }
            .mb-1 { margin-bottom: 4px; }
            .mb-8 { margin-bottom: 8px; }
            .mb-16 { margin-bottom: 16px; }
            .mb-24 { margin-bottom: 24px; }
            .mb-0 { margin-bottom: 0px; }
            .d-flex { display: flex; }
            .justify-content-between { justify-content: space-between; }
            .row { display: flex; flex-wrap: wrap; margin: 0 -8px; }
            .col-md-6 { width: 50%; padding: 0 8px; box-sizing: border-box; }
            .qr-section, .billing-summary { width: 50%; box-sizing: border-box; padding: 0 8px; }
            .barcode-box {
              border: 2px dashed #ccc;
              padding: 20px;
              width: fit-content;
              margin: 24px auto 0;
              text-align: center;
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

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
      <DialogTitle>Shipping Label</DialogTitle>
      <DialogContent dividers>
        {/* Font Customization */}
        <div className="mb-24">
          <h5 className="fs-16 d-flex align-items-center gap-2 mb-3">
            <BsFonts size={20} />
            Font Customization
          </h5>

          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Font Color</label>
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  height: 38,
                }}
              >
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                  style={{ border: "none", width: 20, height: 20 }}
                />
                <span style={{ fontSize: "14px" }}>{fontColor}</span>
              </div>
            </div>

            <div className="col-md-3">
              <label className="form-label">Font Size</label>
              <Select
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                size="small"
                fullWidth
              >
                <MenuItem value="12px">12px</MenuItem>
                <MenuItem value="14px">14px</MenuItem>
                <MenuItem value="16px">16px</MenuItem>
                <MenuItem value="18px">18px</MenuItem>
              </Select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Font Family</label>
              <Select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                size="small"
                fullWidth
              >
                <MenuItem value="Poppins">Poppins</MenuItem>
                <MenuItem value="Inter">Inter</MenuItem>
                <MenuItem value="Arial">Arial</MenuItem>
                <MenuItem value="Roboto">Roboto</MenuItem>
                <MenuItem value="Georgia">Georgia</MenuItem>
              </Select>
            </div>

            <div className="col-md-3 d-flex align-items-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bold}
                    onChange={(e) => setBold(e.target.checked)}
                    size="small"
                  />
                }
                label="Bold Text"
              />
            </div>
          </div>
        </div>

        {/* Printable Section */}
        <div
          id="print-section"
          style={fontStyles}
          className="p-20 border rounded bg-white"
        >
          <div className="pb-24 border-bottom">
            <h4 className="text-center fw-600 mb-8">SHIPPING LABEL</h4>
            <p className="text-center">
              Order: SFP000005 | Tracking: TRK36254482
            </p>
          </div>

          {/* Address Section */}
          <div className="row py-24 border-bottom">
            <div className="col-md-6 mb-24">
              <h6 className="fw-600 mb-8">FROM (Distributor)</h6>
              <div className="border rounded p-12">
                <p className="mb-1">SFP Distribution Center</p>
                <p className="mb-1">Plot No. 123, Industrial Area</p>
                <p className="mb-1">Sector 45, Gurgaon</p>
                <p className="mb-1">Gurgaon, Haryana - 122001</p>
                <p className="mb-1">Phone: +91 9876543210</p>
                <p className="mb-0">Email: dispatch@sfp.com</p>
              </div>
            </div>
            <div className="col-md-6 mb-24">
              <h6 className="fw-600 mb-8">TO (Shipping Address)</h6>
              <div className="border rounded p-12">
                <p className="mb-1">MakineniSoftinc</p>
                <p className="mb-1">Industrial road, Bangalore, Karnataka</p>
                <p className="mb-1">Phone:</p>
                <p className="mb-0">Email:</p>
              </div>
            </div>

            <div className="col-12">
              <div className="d-flex justify-content-between border rounded p-16 mb-16">
                <div>
                  <p className="fw-600">Tracking Number</p>
                  <div>TRK36254482</div>
                </div>
                <div>
                  <p className="fw-600">Courier Service</p>
                  <div>dtdc</div>
                </div>
                <div>
                  <p className="fw-600">Number of Boxes</p>
                  <div>1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Courier Info */}

          {/* Order Details */}
          <div className="py-24 border-bottom">
            <h6 className="fw-600 mb-16">ORDER DETAILS</h6>
            <div className="row">
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Order Name</p>
                  <p className="colon">:</p>
                  <p className="value">SFP000005</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Order Date</p>
                  <p className="colon">:</p>
                  <p className="value">7 July 2022</p>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Product Name</p>
                  <p className="colon">:</p>
                  <p className="value">Mobile</p>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Dispatch Person</p>
                  <p className="colon">:</p>
                  <p className="value">Ritik</p>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Quantity</p>
                  <p className="colon">:</p>
                  <p className="value">32</p>
                </div>{" "}
              </div>
              <div className="col-md-6">
                <div className="column-info">
                  <p className="key fw-500 ">Receiver</p>
                  <p className="colon">:</p>
                  <p className="value">Deepak</p>
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="py-20">
            <div className="d-flex mb-24 justify-content-around">
              <div className="qr-section text-center">
                <h6 className="fw-600 mb-8">QR CODE - BILLING INFO</h6>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=SFP000005"
                  alt="QR Code"
                />
                <p className="mt-2">Scan for billing details</p>
              </div>
              <div className="billing-summary">
                <h6 className="fw-600 mb-8">BILLING SUMMARY</h6>
                <div className="column-info">
                  <p className="key fw-500 ">Order Value</p>
                  <p className="colon">:</p>
                  <p className="value">₹50,000</p>
                </div>
                <div className="column-info">
                  <p className="key fw-500 ">Shipping Cost</p>
                  <p className="colon">:</p>
                  <p className="value">₹700</p>
                </div>
                <div className="column-info">
                  <p className="key fw-500 ">Total Cost</p>
                  <p className="colon">:</p>
                  <p className="value">₹50,700</p>
                </div>
                <div className="column-info">
                  <p className="key fw-500 ">Payment Status</p>
                  <p className="colon">:</p>
                  <p className="value">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Barcode */}
          <div className="barcode-box d-flex justify-content-center">
            <div className="p-32" style={{border : "2px dashed #d8d8d8"}}>
              <p className="fw-600 mb-8">TRACKING BARCODE</p>
              <p className="bg-grey-3 p-8 rounded text-center">TRK36254482</p>
            </div>
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" onClick={handlePrint}>
          Print Label
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LabelPrintModal;
