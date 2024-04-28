import { Card, Col, List, Row, Typography } from "antd";
import { useOrder } from "../../../hooks/order.hook";
import { useUser } from "../../../hooks/user.hook";
import React, { useCallback, useEffect } from "react";
import ProductTable from "./sub/product-table.component";

const OrderDetailComponent: React.FC = () => {
  const { order, getProductByOrder, productOrders } = useOrder();
  const { getUser } = useUser();

  const fetData = useCallback(async () => {
    return await getProductByOrder(order.orderNo);
  }, []);
  useEffect(() => {
    fetData();
  }, []);
  return (
    <Card bordered={false} size="small">
      <List
        size="small"
        dataSource={[
          {
            label: "ID",
            value: order.id,
          },
          {
            label: "USERNAME",
            value: getUser(order.userId!).username,
          },
          {
            label: "TOTAL QUANTITY",
            value: order.totalQtty,
          },
          {
            label: "TOTAL AMOUNT",
            value: order.totalAmount,
          },
          {
            label: "ORDER NO",
            value: order.orderNo,
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

      <ProductTable products={productOrders} />
    </Card>
  );
};

export default OrderDetailComponent;
