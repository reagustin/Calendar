import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isModalClosed: true,
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
            state.isModalClosed = false;
        },        
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
            state.isModalClosed = true;
        },        
    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;