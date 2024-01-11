import { Alert, Button, Card, Col, List, Row, Typography, message } from "antd";
import BackButton from "components/shared/back-button.component";
import { useInitTransaction } from "hooks/shopping-cart/init-transaction.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import React, { useCallback, useEffect, useState } from "react";
import { ProcessPaymentService } from "services/process-payment.service";
import "./payment-feedback.style.scss";
import { usePayment } from "hooks/payment.hook";
import { useOrder } from "hooks/order.hook";
import { emptyOrder } from "models/order.model";
import { generateOrderNumber } from "utils/order-no";
import { useProduct } from "hooks/product.hook";
import { useShoppingCart } from "hooks/shopping-cart/shopping-cart.hook";
import { IPaymentResponse, emptyPayment } from "models/payment.model";
import { OrderService } from "services/order.service";
import { PaymentService } from "services/payment.service";
import {
  ITransactionVmResponse,
  TRANSACTION_STATUS,
  emptyTransactionVm,
} from "models/transaction.model";

const PaymentFeedbackPage = () => {
  const [payResp, setPayResp] = useState<ITransactionVmResponse>({
    data: { ...emptyTransactionVm },
    message: "",
    success: false,
    validationErrors: [],
  });
  const [error, setError] = useState<any>();

  const { initTransaction, initPayment } = useInitTransaction();
  const { setPayment } = usePayment();
  const { order, setOrder } = useOrder();
  const { products } = useProduct();
  const { cartItems, findMatchingProducts } = useShoppingCart();
  const matchingProducts = findMatchingProducts(products, cartItems);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);

  const processTransaction = useCallback(async (reference: string) => {
    try {
      const resp = await ProcessPaymentService.transactionStatus(reference);
      setPayResp(resp);

      return resp;
    } catch (error) {
      setError(error);
      throw error;
    }
  }, []);

  const createOrder = async () => {
    try {
      const orderResponse = await OrderService.create({
        ...emptyOrder,
        orderNo: generateOrderNumber(),
        products: matchingProducts.map((m) => m.id),
        status: "PAID",
        totalAmount: matchingProducts.reduce((a, b) => a + b.amount, 0),
        totalQtty: matchingProducts.reduce((a, b) => a + b.qtty, 0),
        address: initPayment.address,
        cellPhone: initPayment.telephone,
        email: initPayment.email,
        username: initPayment.name,
      });

      setOrder(orderResponse.data);
      return orderResponse.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createPayment = async (orderData) => {
    try {
      const paymentResponse = await PaymentService.create({
        ...emptyPayment,
        amount: orderData.totalAmount,
        orderNo: orderData.orderNo,
        status: orderData.status,
        address: initPayment.address,
        cellPhone: initPayment.telephone,
        email: initPayment.email,
        username: initPayment.name,
      });

      setPayment(paymentResponse.data);

      return paymentResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handlePaymentStatus = (paymentResponse: IPaymentResponse) => {
    if (paymentResponse.success) {
      message.success("Payment successful!");
    } else {
      message.error("Payment failed!");
    }
  };

  const getTransactionStatus = async (reference: string) => {
    try {
      await processTransaction(reference);

      if (payResp.data.status === TRANSACTION_STATUS.SUCCESSFUL) {
        const orderData = await createOrder();
        const paymentResponse = await createPayment(orderData);

        handlePaymentStatus(paymentResponse);
      } else {
        setTimeout(() => {
          getTransactionStatus(reference);
        }, 3000); // Retry after 3 seconds if status is still pending
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completePayment = async () => {
    setLoading(true);
    if (payResp.data.status === TRANSACTION_STATUS.PENDING) {
      setTimeout(() => {
        getTransactionStatus(initTransaction.reference);
      }, 3000); // Retry after 3 seconds if status is still pending
    } else {
      const orderData = await createOrder();
      const paymentResponse = await createPayment(orderData);

      handlePaymentStatus(paymentResponse);
    }
    setLoading(false);
    setDisable(true);
  };

  useEffect(() => {
    processTransaction(initTransaction.reference);
  }, []);

  return (
    <GeneralAppShell>
      <Row
        align={"top"}
        justify={"center"}
        gutter={[16, 16]}
        style={{ marginBottom: 15 }}
      >
        <Col span={23}>
          <BackButton title="Transaction Feedback" />
        </Col>
        <Col xs={24} md={13}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card title={"Order details"} style={{ width: "100%" }}>
              <Typography.Title level={5}>
                {payResp.data.reference}
              </Typography.Title>
              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    title={"Username"}
                    description={order.orderNo}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Amount"}
                    description={initPayment.amount + " XAF"}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Address"}
                    description={initPayment.address}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Email"}
                    description={initPayment.email}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Telephone"}
                    description={initPayment.telephone}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Adress"}
                    description={initPayment.address}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title={"Operator"}
                    description={initTransaction.operator}
                  />
                </List.Item>
              </List>
              {error && <Alert message={error.message} />}
            </Card>
          </div>
        </Col>
        <Col xs={24} md={9}>
          <Card title={"Instructions"} style={{ width: "100%" }}>
            <List itemLayout="horizontal">
              <List.Item>
                <List.Item.Meta
                  title={
                    <Typography.Title level={5}>
                      Dial *126 To Confirm Your Payment
                    </Typography.Title>
                  }
                  description={
                    <Typography.Text>
                      Click on Validate Button after confirming the transaction
                    </Typography.Text>
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title={"Validate"}
                  description={
                    <Button
                      type="primary"
                      onClick={completePayment}
                      loading={loading}
                      disabled={disable}
                    >
                      Complete Payment
                    </Button>
                  }
                />
              </List.Item>
            </List>
          </Card>
        </Col>
      </Row>
    </GeneralAppShell>
  );
};

export default PaymentFeedbackPage;
