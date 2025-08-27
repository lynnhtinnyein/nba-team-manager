"use client";
import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { Moon, Sun } from "lucide-react";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <Button
            isIconOnly
            aria-label="Like"
            variant="light"
            radius="full"
            onPress={handleToggle}
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </Button>
    );
}
