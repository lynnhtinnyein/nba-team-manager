import { BalldontlieAPI } from "@balldontlie/sdk";
import { PlayersState } from "./playersSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateLastFetchAt } from "../ui/uiSlice";

const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;

export const fetchPlayers = createAsyncThunk(
    "players/fetchPlayers",
    async (pageNumber: number, { getState, rejectWithValue, dispatch }) => {
        try {
            if (!apiKey) {
                throw new Error("BALLDONTLIE API key is missing");
            }

            const state = getState() as { players: PlayersState };
            const cursor = state.players.cursors[pageNumber];

            dispatch(updateLastFetchAt(new Date().toISOString()));

            const api = new BalldontlieAPI({ apiKey });

            const res = await api.nba.getPlayers({
                per_page: 10,
                ...(cursor ? { cursor } : {})
            });

            return { data: res.data, meta: res.meta, pageNumber };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
