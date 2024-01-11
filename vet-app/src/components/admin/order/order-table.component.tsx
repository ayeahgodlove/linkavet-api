import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useOrderColumn } from "./order-column.component";
import { IOrder } from "models/order.model";
import { useOrder } from "hooks/order.hook";
import { NoContent } from "components/shared/no-content/no-content.component";

const OrderTable: React.FC = () => {
  const { orders, setOrder } = useOrder();
  const router = useNavigate();
  const { orderTableColumns } = useOrderColumn();
  // const route = use
  const handleRowClick = (order: IOrder) => {
    setOrder(order);
    router(`/admin/orders/${order.id}`);
  };

  return (
    <>
      {orders && orders.length ? (
        <Table<IOrder>
          dataSource={orders}
          columns={orderTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IOrder) => {
            return {
              onClick: (e) => {
                console.log(e);
                handleRowClick(record);
              },
            };
          }}
        />
      ) : (
        <NoContent
          title="No data for orders"
        />
      )}
    </>
  );
};

export default OrderTable;
