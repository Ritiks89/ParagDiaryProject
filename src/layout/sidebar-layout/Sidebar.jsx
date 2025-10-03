import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Topbar from "./Topbar";
import MenuItems from "./MenuItems";
import { LiaLessThanSolid } from "react-icons/lia";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { themeBlue, themeColors } from "@/utils/constantVariables";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/slices/userSlice";

const drawerWidth = 300;
const miniDrawerWidth = 60;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : miniDrawerWidth,
  ...(open &&
    !isMobile && {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar({ children }) {


  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const [open, setOpen] = useState(() => {
    const savedState = localStorage.getItem("drawerOpen");
    return savedState === "true";
  });



  useEffect(() => {
    localStorage.setItem("drawerOpen", open.toString());
  }, [open]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const toggleDrawer = () => setOpen(!open);


  return (
    <Box sx={{ display: "flex" }}>
      <Topbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        style={{
          width: isMobile
            ? "100vw"
            : open
            ? "calc(100vw - 300px)"
            : "calc(100vw - 60px)",
        }}
      />

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerClose : undefined}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          "& .MuiDrawer-paper": {
            width: isMobile
              ? drawerWidth
              : open
              ? drawerWidth
              : miniDrawerWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ my: 3, mx: open ? 3 : 1 }}>
          {open && <h6 className="fs-16 fw-600 text-center">Distributor Management</h6>}
        </Box>

        <Box className="minimize" sx={{ px: 1 }}>
          {open ? (
            <p
              className="m-0 text-end fs-12 cursor-pointer minimize-icon"
              onClick={toggleDrawer}
            >
              <LiaLessThanSolid size={12} /> Minimize
            </p>
          ) : (
            <div className="d-flex justify-content-center text-center cursor-pointer">
              <Tooltip title="Open" placement="right">
                <span onClick={toggleDrawer}>
                  <HiMenuAlt1 size={16} />
                </span>
              </Tooltip>
            </div>
          )}
        </Box>

        <Box sx={{ my: 2 }}>
          <MenuItems onlyIcons={!open} />
        </Box>
      </Drawer>

      <Main
        open={open}
        isMobile={isMobile}
        style={{
          width: isMobile
            ? "100vw"
            : open
            ? "calc(100vw - 300px)"
            : "calc(100vw - 60px)",
        }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
