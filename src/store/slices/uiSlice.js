import { blueLight, blueTheme, themeBlue } from "@/utils/constantVariables";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  backdropVisible: false,
  themeColor: blueTheme,
  showJoyride: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    startJoyride: (state) => {
      state.showJoyride = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    showBackdrop: (state) => {
      state.backdropVisible = true;
    },
    hideBackdrop: (state) => {
      state.backdropVisible = false;
    },
    changeThemeColor: (state, action) => {
      state.themeColor = action.payload;
    },
    setJoyride: (state, action) => {
      state.showJoyride = action.payload;
    },
  },
});


export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectBackdropVisible = (state) => state.ui.backdropVisible;
export const selectThemeColor = (state) => state.ui.themeColor;
export const { setJoyride } = uiSlice.actions;
export const selectShowJoyride = (state) => state.ui.showJoyride;

export const {
  openSidebar,
  closeSidebar,
  changeThemeColor,
  toggleSidebar,
  showBackdrop,
  hideBackdrop,
} = uiSlice.actions;

export default uiSlice.reducer;
