import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        createObject: false,
    },
};


export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        /**
         * @param action { { payload: { notificationName: string } } }
         */
        setNotificationOpen: (state, action) => {
            const {
                notificationName,
            } = action.payload;

            state.value[notificationName] = true;
        },
        /**
         * @param action { { payload: { notificationName: string } } }
         */
        setNotificationClose: (state, action) => {
            const {
                notificationName,
            } = action.payload;

            state.value[notificationName] = false;
        },
        /**
         * @param action { { payload: { notificationName: string } } }
         */
        toggleNotification: (state, action) => {
            const {
                notificationName,
            } = action.payload;

            state.value[notificationName] = !state.value[notificationName];
        },


    },
});
export const {
    setNotificationClose,
    setNotificationOpen,
    toggleNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;