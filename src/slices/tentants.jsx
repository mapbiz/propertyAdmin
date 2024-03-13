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
        addNewTentant: (state, action) => {
            state.value.push(action.payload);
        },
        editTentant: (state, action) => {
            const {
                id,
                name,
                category,
                logo,
            } = action.payload;

            state.value[state.value.findIndex(tenant => tenant.id === id)] = {
                ...state.value[state.value.findIndex(tenant => tenant.id === id)],
                name,
                category,
                logo,
            };
        },
        deleteTentantOfStorage: (state, action) => {
            const {
                id
            } = action.payload;

            state.value.splice(state.value.findIndex(tentant => tentant.id === id), 1);
        },
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

export const {
    editTentant, 
    deleteTentantOfStorage,
    addNewTentant,
} = tentantsSlice.actions;

export default tentantsSlice.reducer;