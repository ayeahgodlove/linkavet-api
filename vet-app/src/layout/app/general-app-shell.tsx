import { Drawer, Layout, Menu, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ConfigProvider, theme, FloatButton } from "antd";

import Navbar from "components/navbar";
import "./AppShell.scss";
import { useTheme } from "hooks/shared/theme.hook";
import { FiArrowUp } from "react-icons/fi";
import Footer from "rc-footer";
import { CategoryService } from "services/category.service";
import { ICategory } from "models/category.model";
import { TagService } from "services/tag.service";
import { ITag } from "models/tag.model";
import "rc-footer/assets/index.css";
import { Link } from "react-router-dom";
import { useAppShellMenus } from "./app-shell-menus";

const { Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

interface IProps {
  children: any;
}
const GeneralAppShell: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);

  const { GeneralMenuItemsWithIcons } = useAppShellMenus();

  const handleShow = () => {
    setShow(true);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const onClose = () => {
    setShow(false);
  };

  const getCategories = useCallback(async () => {
    const response = await CategoryService.list();
    setCategories(response.data);
  }, []);

  const getTags = useCallback(async () => {
    const response = await TagService.list();
    setTags(response.data);
  }, []);

  useEffect(() => {
    getCategories();
    getTags();
  }, []);

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
          <Drawer
            title="LinkaVet"
            placement="left"
            closable={true}
            onClose={onClose}
            open={show}
            width={200}
          >
            <Sider
              width={200}
              className={`site-layout-background ${
                show ? "app-shell-sidebar_show" : "app-shell-sidebar_hide"
              }`}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                items={GeneralMenuItemsWithIcons}
              />
            </Sider>
          </Drawer>
          <Layout style={{ padding: 0 }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 0,
                margin: 0,
                minHeight: 280,
                background: "transparent",
              }}
            >
              {children}
            </Content>
            <FloatButton.BackTop icon={<FiArrowUp />} visibilityHeight={400} />

            <Footer
              className="app-footer"
              style={{
                color: isDarkMode ? "#c4dcec" : "#c4dcec",
              }}
              theme={isDarkMode ? "dark" : "light"}
              columnLayout="space-between"
              columns={[
                {
                  title: <strong>FAQs</strong>,
                  items: [
                    {
                      title: "Discount",
                      url: "/fags/discount",
                    },
                    {
                      title: "Wish list",
                      url: "/fags/wish-list",
                    },
                    {
                      title: "How to buy",
                      url: "/fags/how-to-buy",
                    },
                    {
                      title: "Contact us",
                      url: "/fags/contact-us",
                    },
                    {
                      title: "Purchase fees",
                      url: "/fags/purchase-fees",
                    },
                  ],
                },
                {
                  title: (
                    <strong>
                      Browse by Categories
                    </strong>
                  ),
                  items: [
                    ...categories.map((c) => {
                      return {
                        title: c.name,
                        url: `/browse/?category=${c.name}`,
                      };
                    }),
                  ],
                },
                {
                  title: (
                    <strong>
                      Browse by Tags
                    </strong>
                  ),
                  items: [
                    ...tags.map((c) => {
                      return {
                        title: c.name,
                        url: `/browse/?tag=${c.name}`,
                      };
                    }),
                  ],
                },
                {
                  title: (
                    <strong>About Us</strong>
                  ),
                  items: [
                    {
                      title: "Privacy Policy",
                      url: "/about-us/privacy-policy",
                    },
                    {
                      title: "Address",
                      description: "Buea, South West, Cameroon",
                    },
                    {
                      title: "Telephone Line 1",
                      description: "tel:+237-673-687-549",
                    },
                    {
                      title: "Telephone Line 2",
                      description: "tel:+237-680-800-549",
                    },
                    {
                      title: "Contact at LinkaVet",
                      url: "mailto:ayeahgodlove5@gmail.com",
                    },
                  ],
                },
              ]}
              bottom={
                <>
                  <Typography.Paragraph style={{ textAlign: "center" }}>
                    Made by Cumi <Link to={"/dashboard"}>Admin Area</Link>
                  </Typography.Paragraph>
                </>
              }
            />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default GeneralAppShell;
