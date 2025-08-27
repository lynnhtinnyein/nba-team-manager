import { createSlice } from "@reduxjs/toolkit";
import { fetchPlayers } from "./playersThunk";
import { NBAPlayer } from "@balldontlie/sdk";

export interface PlayersState {
    selectedPlayers: NBAPlayer[];
    players: NBAPlayer[];
    cursors: { [page: number]: number | null };
    loading: boolean;
    hasMore: boolean;
    error: string | null;
    page: number;
}

const initialState: PlayersState = {
    selectedPlayers: [],
    players: [],
    cursors: { 1: null },
    loading: false,
    hasMore: false,
    error: null,
    page: 1
};

const playersSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        addToSelection: (state, action) => {
            if (!state.selectedPlayers.find((p) => p.id === action.payload.id)) {
                state.selectedPlayers.push(action.payload);
            }
        },
        removeFromSelection: (state, action) => {
            state.selectedPlayers = state.selectedPlayers.filter((p) => p.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlayers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPlayers.fulfilled, (state, action) => {
            const { data, meta, pageNumber } = action.payload;
            state.loading = false;
            state.hasMore = Boolean(meta?.next_cursor);

            const existingPlayerIds = new Set(state.players.map((player) => player.id));
            const uniqueNewPlayers = data.filter((player) => !existingPlayerIds.has(player.id));

            state.players.push(...uniqueNewPlayers);

            if (meta?.next_cursor) {
                state.cursors[pageNumber + 1] = meta.next_cursor;
            }
        });
        builder.addCase(fetchPlayers.rejected, (state, action) => {
            state.error = action.payload as string;
        });
    }
});

export const { setPage, addToSelection, removeFromSelection } = playersSlice.actions;
export default playersSlice.reducer;
