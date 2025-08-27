"use client";
import { setShowTeamModal } from "@/store/features/ui/uiSlice";
import { AppDispatch } from "@/store";
import { Button } from "@heroui/button";
import { Users } from "lucide-react";
import { useDispatch } from "react-redux";

const EmptyTeam = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleCreateTeam = () => {
        dispatch(setShowTeamModal(true));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="col-span-full text-center py-12">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No teams yet</h3>
                <p className="text-gray-600 mb-4">Create your first team to get started</p>
                <Button color="primary" onPress={handleCreateTeam}>
                    Create Team
                </Button>
            </div>
        </div>
    );
};

export default EmptyTeam;
