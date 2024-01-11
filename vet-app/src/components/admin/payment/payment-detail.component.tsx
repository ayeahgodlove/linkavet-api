import { Card, Col, List, Row, Typography } from "antd";
import { usePayment } from "hooks/payment.hook";
import { useUser } from "hooks/user.hook";
import React from "react";

const PaymentDetailComponent: React.FC = () => {
  const { payment } = usePayment();
  const { getUser } = useUser();
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "ID",
            value: payment.id,
          },
          {
            label: "USERNAME",
            value: getUser(payment?.userId!).username,
          },
          {
            label: "AMOUNT",
            value: payment.amount,
          },
          {
            label: "ORDER NO",
            value: payment.orderNo,
          },
          {
            label: "PAYMENT NO",
            value: payment.orderNo,
          },
          {
            label: "STATUS",
            value: payment.status,
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

export default PaymentDetailComponent;
