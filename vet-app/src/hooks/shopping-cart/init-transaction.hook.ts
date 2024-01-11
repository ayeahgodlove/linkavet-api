import { IInitPayment, IInitTransaction } from "models/init-payment.model";
import { useDispatch, useSelector } from "react-redux";

import { IRootState } from "redux/store";
import { setActiveInitTransaction, setInitPayment } from "redux/init-transaction.slice";

const useInitTransaction = () => {
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.initTransaction.isLoading
  );
  const initTransaction = useSelector<IRootState, IInitTransaction>(
    (state) => state.initTransaction.initTransaction
  );
  const initPayment = useSelector<IRootState, IInitPayment>(
    (state) => state.initTransaction.initPayment
  );

  const dispatch = useDispatch();

  const setInitTransaction = (initTransaction: IInitTransaction) => {
    dispatch(setActiveInitTransaction(initTransaction));
  };

  const setActiveInitPayment = (initPayment: IInitPayment) => {
    dispatch(setInitPayment(initPayment));
  };

  return {
    setInitTransaction,
    initTransaction,
    isLoading,
    setActiveInitPayment,
    initPayment
  };
};

export { useInitTransaction };
