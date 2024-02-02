import { Card, Col, ConfigProvider, List, Row, Typography } from "antd";
import GeneralAppShell from "layout/app/general-app-shell";
import React from "react";
import { BiMoney, BiRefresh, BiSupport } from "react-icons/bi";
import theme from "utils/themeConfig";

const FaqsPage = () => {
  return (
    <GeneralAppShell>
      <ConfigProvider theme={theme}>
        <Row gutter={[16, 16]} justify={"center"} style={{ margin: "2rem 0" }}>
          <Col xs={22} md={22}>
            <Card bordered={false}>
              <h2>Have a question? Find your answer here.</h2>
              <p>
                Can't find your answer here? Call us at +237673687549 or email
                us at linkavet.support@gmail.com
              </p>
            </Card>
          </Col>

          <Col xs={22} md={6}>
            <Card bordered={false}>
              <h2>Queries</h2>
              <p>
                <BiRefresh /> General
              </p>
              <p>
                <BiMoney /> Prices
              </p>
              <p>
                <BiSupport /> Support
              </p>
            </Card>
          </Col>
          <Col xs={22} md={16}>
            <Card bordered={false}>
              <List
                size="small"
                dataSource={[
                  {
                    label: "Title 1",
                    value: "description 1",
                  },
                  {
                    label: "Title 2",
                    value: "Description 2",
                  },
                  {
                    label: "Title 3",
                    value: "description 3",
                  },
                  {
                    label: "Title 4",
                    value: "Description 4",
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Row style={{ width: "100%" }}>
                      <Typography.Text>{item.label}</Typography.Text>
                    </Row>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </GeneralAppShell>
  );
};

export default FaqsPage;
