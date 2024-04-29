import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyEvent, IEvent, IEventState } from "../models/event.model";
import { EventService } from "../services/event.service";

export const initialState: IEventState = {
  events: [],
  errors: "",
  selectedEvent: emptyEvent,
  isLoading: false,
  initialFetch: true,
  selectedCalendars: ["Important", "Work", "Social", "Travel"],
};

const FETCH_EVENTS = "calendar/fetchEvents";
// const ADD_EVENT = "calendar/addEvent";
// const UPDATE_EVENT = "calendar/updateEvent";
const UPDATE_FILTERS = "calendar/updateFilters";
const UPDATE_ALL_FILTERS = "calendar/updateAllFilters";
const REMOVE_EVENT = "calendar/removeEvent";
const SELECT_EVENT = "calendar/selectEvent";

// Async thunk to fetch events
export const fetchEvents = createAsyncThunk(
  FETCH_EVENTS,
  async (_, thunkApi) => {
    try {
      return await EventService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

// export const addEventThunk = createAsyncThunk(
//   ADD_EVENT,
//   async (event: IEvent) => async (_) => {
//     return await EventService.create(event);
//   }
// );

// export const updateEventThunk = createAsyncThunk(
//   UPDATE_EVENT,
//   async (event: IEvent) => async (_) => {
//     return await EventService.update(event);
//   }
// );

export const deleteEventThunk = createAsyncThunk(
  REMOVE_EVENT,
  async (event: IEvent) => async (_) => {
    return await EventService.delete(event);
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    fetchEventSuccess: (state, action: PayloadAction<IEvent[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.events = action.payload;
    },
    editEventSuccess: (state, action: PayloadAction<IEvent>) => {
      state.events = state.events.map((event) => {
        return event.id === action.payload.id ? action.payload : event;
      });
    },
    addEventSuccess: (state, action: PayloadAction<IEvent>) => {
      state.events = [...state.events, action.payload];
    },
    setActiveEvent: (state, action: PayloadAction<IEvent>) => {
      state.selectedEvent = action.payload;
    },
    deleteEvent: (state, action: PayloadAction<IEvent>) => {
      state.events = state.events.filter(
        (item) => item.id !== action.payload.id
      ); // Assuming items have an 'id' property
    },
    updateFilters(state, action: PayloadAction<string>) {
      const filterIndex = state.selectedCalendars.findIndex(
        (cal) => cal === action.payload
      );
      if (filterIndex !== -1) {
        state.selectedCalendars.splice(filterIndex, 1);
      } else {
        state.selectedCalendars.push(action.payload);
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0;
      }
    },
    updateAllFilters(state, action) {
      const value = action.payload;
      let selected: string[] = [];
      if (value === true) {
        selected = ["Important", "Work", "Social", "Travel"];
      } else {
        selected = [];
      }
      return { ...state, selectedCalendars: selected };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.events = action.payload.data;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchEventSuccess,
  editEventSuccess,
  addEventSuccess,
  setActiveEvent,
  deleteEvent,
  updateFilters,
  updateAllFilters,
} = eventSlice.actions;

const reducer = eventSlice.reducer;

export { reducer as eventReducer };
