import { Card, Col, ConfigProvider, Row, Tabs, TabsProps } from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useState } from "react";
import {
  BiListCheck,
  BiMoney,
  BiRefresh,
  BiSolidCoupon,
  BiSupport,
} from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import theme from "utils/themeConfig";

const items: TabsProps["items"] = [
  {
    key: "general",
    label: (
      <NavLink to="/faqs/?query=general" style={{ padding: 0 }}>
        <BiRefresh /> <span>General</span>
      </NavLink>
    ),
    children: <>description 1</>,
  },
  {
    key: "prices",
    label: (
      <NavLink to="/faqs/?query=prices" style={{ padding: 0 }}>
        <BiMoney /> Prices
      </NavLink>
    ),
    children: <>description 2</>,
  },
  {
    key: "discount",
    label: (
      <NavLink to="/faqs/?query=discount" style={{ padding: 0 }}>
        <BiSolidCoupon /> <span>Discount</span>
      </NavLink>
    ),
    children: <>description 3</>,
  },
  {
    key: "wish-list",
    label: (
      <NavLink to="/faqs/?query=wish-list" style={{ padding: 0 }}>
        <BiListCheck /> <span>Wish List</span>
      </NavLink>
    ),
    children: <>description 4</>,
  },
  {
    key: "contact-us",
    label: (
      <NavLink to="/faqs/?query=contact-us" style={{ padding: 0 }}>
        <BiRefresh /> <span>Contact-us</span>
      </NavLink>
    ),
    children: <>description 5</>,
  },
  {
    key: "support",
    label: (
      <NavLink to="/faqs/?query=support" style={{ padding: 0 }}>
        <BiSupport /> Support
      </NavLink>
    ),
    children: <>description 3</>,
  },
];

const FaqsPage = () => {
  const queryParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState(queryParams.get("query") || "general");
  const navigate = useNavigate();
  const onChange = (activeKey: string) => {
    setStatus(activeKey);
    navigate(`/faqs/?query=${activeKey}`);
  };

  return (
    <GeneralAppShell>
      <ConfigProvider theme={theme}>
        <div style={{ margin: "3rem 0" }}>
          <Row gutter={[16, 16]} justify={"center"}>
            <Col xs={22} md={20}>
              <Card bordered={false}>
                <h2>Have a question? Find your answer here.</h2>
                <p>
                  Can't find your answer here? Call us at +237673687549 or email
                  us at linkavet.support@gmail.com
                </p>
              </Card>
            </Col>

            <Col xs={22} md={20}>
              <Card bordered={false}>
                <Tabs
                  defaultActiveKey={status}
                  direction="ltr"
                  items={items}
                  onChange={onChange}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </GeneralAppShell>
  );
};

export default FaqsPage;
