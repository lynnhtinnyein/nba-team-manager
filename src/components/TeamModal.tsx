"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Avatar } from "@heroui/avatar";
import { Divider } from "@heroui/divider";
import { Search, UserMinus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setShowTeamModal } from "@/store/features/ui/uiSlice";
import { addTeam, setTargetTeam, updateTeam } from "@/store/features/teams/teamsSlice";
import { AppDispatch, RootState } from "@/store";
import { NBAPlayer } from "@balldontlie/sdk";
import { v4 as uuid } from "uuid";
import PlayerModal from "./PlayerModal";

const COUNTRIES = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Australia",
    "Japan",
    "Brazil",
    "Argentina"
];

const REGIONS = ["North America", "South America", "Europe", "Asia", "Africa", "Oceania"];

export default function TeamModal() {
    const dispatch: AppDispatch = useDispatch();

    const { showTeamModal } = useSelector((state: RootState) => state.ui);
    const { targetTeam, teams } = useSelector((state: RootState) => state.teams);
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    const [teamForm, setTeamForm] = useState({
        name: "",
        region: "",
        country: ""
    });
    const [selectedPlayers, setSelectedPlayers] = useState<NBAPlayer[]>([]);

    const isDuplicateTeamName = useMemo(() => {
        const name = teamForm.name.trim().toLowerCase();
        return teams.some(
            (team) =>
                team.name.trim().toLowerCase() === name &&
                (!targetTeam || team.id !== targetTeam.id)
        );
    }, [teamForm.name, teams]);

    useEffect(() => {
        if (targetTeam) {
            setTeamForm({
                name: targetTeam.name,
                region: targetTeam.region,
                country: targetTeam.country
            });
            setSelectedPlayers(targetTeam.players || []);
        } else {
            setTeamForm({
                name: "",
                region: "",
                country: ""
            });
            setSelectedPlayers([]);
        }
    }, [targetTeam]);

    const handleClose = () => {
        dispatch(setTargetTeam(null));
        dispatch(setShowTeamModal(false));
    };

    const openPlayerModal = () => {
        setShowPlayerModal(true);
    };

    const handleSave = () => {
        if (
            !teamForm.name ||
            !teamForm.region ||
            !teamForm.country ||
            selectedPlayers.length === 0
        ) {
            return;
        }
        const teamData = {
            name: teamForm.name,
            region: teamForm.region,
            country: teamForm.country,
            players: selectedPlayers
        };

        if (targetTeam) {
            dispatch(updateTeam({ id: targetTeam.id, ...teamData }));
        } else {
            dispatch(addTeam({ id: uuid(), ...teamData }));
        }

        handleClose();
    };

    const handleRemovePlayer = (playerId: number) => {
        setSelectedPlayers((prev) => prev.filter((player) => player.id !== playerId));
    };

    const handlePlayersSelect = (players: NBAPlayer[]) => {
        setSelectedPlayers((prev) => {
            const newPlayers = players.filter((p) => !prev.some((sp) => sp.id === p.id));
            return [...prev, ...newPlayers];
        });
        setShowPlayerModal(false);
    };

    return (
        <>
            <Modal isOpen={showTeamModal} onClose={handleClose} size="2xl" scrollBehavior="inside">
                <ModalContent>
                    <ModalHeader>{targetTeam ? "Edit Team" : "Create New Team"}</ModalHeader>
                    <ModalBody>
                        <div className="space-y-4">
                            <Input
                                label="Team Name"
                                placeholder="Enter team name"
                                value={teamForm.name}
                                onChange={(e) =>
                                    setTeamForm((prev) => ({ ...prev, name: e.target.value }))
                                }
                                isInvalid={isDuplicateTeamName}
                                errorMessage="Team name already exists"
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    label="Region"
                                    placeholder="Select region"
                                    selectedKeys={teamForm.region ? [teamForm.region] : []}
                                    onSelectionChange={(keys) => {
                                        const region = Array.from(keys)[0] as string;
                                        setTeamForm((prev) => ({ ...prev, region }));
                                    }}
                                >
                                    {REGIONS.map((region) => (
                                        <SelectItem key={region} data-value={region}>
                                            {region}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Country"
                                    placeholder="Select country"
                                    selectedKeys={teamForm.country ? [teamForm.country] : []}
                                    onSelectionChange={(keys) => {
                                        const country = Array.from(keys)[0] as string;
                                        setTeamForm((prev) => ({ ...prev, country }));
                                    }}
                                >
                                    {COUNTRIES.map((country) => (
                                        <SelectItem key={country} data-value={country}>
                                            {country}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <Divider />

                            <div>
                                <h4 className="text-lg font-medium mb-3">
                                    Selected Players ({selectedPlayers?.length})
                                </h4>
                                {selectedPlayers?.length > 0 ? (
                                    <div className="space-y-2 max-h-40 overflow-y-auto">
                                        {selectedPlayers?.map((player) => (
                                            <div
                                                key={player.id}
                                                className="flex items-center justify-between p-2 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        size="sm"
                                                        name={`${player.first_name[0]}${player.last_name[0]}`}
                                                    />
                                                    <div>
                                                        <p className="font-medium">
                                                            {player.first_name} {player.last_name}
                                                        </p>
                                                        <p className="text-xs text-gray-600">
                                                            {player.position}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="light"
                                                    color="danger"
                                                    onPress={() => handleRemovePlayer(player.id)}
                                                >
                                                    <UserMinus size={16} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 text-center py-4">
                                        No players selected
                                    </p>
                                )}
                            </div>

                            <Button
                                variant="bordered"
                                startContent={<Search size={16} />}
                                onPress={openPlayerModal}
                                className="w-full"
                            >
                                Browse & Add Players
                            </Button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" onPress={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            onPress={handleSave}
                            isDisabled={
                                !teamForm.name ||
                                !teamForm.region ||
                                !teamForm.country ||
                                selectedPlayers.length === 0 ||
                                isDuplicateTeamName
                            }
                        >
                            {targetTeam ? "Update Team" : "Create Team"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <PlayerModal
                show={showPlayerModal}
                onClose={() => setShowPlayerModal(false)}
                selectable={true}
                onSelect={handlePlayersSelect}
                selectedPlayers={selectedPlayers}
            />
        </>
    );
}
