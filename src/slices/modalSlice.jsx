import {createSlice} from '@reduxjs/toolkit'

const initialState = {

    modalWindow: false,
    stateWindow: '',

}

export const modalWindowSlice = createSlice({
    name: 'modalWindow',
    initialState,
    reducers: {
        setModalWindow: (state) => {
            state.modalWindow = !state.modalWindow
        },
        setStateWindow: (state, action) => {
            return state = {...state, ...action.payload}
        },
        setModalWindowItem: (state, action) => {
            return state = {...state, ...action.payload}
        }
    },
})

// Action creators are generated for each case reducer function
export const {setModalWindow, setStateWindow} = modalWindowSlice.actions

export default modalWindowSlice.reducer