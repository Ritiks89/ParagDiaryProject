export const themeBlue = "#1A1A19";
export const blueLight = "#1f315a";
export const themeGreen = "#044A42";
export const greenLight = "#3A9188";
export const themePurple = "#3B1E54";
export const purpleLight = "#9B7EBD";
export const themeBrown = "#3E3232";
export const brownLight = "#A87C7C";

export const brownTheme = {
  main: themeBrown,
  light: brownLight,
  text: "#F9F5E7",
};

export const blueTheme = {
  main: themeBlue,
  light: blueLight,
};

export const greenTheme = {
  main: themeGreen,
  light: greenLight,
  text: "#D6EFD8",
};

export const purpleTheme = {
  main: themePurple,
  light: purpleLight,
  text: "#FCC6FF",
};

export const theme = localStorage.getItem("theme");
document.body.className = theme;

export function themeColors() {
  if (theme === "blue-theme") {
    return blueTheme;
  }
  if (theme === "green-theme") {
    return greenTheme;
  }
  if (theme === "brown-theme") {
    return brownTheme;
  }
  if (theme === "purple-theme") {
    return purpleTheme;
  } else {
    return blueTheme;
  }
}
