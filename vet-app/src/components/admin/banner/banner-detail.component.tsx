import { Card, Col, Image, List, Row, Typography } from "antd";
import { API_URL_UPLOADS_BANNERS } from "config/constant";
import { useBanner } from "hooks/banner.hook";
import React from "react";

const BannerDetailComponent: React.FC = () => {
  const { banner } = useBanner();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Title",
            value: banner.title,
          },
          {
            label: "Description",
            value: banner.subTitle,
          },
          {
            label: "Image",
            value: <Image src={`${API_URL_UPLOADS_BANNERS}/${banner.image}`} />,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Row style={{ width: "100%" }}>
              <Col md={4}>
                <Typography.Text>{item.label}</Typography.Text>
              </Col>
              <Col md={20}>
                <Typography.Text>{item.value}</Typography.Text>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BannerDetailComponent;
