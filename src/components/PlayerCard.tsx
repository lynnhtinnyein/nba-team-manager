"use client";
import { RootState } from "@/store";
import { Avatar } from "@heroui/avatar";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { useSelector } from "react-redux";

const PlayerCard = ({ isFree, player, isSelected, onClick, isSelectable }) => {
    const { teams } = useSelector((state: RootState) => state.teams);
    const team = teams.find((team) => team.players.some((p) => p.id === player.id));

    const handleClick = () => {
        if (isFree && onClick) {
            onClick(player);
        }
    };
    return (
        <button className={isSelectable ? "cursor-pointer" : ""} onClick={handleClick}>
            <Card
                className={`${!isFree ? "opacity-50" : ""} ${
                    isSelected ? "border border-blue-500" : ""
                }`}
            >
                <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar
                                name={`${player.first_name[0]}${player.last_name[0]}`}
                                size="md"
                            />
                            <div>
                                <p className="font-medium">
                                    {player.first_name} {player.last_name}
                                </p>
                                <p className="text-sm text-gray-600">{player.position}</p>
                                {team && (
                                    <Chip size="sm" color="secondary" className="mt-1">
                                        In: {team.name}
                                    </Chip>
                                )}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </button>
    );
};

export default PlayerCard;
