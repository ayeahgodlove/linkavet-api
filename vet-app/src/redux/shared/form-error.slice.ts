import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { emptyResponseBase, IResponseBase } from 'models/response-base.model'

export const initialState: IResponseBase = emptyResponseBase

export const formErrorSlice = createSlice({
    name: 'currentuser',
    initialState,
    reducers: {
        setFormError: (state, action: PayloadAction<IResponseBase>) => {
            state.success = action.payload.success
            state.message = action.payload.message
            state.validationErrors = action.payload.validationErrors
        },
    },
})

export const { setFormError } = formErrorSlice.actions

const reducer = formErrorSlice.reducer

export { reducer as formErrorReducer }
