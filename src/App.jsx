import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeColors } from "./utils/constantVariables";
import NetworkStatusSnackbar from "./common/ui/NetworkStatusSnackbar";
import { getLoggedInUser } from "./routes/api-routes/dashboardApiRoutes";
import { useDispatch } from "react-redux";
import { tokenPayload } from "./utils/constantFunction";
import ToastProvider from "./hooks/useToast";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  const themeColor = themeColors();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  async function loggedInUser() {
    try {
      const response = await getLoggedInUser();
      const loggedInUser = response?.data?.response?.editData;
      dispatch(setUser(loggedInUser || null));
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    const { sub = "" } = tokenPayload(localStorage.getItem("token")) || {};
    if (sub) {
      loggedInUser();
    } else {
      setLoader(false);
    }
  }, []);

  if (loader) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100"></div>
    );
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: themeColor?.main,
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppRoutes />
          </LocalizationProvider>{" "}
        </ToastProvider>
        <NetworkStatusSnackbar />
      </ThemeProvider>
    </>
  );
}

export default App;
