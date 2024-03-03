import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    arendators: [], // Исходное состояние для списка арендодателей
    isLoading: false,
    error: null,
}

export const arendatorSlice = createSlice({
    name: 'arendators',
    initialState,
    reducers: {
        fetchArendators(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchArendatorsSuccess: (state, action) => {
            state.arendators = action.payload
        },
        fetchArendatorsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {fetchArendators,fetchArendatorsSuccess,fetchArendatorsFailure} = arendatorSlice.actions

export default arendatorSlice.reducer
