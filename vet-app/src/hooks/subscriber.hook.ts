import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import { ISubscriber, emptySubscriber } from "../models/subscriber.model";
import {
  addSubscriberSuccess,
  editSubscriberSuccess,
  fetchSubscribersAsync,
  setActiveSubscriber,
} from "../redux/subscriber.slice";
import { SubscriberService } from "../services/subscriber.service";
import { useFormErrors } from "./shared/form-error.hook";
const useSubscriber = () => {
  const subscribers = useSelector<IRootState, ISubscriber[]>((state) => state.subscriber.subscribers);
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.subscriber.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.subscriber.initialFetch
  );
  const subscriber = useSelector<IRootState, ISubscriber>((state) => state.subscriber.subscriber);

  const dispatch = useDispatch();
  const { setformError } = useFormErrors()

  const loadSubscribers = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchSubscribersAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addSubscriber = async (subscriber: ISubscriber) => {
    return await SubscriberService.create(subscriber)
      .then((subscriberResponse) => {
        dispatch(addSubscriberSuccess(subscriberResponse.data));
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  const setSubscriber = (subscriber: ISubscriber) => {
    dispatch(setActiveSubscriber(subscriber));
  };

  const getSubscriber = (subscriberId: string) => {
    const subscriber = subscribers.find((p) => p.id === subscriberId);
    if (!subscriber) {
      return emptySubscriber;
    }
    return subscriber;
  };

  const editSubscriber = async (subscriber: ISubscriber) => {
    return await SubscriberService.update(subscriber)
      .then((subscriberResponse) => {
        dispatch(editSubscriberSuccess(subscriberResponse.data));
        setSubscriber(subscriberResponse.data);
        return true;
      })
      .catch((error) => {
        setformError(error)
        return false;
      });
  };

  useEffect(() => {
    // loadSubscribers();
  }, [subscriber, subscribers, isLoading, initialFetch]);

  return {
    subscriber,
    subscribers,
    isLoading,
    initialFetch,
    addSubscriber,
    editSubscriber,
    setSubscriber,
    getSubscriber
  };
};

export { useSubscriber };
