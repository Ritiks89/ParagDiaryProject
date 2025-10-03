import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import resetIcon from "@/assets/icons/reset-pass-icon.png";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@/common/ui/LoadingButton";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      return;
    }
    setIsSubmitting(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="auth-container">
        <img src={resetIcon} alt="Reset Icon" className="reset-icon" />

        <h1 className="fs-30 fw-600">Reset password</h1>

        <p className="fs-16 fw-400 text-gray mt-10">
          No worries, we’ll send you reset instructions.
        </p>

        <div className="input-group mt-20">
          <label className="input-label fw-500 dim-black">Email</label>
          <TextField
            fullWidth
            margin="dense"
            placeholder="Enter your email"
            size="small"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <LoadingButton
          isLoading={false}
          type="submit"
          variant="contained"

          fullWidth
          className="bg-primary mt-16"
        >
          Sign Up
        </LoadingButton>

        <p
          className="text-primary fs-14 fw-600 mt-30 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Back to log in
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
