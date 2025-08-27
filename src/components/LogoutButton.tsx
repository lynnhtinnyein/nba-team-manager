"use client";
import { Button } from "@heroui/button";
import { LogOut } from "lucide-react";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";

export default function ThemeSwitcher() {
    const dispatch: AppDispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
    };

    if (!isAuthenticated) return null;

    return (
        <Button variant="bordered" startContent={<LogOut size={20} />} onPress={handleLogout}>
            Logout
        </Button>
    );
}
