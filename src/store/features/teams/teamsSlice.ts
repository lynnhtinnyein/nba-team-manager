import { Team } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface TeamsState {
    teams: Team[];
    targetTeam: Team | null;
}

const initialState: TeamsState = {
    teams: [],
    targetTeam: null
};

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        addTeam: (state, action) => {
            state.teams.push(action.payload);
        },
        updateTeam: (state, action) => {
            const index = state.teams.findIndex((team) => team.id === action.payload.id);
            if (index !== -1) {
                state.teams[index] = action.payload;
            }
        },
        removeTeam: (state, action) => {
            state.teams = state.teams.filter((team) => team.id !== action.payload);
        },
        setTargetTeam: (state, action) => {
            state.targetTeam = action.payload;
        }
    }
});

export const { addTeam, updateTeam, removeTeam, setTargetTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
