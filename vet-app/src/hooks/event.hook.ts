import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { IRootState } from "../redux/store";
import { IEvent, emptyEvent } from "../models/event.model";
import {
  addEventSuccess,
  addEventThunk,
  deleteEventThunk,
  editEventSuccess,
  fetchEvents,
  setActiveEvent,
  updateAllFilters,
  updateEventThunk,
  updateFilters,
} from "../redux/event.slice";
import { useFormErrors } from "./shared/form-error.hook";

const useEvent = () => {
  const events = useSelector<IRootState, IEvent[]>(
    (state) => state.event.events
  );
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.event.isLoading
  );
  const initialFetch = useSelector<IRootState, boolean>(
    (state) => state.event.initialFetch
  );
  const selectedEvent = useSelector<IRootState, IEvent>(
    (state) => state.event.selectedEvent
  );

  const selectedCalendars = useSelector<IRootState, string[]>(
    (state) => state.event.selectedCalendars
  );

  const dispatch = useDispatch();
  const { setformError } = useFormErrors();

  const fetchEvent = async () => {
    dispatch(fetchEvents(selectedCalendars) as any);
  };
  const addEvent = async (event: IEvent) => {
    dispatch(addEventThunk(event) as any);
  };

  const updateEvent = async (event: IEvent) => {
    dispatch(updateEventThunk(event) as any);
  };

  const removeEvent = async (event: IEvent) => {
    dispatch(deleteEventThunk(event) as any);
  };

  const updateFilter = async (label: string) => {
    dispatch(updateFilters(label) as any);
  };

  const updateAllFiltersAction = async (checked: boolean) => {
    dispatch(updateAllFilters(checked));
  };
  // const addEvent = async (event: IEvent) => {
  //   return await EventService.create(event)
  //     .then((eventResponse) => {
  //       dispatch(addEventSuccess(eventResponse.data));
  //       return true;
  //     })
  //     .catch((error) => {
  //       setformError(error);
  //       return false;
  //     });
  // };

  const setEvent = (event: IEvent) => {
    dispatch(setActiveEvent(event));
  };

  const getEvent = (eventId: string) => {
    const event = events.find((p) => p.id === eventId);
    if (!event) {
      return emptyEvent;
    }
    return event;
  };

  // const editEvent = async (event: IEvent) => {
  //   return await EventService.update(event)
  //     .then((eventResponse) => {
  //       dispatch(editEventSuccess(eventResponse.data));
  //       setEvent(eventResponse.data);
  //       return true;
  //     })
  //     .catch((error) => {
  //       setformError(error);
  //       return false;
  //     });
  // };

  useEffect(() => {
    // loadEvents();
  }, [selectedEvent, events, isLoading, initialFetch]);

  return {
    selectedEvent,
    events,
    isLoading,
    initialFetch,
    addEvent,
    updateEvent,
    setEvent,
    getEvent,
    removeEvent,
    updateFilter,
    updateAllFiltersAction,
    fetchEvent,
    selectedCalendars
  };
};

export { useEvent };
