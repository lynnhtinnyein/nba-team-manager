"use client";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Edit2, Trash2, Users, MapPin, Flag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShowTeamModal } from "@/store/features/ui/uiSlice";
import { removeTeam, setTargetTeam } from "@/store/features/teams/teamsSlice";
import EmptyTeam from "./EmptyTeam";
import { Team } from "@/types";

export default function TeamGrid() {
    const dispatch = useDispatch();

    const { teams } = useSelector((state: RootState) => state.teams);

    const handleEditTeam = (team: Team) => {
        dispatch(setTargetTeam(team));
        dispatch(setShowTeamModal(true));
    };

    const handleDeleteTeam = (teamId: string) => {
        dispatch(removeTeam(teamId));
    };

    if (teams.length === 0) return <EmptyTeam />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-semibold">{team.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                <MapPin size={14} />
                                <span>{team.region}</span>
                                <Flag size={14} />
                                <span>{team.country}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                onPress={() => handleEditTeam(team)}
                            >
                                <Edit2 size={16} />
                            </Button>
                            <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                color="danger"
                                onPress={() => handleDeleteTeam(team.id)}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                        <div className="flex items-center gap-2 mb-3">
                            <Users size={16} />
                            <span className="text-sm">{team.players.length} players</span>
                        </div>
                        <div className="space-y-2">
                            {team.players.slice(0, 3).map((player) => (
                                <div key={player.id} className="flex items-center gap-2 text-sm">
                                    <Avatar
                                        size="sm"
                                        name={`${player.first_name[0]}${player.last_name[0]}`}
                                        className="text-xs"
                                    />
                                    <span>
                                        {player.first_name} {player.last_name}
                                    </span>
                                </div>
                            ))}
                            {team.players.length > 3 && (
                                <div className="text-xs text-gray-500 ml-10">
                                    +{team.players.length - 3} more players
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
