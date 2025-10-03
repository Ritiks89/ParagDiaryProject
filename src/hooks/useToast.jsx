import React, { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext(null);

const ToastProvider = ({ children }) => {
  const toastRef = useRef(null);

  const showToast = (statusCode, message) => {
    let severity = "info";
    if (statusCode >= 200 && statusCode < 300) {
      severity = "success";
    } else if (statusCode >= 400 && statusCode < 500) {
      severity = "error";
    } else if (statusCode >= 500) {
      severity = "error";
    }

    toastRef.current.show({
      severity,
      summary: severity.toUpperCase(),
      detail: message || "Something went wrong!",
      life: 3000,
      
    });
  };

  return (
    <ToastContext.Provider value={showToast}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
export const useToast = () => useContext(ToastContext);
