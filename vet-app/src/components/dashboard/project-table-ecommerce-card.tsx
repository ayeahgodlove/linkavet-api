import React from "react";

import { Row, Col, Table, Typography } from "antd";
import { useOrderColumn } from "components/admin/order/order-column.component";
import { IOrder } from "models/order.model";
import { Link } from "react-router-dom";
import { useAuth } from "hooks/auth/auth.hook";
import { ROLES } from "config/constant";

interface IProp {
  orders: IOrder[];
}

const ProjectTableEcommerceCard: React.FC<IProp> = ({ orders }) => {
  const { orderTableColumns } = useOrderColumn();
  const { user } = useAuth();
  const isOrders =
    user.roles.map((r) => r.name).includes(ROLES.ADMIN) ||
    user.roles.map((r) => r.name).includes(ROLES.CREATOR);
  return (
    <Row>
      <Col span={24}>
        <Row align="middle" justify="space-between">
          <Typography.Title level={4}>Latest Orders</Typography.Title>

          {isOrders && <Link to={"/admin/orders"}>View all orders</Link>}
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
};

export default ProjectTableEcommerceCard;
