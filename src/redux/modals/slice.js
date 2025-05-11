import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk } from '../auth/operations';

const initialState = {
    isLogOutModalOpen: false,
    isEditModalOpen: false,
    isAddModalOpen: false,
};

const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openLogOutModal(state) {
            state.isLogOutModalOpen = true;
            state.isAddModalOpen = false;
            state.isEditModalOpen = false;
        },
        openEditModal(state) {
            state.isEditModalOpen = true;
            state.isLogOutModalOpen = false;
            state.isAddModalOpen = false;
        },
        openAddModal(state) {
            state.isAddModalOpen = true;
            state.isLogOutModalOpen = false;
            state.isEditModalOpen = false;
        },
        closeModal() {
            return initialState;
        },
        addEditId: (state, { payload }) => {
            state.isEditId = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(logoutThunk.fulfilled, () => {
            return initialState;
        });
    },
});

export const { openLogOutModal, openEditModal, openAddModal, closeModal, addEditId } = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
