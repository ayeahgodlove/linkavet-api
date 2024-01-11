import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "redux/store";
import { IOrder } from "models/order.model";
import {
  addOrderSuccess,
  editOrderSuccess,
  fetchOrdersAsync,
  setActiveOrder,
} from "../redux/order.slice";
import { OrderService } from "services/order.service";
const useOrder = () => {
  const orders = useSelector<IRootState, IOrder[]>((state) => state.order.orders);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.order.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.order.initialFetch
  );
  const order = useSelector<IRootState, IOrder>((state) => state.order.order);

  const dispatch = useDispatch();

  const loadOrders = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchOrdersAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addOrder = async (order: IOrder) => {
    return await OrderService.create(order)
      .then((orderResponse) => {
        dispatch(addOrderSuccess(orderResponse.data));
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  const setOrder = (order: IOrder) => {
    dispatch(setActiveOrder(order));
  };

  const editOrder = async (order: IOrder) => {
    return await OrderService.update(order)
      .then((orderResponse) => {
        dispatch(editOrderSuccess(orderResponse.data));
        setOrder(orderResponse.data);
        return true;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  useEffect(() => {
    loadOrders();
  }, [order, orders, isLoading, initialFetch, loadOrders]);

  return {
    order,
    orders,
    isLoading,
    initialFetch,
    addOrder,
    editOrder,
    setOrder,
  };
};

export { useOrder };
