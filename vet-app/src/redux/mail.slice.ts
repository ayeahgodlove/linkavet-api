import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MailService } from "../services/mail.service";
import { IMailState, emptyMail, IMail, IMailResponse, IMailResponses } from "../models/mail.model";

export const initialState: IMailState = {
  mails: [],
  errors: "",
  mail: emptyMail,
  isLoading: false,
  initialFetch: true,
};

export const fetchMailsAsync = createAsyncThunk<IMailResponses, void>(
  "mail/fetchMailsAsync",
  async (_, thunkApi) => {
    try {
      return await MailService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const mailSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    fetchMailRequest: (state) => {
      state.isLoading = true;
    },
    fetchMailSuccess: (state, action: PayloadAction<IMail[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.mails = action.payload;
    },
    fetchMailError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editMailSuccess: (state, action: PayloadAction<IMail>) => {
      state.mails = state.mails.map((mail) => {
        return mail.id === action.payload.id ? action.payload : mail;
      });
    },
    addMailSuccess: (state, action: PayloadAction<IMail>) => {
      state.mails = [...state.mails, action.payload];
    },
    setActiveMail: (state, action: PayloadAction<IMail>) => {
      state.mail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMailsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMailsAsync.fulfilled, (state, action: PayloadAction<IMailResponses>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.mails = action.payload.data;
    });
    builder.addCase(fetchMailsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchMailRequest,
  fetchMailSuccess,
  fetchMailError,
  editMailSuccess,
  addMailSuccess,
  setActiveMail,
} = mailSlice.actions;

const reducer = mailSlice.reducer;

export { reducer as mailReducer };
