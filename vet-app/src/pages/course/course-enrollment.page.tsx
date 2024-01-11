import { Alert, Button, Card, Col, List, Row, Typography, message } from "antd";
import BackButton from "components/shared/back-button.component";
import { useAuth } from "hooks/auth/auth.hook";
import { useCourse } from "hooks/lms/course.hook";
import { useEnrollment } from "hooks/lms/enrollment.hook";
import { usePayment } from "hooks/payment.hook";
import { useInitTransaction } from "hooks/shopping-cart/init-transaction.hook";
import GeneralAppShell from "layout/app/general-app-shell";
import { emptyEnrollment } from "models/lms/enrollment";
import { IPaymentResponse, emptyPayment } from "models/payment.model";
import {
  ITransactionVmResponse,
  TRANSACTION_STATUS,
  emptyTransactionVm,
} from "models/transaction.model";
import React, { useCallback, useEffect, useState } from "react";
import { EnrollmentService } from "services/lms/enrollment.service";
import { PaymentService } from "services/payment.service";
import { ProcessPaymentService } from "services/process-payment.service";

const CourseEnrollmentPage = () => {
  const { enrollment, setEnrollment } = useEnrollment();
  const { initTransaction, initPayment } = useInitTransaction();
  const { setPayment } = usePayment();
  const { user } = useAuth();
  const { course } = useCourse();

  const [payResp, setPayResp] = useState<ITransactionVmResponse>({
    data: { ...emptyTransactionVm },
    message: "",
    success: false,
    validationErrors: [],
  });
  const [error, setError] = useState<any>();
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

  const createEnrollment = async () => {
    try {
      const enrollmentResponse = await EnrollmentService.create({
        ...emptyEnrollment,
        userId: user.id,
        courseId: course.id,
        enrollmentDate: new Date(),
        completionDate: new Date(),
      });

      setEnrollment(enrollmentResponse.data);
      return enrollmentResponse.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createPayment = async () => {
    try {
      const paymentResponse = await PaymentService.create({
        ...emptyPayment,
        amount: course.price,
        orderNo: enrollment.id,
        status: "PAID",
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
        await createEnrollment();
        const paymentResponse = await createPayment();

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
      await createEnrollment();
      const paymentResponse = await createPayment();

      handlePaymentStatus(paymentResponse);
    }
    setLoading(false);
    setDisable(true);
  };

  useEffect(() => {
    processTransaction(initTransaction.reference);
  }, []);
  return (
    <>
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
                      description={enrollment.id}
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
                        Click on Validate Button after confirming the
                        transaction
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
    </>
  );
};

export default CourseEnrollmentPage;
