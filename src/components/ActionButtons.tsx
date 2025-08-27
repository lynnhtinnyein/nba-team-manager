"use client";
import { useState } from "react";
import { Button } from "@heroui/button";
import { Plus, Users } from "lucide-react";
import TeamModal from "./TeamModal";
import PlayerModal from "./PlayerModal";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { setShowTeamModal } from "@/store/features/ui/uiSlice";

const ActionButtons = () => {
    const dispatch: AppDispatch = useDispatch();
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    const openTeamModal = () => {
        dispatch(setShowTeamModal(true));
    };

    return (
        <div className="flex gap-4">
            <Button color="primary" startContent={<Plus size={20} />} onPress={openTeamModal}>
                Create Team
            </Button>
            <Button
                variant="bordered"
                startContent={<Users size={20} />}
                onPress={() => setShowPlayerModal(true)}
            >
                Browse Players
            </Button>
            <TeamModal />
            <PlayerModal
                show={showPlayerModal}
                onClose={() => setShowPlayerModal(false)}
                selectable={false}
            />
        </div>
    );
};

export default ActionButtons;
