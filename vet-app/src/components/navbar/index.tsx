import { MenuOutlined } from "@ant-design/icons";
import { Button, ConfigProvider } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import LeftMenu from "./left-menu";
import RightMenu from "./right-menu";
import { Header } from "antd/es/layout/layout";
import { useTheme } from "hooks/shared/theme.hook";
import "./navbar.style.scss";
import useWindowSize from "hooks/shared/window-resize.hook";

interface IProps {
  showMenuIcon?: boolean;
  handleShow?: () => void;
}

const Navbar: React.FC<IProps> = ({ showMenuIcon = false, handleShow }) => {
  const { isDarkMode } = useTheme();
  const { width } = useWindowSize();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#08a30a",
          colorLink: "#214e0a",
          fontFamily: "Poppins",
          fontSize: 16,
          fontWeightStrong: 500,
        },
      }}
    >
      <Header
        style={{
          background: isDarkMode ? "" : "#fff",
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
        className="menuBar header-box-shadow"
      >
        <div className="logo">
          <Link to="/">
            <img
              src="/logo/logo-2-removebg-preview.png"
              height={width > 768 ? 100 : 90}
              width={width > 768 ? 90 : 60}
              alt="honeyman logo"
              style={{ aspectRatio: 1 / 1, objectFit: "contain" }}
            />
          </Link>
        </div>
        <div className="menuCon">
          {/* other things */}
          <div className="leftMenu">
            <LeftMenu />
          </div>
          <div className="rightMenu">
            <RightMenu />
          </div>

          {showMenuIcon && (
            <Button
              type="default"
              icon={<MenuOutlined size={25} style={{ fontSize: "18px" }} />}
              onClick={handleShow}
              className="app-shell-baricon"
            />
          )}
        </div>
      </Header>
    </ConfigProvider>
  );
};

export default Navbar;
