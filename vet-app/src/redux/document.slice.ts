import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyDocument, IDocument, IDocumentState } from "models/document";
import { DocumentService } from "services/document.service";

export const initialState: IDocumentState = {
  documents: [],
  errors: "",
  document: emptyDocument,
  isLoading: false,
  initialFetch: true,
};

export const fetchDocumentsAsync = createAsyncThunk<IDocument[], void>(
  "document/fetchDocumentsAsync",
  async (_, thunkApi) => {
    try {
      return await DocumentService.list();
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    fetchdocumentRequest: (state) => {
      state.isLoading = true;
    },
    fetchdocumentSuccess: (state, action: PayloadAction<IDocument[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.documents = action.payload;
    },
    fetchdocumentError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editDocumentSuccess: (state, action: PayloadAction<IDocument>) => {
      state.documents = state.documents.map((document) => {
        return document.id === action.payload.id ? action.payload : document;
      });
    },
    addDocumentSuccess: (state, action: PayloadAction<IDocument>) => {
      state.documents = [...state.documents, action.payload];
    },
    setActiveDocument: (state, action: PayloadAction<IDocument>) => {
      state.document = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDocumentsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.documents = action.payload;
    });
    builder.addCase(fetchDocumentsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export const {
  fetchdocumentRequest,
  fetchdocumentSuccess,
  fetchdocumentError,
  editDocumentSuccess,
  addDocumentSuccess,
  setActiveDocument,
} = documentSlice.actions;

const reducer = documentSlice.reducer;

export { reducer as documentReducer };
