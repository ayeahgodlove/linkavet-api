import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { usePaymentColumn } from "./payment-column.component";
import { IPayment } from "models/payment.model";
import { usePayment } from "hooks/payment.hook";
import { NoContent } from "components/shared/no-content/no-content.component";

const PaymentTable: React.FC = () => {
  const { payments, setPayment } = usePayment();
  const router = useNavigate();
  const { paymentTableColumns } = usePaymentColumn();
  // const route = use
  const handleRowClick = (payment: IPayment) => {
    setPayment(payment);
    router(`/admin/payments/${payment.id}`);
  };

  return (
    <>
      {payments && payments.length ? (
        <Table<IPayment>
          dataSource={payments}
          columns={paymentTableColumns}
          size={"small"}
          rowKey={"id"}
          onRow={(record: IPayment) => {
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
          title="No data for payments"
        />
      )}
    </>
  );
};

export default PaymentTable;
