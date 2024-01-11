import React from "react";
import { Menu } from "antd";
import { useTheme } from "hooks/shared/theme.hook";
import { useAppShellMenus } from "layout/app/app-shell-menus";

const LeftMenu = () => {
  const { isDarkMode } = useTheme();
  const { GeneralMenuItemsWithoutIcons } = useAppShellMenus();
  return (
    <>
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        className="left_navigation"
        items={GeneralMenuItemsWithoutIcons}
        mode={"horizontal"}
        style={{ background: "inherit"}}
      />
    </>
  );
};

export default LeftMenu;
