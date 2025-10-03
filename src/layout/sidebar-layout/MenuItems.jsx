import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  FiberManualRecord as DotIcon,
} from "@mui/icons-material";
import { BiSolidCategory } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";
import { themeBlue, themeColors } from "@/utils/constantVariables";

const menuItems = [
  {
    label: "Items",
    path: "/itemList",
    icon: <FaShippingFast fontSize="1.5rem" />,
    disabled: false,
  },
  {
    label: "Distributors",
    path: "/distributor",
    icon: <FaUserFriends fontSize="1.5rem" />,
    disabled: false,
  },
  {
    label: "Update Items Rate",
    path: "/distributor/item-rates",
    icon: <FaUserFriends fontSize="1.5rem" />,
    disabled: false,
  },
];

const MenuItems = ({ onlyIcons }) => {
  const [openSections, setOpenSections] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const theme = themeColors();
  const textColor = theme?.main === themeBlue ? "#7F8BA6" : theme?.text;

  const isActive = (path) => {
    const current = location.pathname.toLowerCase();
    const target = path.toLowerCase();

    if (current === target) return true;
    return current.startsWith(target + "/");
  };

  const handleMenuClick = (path, hasChildren, event) => {
    if (hasChildren) {
      event.preventDefault();
      if (path !== location.pathname) {
        navigate(path);
        setTimeout(() => {
          setOpenSections((prev) => ({ ...prev, [path]: true }));
        }, 100);
      } else {
        setOpenSections((prev) => ({ ...prev, [path]: !prev[path] }));
      }
    } else {
      navigate(path);
    }
  };

  useEffect(() => {
    menuItems.forEach((item) => {
      if (
        item.children?.some((child) => isActive(child.path)) ||
        isActive(item.path)
      ) {
        setOpenSections((prev) => ({ ...prev, [item.path]: true }));
      }
    });
  }, [location.pathname]);

  const hoverStyles = {
    "&:hover": {
      backgroundColor: theme.light,
      color: "#fff",
      "& .MuiListItemIcon-root": { color: "#fff" },
    },
  };

  const activeStyles = {
    backgroundColor: theme.light,
    color: "#fff",
    fontWeight: "700 !important",
    "& .MuiListItemIcon-root": { color: "#fff" },
    paddingLeft: onlyIcons ? "0.75rem" : "1.75rem",
    ...hoverStyles,
  };

  const defaultStyles = {
    fontWeight: "500",
    paddingLeft: onlyIcons ? "0.75rem" : "1.75rem",
    color: textColor,
    ...hoverStyles,
  };

  return (
    <List>
      {menuItems.map(({ label, path, icon, children, disabled = false }) => {
        const listItem = (
          <ListItemButton
            onClick={(event) => handleMenuClick(path, !!children, event)}
            disabled={disabled}
            sx={
              isActive(path) || openSections[path]
                ? activeStyles
                : defaultStyles
            }
          >
            <ListItemIcon
              sx={{
                minWidth: "2rem",
                ...(isActive(path) ? { color: "#fff" } : { color: textColor }),
                display: "flex",
                justifyContent: "center",
              }}
            >
              {icon}
            </ListItemIcon>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                transition: "all 0.3s ease",
                width: onlyIcons ? 0 : "auto",
                opacity: onlyIcons ? 0 : 1,
                whiteSpace: "nowrap",
              }}
            >
              <ListItemText
                primary={label}
                sx={{
                  fontWeight: isActive(path) ? "700" : "500",
                  minWidth: onlyIcons ? 0 : "100px",
                }}
              />
              {children &&
                (openSections[path] ? <ExpandLess /> : <ExpandMore />)}
            </div>
          </ListItemButton>
        );

        return (
          <React.Fragment key={path}>
            {onlyIcons ? (
              <Tooltip title={label} placement="right">
                {listItem}
              </Tooltip>
            ) : (
              listItem
            )}

            {children && !onlyIcons && (
              <Collapse in={openSections[path]} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  style={{ paddingLeft: "1.7rem" }}
                >
                  {children.map(({ path: childPath, label }) => (
                    <Link
                      to={childPath}
                      style={{ textDecoration: "none", color: "inherit" }}
                      key={childPath}
                    >
                      <ListItemButton
                        sx={{
                          pl: 5,
                          ...(isActive(childPath)
                            ? activeStyles
                            : defaultStyles),
                          background: "transparent",
                        }}
                        className="sub-menu-items mb-0 py-2"
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "1rem",
                            ...(isActive(childPath)
                              ? { color: "#fff" }
                              : { color: textColor }),
                          }}
                        >
                          <DotIcon
                            className="fs-10"
                            style={{ fontSize: "10px" }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          sx={{
                            fontWeight: "500",
                            fontSize: "10px!important",
                            opacity: onlyIcons ? 0 : 1,
                            transition: "opacity 0.3s ease",
                            width: onlyIcons ? 0 : "auto",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        />
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default MenuItems;
