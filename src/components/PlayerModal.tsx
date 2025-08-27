"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { NBAPlayer } from "@balldontlie/sdk";
import { useEffect, useState } from "react";
import { fetchPlayers } from "@/store/features/players/playersThunk";
import { setPage } from "@/store/features/players/playersSlice";
import moment from "moment";
import PlayerCard from "./PlayerCard";

interface Props {
    show: boolean;
    selectable: boolean;
    onSelect?: (players: NBAPlayer[]) => void;
    selectedPlayers?: NBAPlayer[];
    onClose: () => void;
}

export default function PlayerModal({
    show,
    selectable,
    onSelect,
    selectedPlayers = [],
    onClose
}: Props) {
    const dispatch: AppDispatch = useDispatch();
    const [countdown, setCountdown] = useState<number>(0);

    const { lastFetchAt } = useSelector((state: RootState) => state.ui);
    const { teams, targetTeam } = useSelector((state: RootState) => state.teams);
    const { players, loading, page, hasMore } = useSelector((state: RootState) => state.players);

    const [choosenPlayers, setChoosenPlayers] = useState<NBAPlayer[]>([]);

    useEffect(() => {
        if (show && page === 1 && players.length === 0) {
            dispatch(fetchPlayers(1));
        }
    }, [show]);

    useEffect(() => {
        if (hasMore && page > 1) {
            dispatch(fetchPlayers(page));
        }
    }, [page]);

    useEffect(() => {
        if (!lastFetchAt) return;

        const interval = setInterval(() => {
            const nowUtc = moment.utc();
            const lastFetchUtc = moment.utc(lastFetchAt);
            const diffMinutes = nowUtc.diff(lastFetchUtc, "minutes");

            if (diffMinutes >= 1) {
                setCountdown(0);
            } else {
                const diffSeconds = nowUtc.diff(lastFetchUtc, "seconds");
                const remainingSeconds = 60 - (diffSeconds % 60);
                setCountdown(remainingSeconds);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [lastFetchAt]);

    const canLoadMore = () => {
        if (!lastFetchAt) return true;

        const nowUtc = moment.utc();
        const lastFetchUtc = moment.utc(lastFetchAt);
        const diffMinutes = nowUtc.diff(lastFetchUtc, "minutes");

        return diffMinutes >= 1;
    };

    const loadMorePlayers = () => {
        if (hasMore && !loading && canLoadMore()) {
            dispatch(setPage(page + 1));
        }
    };

    const isPlayerFree = (playerId: number) => {
        const isInTeam = teams.some((team) => team.players.some((p) => p.id === playerId));
        const isInCurrentlySelected = selectedPlayers.some((p) => p.id === playerId);
        return !isInTeam && !isInCurrentlySelected;
    };

    const handleClickPlayerCard = (player: NBAPlayer) => {
        if (!selectable) return;
        setChoosenPlayers((prev) => {
            const isAlreadyChosen = prev.some((p) => p.id === player.id);
            if (isAlreadyChosen) {
                return prev.filter((p) => p.id !== player.id);
            } else {
                return [...prev, player];
            }
        });
    };

    const handleAdd = () => {
        if (!selectable || !onSelect) return;
        onSelect(choosenPlayers);
        setChoosenPlayers([]);
    };

    return (
        <Modal isOpen={show} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader>Browse Players</ModalHeader>
                <ModalBody>
                    <div className="space-y-3">
                        {players.length === 0 ? (
                            <p className="text-center">No players found.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto p-3">
                                {players.map((player) => (
                                    <PlayerCard
                                        key={player.id}
                                        isFree={isPlayerFree(player.id)}
                                        player={player}
                                        isSelected={choosenPlayers.some((p) => p.id === player.id)}
                                        onClick={handleClickPlayerCard}
                                        isSelectable={selectable}
                                    />
                                ))}
                            </div>
                        )}

                        {hasMore && (
                            <div className="text-center">
                                <Button
                                    variant="bordered"
                                    onPress={loadMorePlayers}
                                    isLoading={loading}
                                    isDisabled={!canLoadMore() || loading}
                                >
                                    {loading ? (
                                        <Spinner size="sm" />
                                    ) : canLoadMore() ? (
                                        "Load More Players"
                                    ) : (
                                        `Load More Players (${countdown}s)`
                                    )}
                                </Button>
                            </div>
                        )}

                        {loading && page === 1 && (
                            <div className="flex justify-center py-8">
                                <Spinner size="lg" />
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter className="flex flex-row space-x-2">
                    {selectable && choosenPlayers.length > 0 ? (
                        <Button color="primary" onPress={handleAdd}>
                            Add {choosenPlayers.length} Players
                        </Button>
                    ) : (
                        ""
                    )}
                    <Button onPress={onClose}>Done</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
