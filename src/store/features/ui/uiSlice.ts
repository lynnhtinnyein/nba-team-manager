import { createSlice } from "@reduxjs/toolkit";

interface UiState {
    showTeamModal: boolean;
    showPlayerModal: boolean;
    lastFetchAt: string | null;
}

const initialState: UiState = {
    showTeamModal: false,
    showPlayerModal: false,
    lastFetchAt: null
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setShowTeamModal: (state, action) => {
            state.showTeamModal = action.payload;
        },
        setShowPlayerModal: (state, action) => {
            state.showPlayerModal = action.payload;
        },
        updateLastFetchAt: (state, action) => {
            state.lastFetchAt = action.payload;
        }
    }
});

export const { setShowTeamModal, setShowPlayerModal, updateLastFetchAt } = uiSlice.actions;
export default uiSlice.reducer;
