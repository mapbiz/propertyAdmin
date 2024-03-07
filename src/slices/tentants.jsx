import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getTentants as getTentantsApi } from "../api/api.js";

const initialState = {
    isLoading: true,
    value: [
        {
            id: "",
            createdAt: "",
            updatedAt: "",
            name: "",
            category: "",
            logo: "",
        }
    ],
};

export const getTentants = createAsyncThunk(
    'get/tentants',
    async () => {
        const resToGetAllTentants = await getTentantsApi();

        return resToGetAllTentants.data;
    }
)

export const tentantsSlice = createSlice({
    name: "tentants",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getTentants.pending, state => {
            state.isLoading = true;
        });

        builder.addCase(getTentants.fulfilled, (state, action) => {
            state.isLoading = false;
            state.value = action.payload.data;

        });
    }
});
export default tentantsSlice.reducer;