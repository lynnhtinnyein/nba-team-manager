import { NBAPlayer } from "@balldontlie/sdk";

type User = {
    id: string;
    username: string;
};

type Team = {
    id: string;
    name: string;
    playerCount: number;
    region: string;
    country: string;
    players: NBAPlayer[];
    createdAt: Date;
    updatedAt: Date;
};
