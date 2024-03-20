import { Drawer, Layout, Menu, Space, Typography } from "antd";
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
import { getConfiguration } from "redux/action/initial.action";
import { useDispatch } from "react-redux";
import { fetchUsersAsync } from "redux/user.slice";
import { fetchCategoriesAsync } from "redux/category.slice";
import { fetchTagsAsync } from "redux/tag.slice";
import { fetchBannersAsync } from "redux/banner.slice";
import { fetchReviewsAsync } from "redux/review.slice";
import { fetchUserSpecialtiesAsync } from "redux/user-specialty.slice";

const { Sider, Content } = Layout;
const { defaultAlgorithm, darkAlgorithm } = theme;

interface IProps {
  children: any;
}
const GeneralAppShell: React.FC<IProps> = ({ children }) => {
  const [show, setShow] = useState(false);
  const { isDarkMode } = useTheme();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tags, setTags] = useState<ITag[]>([]);
  const dispatch = useDispatch();
  const { GeneralMenuItemsWithIcons } = useAppShellMenus();

  const handleShow = () => {
    setShow(true);
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
    dispatch(fetchUsersAsync() as any);
    dispatch(fetchCategoriesAsync() as any);
    dispatch(fetchTagsAsync() as any);
    dispatch(fetchBannersAsync() as any);
    dispatch(fetchReviewsAsync() as any);
    dispatch(fetchUserSpecialtiesAsync() as any);
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
                background: "#fafffa",
              }}
            >
              {children}
            </Content>
            <Space>
              <FloatButton.BackTop
                icon={<FiArrowUp />}
                visibilityHeight={400}
              />
            </Space>

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
                      url: "/fags",
                    },
                    {
                      title: "Wish list",
                      url: "/fagsx",
                    },
                    {
                      title: "How to buy",
                      url: "/fags",
                    },
                    {
                      title: "Contact us",
                      url: "/fagsx",
                    },
                    {
                      title: "Purchase fees",
                      url: "/fags",
                    },
                  ],
                },
                {
                  title: <strong>Browse by Categories</strong>,
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
                  title: <strong>Browse by Tags</strong>,
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
                  title: <strong>About Us</strong>,
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
                  <p style={{ color: "#333" }}>
                    Your Trusted Source for Premium Veterinary Care & Products.
                  </p>
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
