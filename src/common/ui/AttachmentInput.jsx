import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { InputAdornment } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function AttachmentInput({ name, label, formik = {}, required = false , placeholder="Upload File" }) {
  const { setFieldValue, values = {}, errors, touched } = formik;

  function ifError(key) {
    return errors[key] && touched[key];
  }
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  const url = baseUrl + "/api/upload-file";
  const token = localStorage?.getItem("token");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file[]", file);
    try {
      setLoading(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      const fileUrl = data?.response?.uploadedFiles?.[0]?.fileUrl;
      setFieldValue(name, fileUrl);
      return;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file!");
    } finally {
      setLoading(false);
    }
  };

  function getFileNameFromUrl(url) {
    console.log("URL received:", url);

    if (typeof url !== "string") {
      console.warn("Expected a string but received:", typeof url, url);
      return "";
    }

    const parts = url.split("___");
    console.log("Parts:", parts);
    const fileName = parts[2];
    return fileName || url;
  }

  return (
    <div className="attachment-input">
      <TextField
        variant="outlined"
        // value={values?.[name] ? getFileNameFromUrl(values?.[name]) : ""}
        onClick={handleClick}
        // error={ifError(name)}
        // helperText={ifError(name) ? errors?.[name] : ""}
        placeholder={placeholder}
        required={required}
        className="pr-0"
        size="small"
        InputProps={{
          readOnly: true,
       
          endAdornment: (
            <InputAdornment position="end">
              {values?.[name] && (
                <IconButton
                  onClick={() => window.open(values[name], "_blank")}
                  edge="end"
                  size="small"
                >
                  <VisibilityIcon />
                </IconButton>
              )}
              {/* Upload button or spinner */}
              <span
                className="bg-grey-4 px-20 py-7 cursor-pointer"
                // onClick={handleClick}
              >
                {loading ? (
                  <Spinner animation="border" variant="dark" size="sm" />
                ) : (
                  "Upload"
                )}
              </span>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        className="pr-0"
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default AttachmentInput;
