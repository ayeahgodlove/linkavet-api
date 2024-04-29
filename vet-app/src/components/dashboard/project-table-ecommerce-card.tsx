import React from "react";

import { Row, Col, Table } from "antd";
import { useOrderColumn } from "components/admin/order/order-column.component";
import { IOrder } from "models/order.model";
import { useOrder } from "hooks/order.hook";
import { Link } from "react-router-dom";

export default function ProjectTableEcommerceCard() {
  const { orderTableColumns } = useOrderColumn();
  const { orders } = useOrder();
  return (
    <Row>
      <Col span={24}>
        <Row align="middle" justify="space-between">
          <h3>Latest Orders</h3>

          <Link to={"/admin/orders"}>View all orders</Link>
        </Row>

        <Table<IOrder>
          columns={orderTableColumns}
          dataSource={orders}
          pagination={false}
          scroll={{ x: 700 }}
        />
      </Col>
    </Row>
  );
}
