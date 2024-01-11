import React from "react";
import { Menu } from "antd";

import { useTheme } from "hooks/shared/theme.hook";
import { useAuth } from "hooks/auth/auth.hook";
import { useAppShellMenus } from "layout/app/app-shell-menus";

const RightMenu = () => {
  const { isDarkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const { rightMenus } = useAppShellMenus();

  return (
    <Menu
      theme={isDarkMode ? "dark" : "light"}
      className="right_navigation"
      mode={"horizontal"}
      style={{
        width: isAuthenticated ? "300px" : "200px",
        background: "inherit",
      }}
      items={rightMenus}
    />
  );
};

export default RightMenu;
