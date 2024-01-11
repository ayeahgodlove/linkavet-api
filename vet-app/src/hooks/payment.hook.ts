import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IPayment } from "models/payment.model";
import {
  addPaymentSuccess,
  editPaymentSuccess,
  fetchPaymentsAsync,
  setActivePayment,
} from "../redux/payment.slice";
import { PaymentService } from "services/payment.service";
const usePayment = () => {
  const payments = useSelector<IRootState, IPayment[]>((state) => state.payment.payments);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.payment.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.payment.initialFetch
  );
  const payment = useSelector<IRootState, IPayment>((state) => state.payment.payment);

  const dispatch = useDispatch();

  const loadPayments = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchPaymentsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addPayment = async (payment: IPayment) => {
    return await PaymentService.create(payment)
      .then((paymentResponse) => {
        dispatch(addPaymentSuccess(paymentResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  const setPayment = (payment: IPayment) => {
    dispatch(setActivePayment(payment));
  };

  const editPayment = async (payment: IPayment) => {
    return await PaymentService.update(payment)
      .then((paymentResponse) => {
        dispatch(editPaymentSuccess(paymentResponse.data));
        setPayment(paymentResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  useEffect(() => {
    loadPayments();
  }, [payment, payments, isLoading, initialFetch, loadPayments]);

  return {
    payment,
    payments,
    isLoading,
    initialFetch,
    addPayment,
    editPayment,
    setPayment,
  };
};

export { usePayment };
