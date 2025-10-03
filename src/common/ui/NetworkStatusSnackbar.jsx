import { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NetworkStatusSnackbar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [open, setOpen] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setOpen(true);
      setTimeout(() => setOpen(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setOpen(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={isOnline ? "success" : "error"}
        sx={{ width: "100%", fontSize: "1rem" }}
      >
        {isOnline
          ? "✅ Hooray! Your internet connection is back. You can continue browsing without any issues. 🚀"
          : "❌ Oops! You are offline. Please check your internet connection to continue using the app. 🔌"}
      </Alert>
    </Snackbar>
  );
};

export default NetworkStatusSnackbar;
