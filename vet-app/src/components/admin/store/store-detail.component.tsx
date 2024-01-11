import { Card, Col, Image, List, Row, Typography } from "antd";
import { API_URL_UPLOADS_STORES } from "config/constant";
import { useStore } from "hooks/store.hook";
import React from "react";

const StoreDetailComponent: React.FC = () => {
  const { store } = useStore();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "Name",
            value: store.name,
          },
          {
            label: "Location",
            value: store.location,
          },
          {
            label: "Image",
            value: <Image src={`${API_URL_UPLOADS_STORES}/${store.imageBannerUrl}`} />,
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

export default StoreDetailComponent;
