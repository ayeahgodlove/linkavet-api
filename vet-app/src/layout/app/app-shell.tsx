import { Drawer, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";

import Navbar from "../../components/navbar";
import "./app-shell.scss";

import { ConfigProvider, theme } from "antd";
import { useTheme } from "../../hooks/shared/theme.hook";
import { useAuth } from "../../hooks/auth/auth.hook";
import { useDispatch } from "react-redux";
import { initialDataAsync } from "../../redux/action/initial.action";
import { useAppShellMenus } from "./app-shell-menus";
import { Navigate } from "react-router-dom";
import { ROLES } from "../../config/constant";

const { defaultAlgorithm, darkAlgorithm } = theme;

const { Sider, Content } = Layout;

interface IProps {
  children: any;
}
const AppShell: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const { items2, filterMenuItemsByRole } = useAppShellMenus();
  const dispatch = useDispatch();

  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      setTimeout(() => {
        dispatch(initialDataAsync() as any);
      }, 3000);
    }
  }, []);

  if (!isAuthenticated || !user) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: "#08a30a",
          colorLink: "#214e0a",
          fontFamily: "Poppins",
        },
      }}
    >
      <Layout className="app-shell-layout">
        <Navbar showMenuIcon handleShow={handleShow} />
        <Layout>
          {/* //Display Sidebar when it's admin */}
          <>
            <Sider
              width={250}
              className={`site-layout-background ${
                show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
              }`}
              collapsible
              collapsed={collapsed}
              onCollapse={handleCollapse}
              style={{ background: "#fff" }}
            >
              <Menu
                mode="inline"
                style={{ height: "100vh", borderRight: 0 }}
                items={filterMenuItemsByRole(
                  items2,
                  user.roles.map((ur) => ur.name)
                )}
              />
            </Sider>
            <Drawer
              title="LinkaVet"
              placement="left"
              closable={true}
              onClose={onClose}
              open={show}
              width={300}
            >
              <Sider
                width={250}
                className={`site-layout-background ${
                  show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
                }`}
                style={{ background: "#fff" }}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{ height: "100%", borderRight: 0 }}
                  items={filterMenuItemsByRole(
                    items2,
                    user.roles.map((ur) => ur.name)
                  )}
                />
              </Sider>
            </Drawer>
          </>
          {/* Display no sidebar when it's others */}
          <Content
            className="site-layout-background"
            style={{
              // padding: 24,
              margin: 0,
              minHeight: 400,
              background: "#fafffa",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AppShell;
