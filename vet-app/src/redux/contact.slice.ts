import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  emptyContact,
  IContact,
  IContactResponses,
  IContactState,
} from "../models/contact";
import { contactService } from "../services/contact.service";

export const initialState: IContactState = {
  contacts: [],
  errors: "",
  contact: emptyContact,
  isLoading: false,
  initialFetch: true,
};

export const fetchContactsAsync = createAsyncThunk<IContactResponses, void>(
  "contact/fetchContactsAsync",
  async (_, thunkApi) => {
    try {
      return await contactService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    fetchcontactRequest: (state) => {
      state.isLoading = true;
    },
    fetchcontactSuccess: (state, action: PayloadAction<IContact[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.contacts = action.payload;
    },
    fetchcontactError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editContactSuccess: (state, action: PayloadAction<IContact>) => {
      state.contacts = state.contacts.map((contact) => {
        return contact.id === action.payload.id ? action.payload : contact;
      });
    },
    addContactSuccess: (state, action: PayloadAction<IContact>) => {
      state.contacts = [...state.contacts, action.payload];
    },
    setActiveContact: (state, action: PayloadAction<IContact>) => {
      state.contact = action.payload;
    },
    deleteContact: (state, action: PayloadAction<IContact>) => {
      state.contacts = state.contacts.filter(
        (item) => item.id !== action.payload.id
      ); // Assuming items have an 'id' property
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchContactsAsync.fulfilled,
      (state, action: PayloadAction<IContactResponses>) => {
        state.isLoading = false;
        state.initialFetch = false;
        state.contacts = action.payload.data;
      }
    );
    builder.addCase(fetchContactsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchcontactRequest,
  fetchcontactSuccess,
  fetchcontactError,
  editContactSuccess,
  addContactSuccess,
  setActiveContact,
  deleteContact,
} = contactSlice.actions;

const reducer = contactSlice.reducer;

export { reducer as contactReducer };
