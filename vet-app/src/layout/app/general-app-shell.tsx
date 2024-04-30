import { Drawer, Layout, Menu, Space, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ConfigProvider, theme, FloatButton } from "antd";

import Navbar from "../../components/navbar";
import "./app-shell.scss";
import { useTheme } from "../../hooks/shared/theme.hook";
import { FiArrowUp } from "react-icons/fi";
import { CategoryService } from "../../services/category.service";
import { ICategory } from "../../models/category.model";
import { TagService } from "../../services/tag.service";
import { ITag } from "../../models/tag.model";
import "rc-footer/assets/index.css";
import { Link } from "react-router-dom";
import { useAppShellMenus } from "./app-shell-menus";
import { useDispatch } from "react-redux";
import { fetchUsersAsync } from "../../redux/user.slice";
import { fetchCategoriesAsync } from "../../redux/category.slice";
import { fetchTagsAsync } from "../../redux/tag.slice";
import { fetchBannersAsync } from "../../redux/banner.slice";
import { fetchReviewsAsync } from "../../redux/review.slice";
import { fetchSpecialtiesAsync } from "../../redux/specialty.slice";
import { AppFooter } from "layout/footer/footer";
import { AppFootnote } from "layout/footnote/footnote";

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
    dispatch(fetchSpecialtiesAsync() as any);
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

            <AppFooter logoPath={"./logo/logo-2-removebg-preview.png"} />
            <AppFootnote />
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default GeneralAppShell;
