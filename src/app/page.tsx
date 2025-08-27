import ActionButtons from "@/components/ActionButtons";
import TeamGrid from "@/components/TeamGrid";
import TeamModal from "@/components/TeamModal";
import LogoutButton from "@/components/LogoutButton";
import ThemeSwitcher from "@/components/ThemeSwitch";
import Hydrate from "@/components/Hydrate";
import LoginModal from "@/components/LoginModal";
import LoginDetails from "@/components/LoginDetails";

export default function TeamManagementApp() {
    return (
        <>
            <LoginModal />
            <Hydrate />
            <div className="min-h-screen p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Team Management
                                </h1>
                                <ActionButtons />
                            </div>

                            <div className="flex flex-col space-y-3 items-end">
                                <LoginDetails />
                                <div className="flex items-center space-x-3">
                                    <ThemeSwitcher />
                                    <LogoutButton />
                                </div>
                            </div>
                        </div>
                    </div>

                    <TeamGrid />
                </div>
            </div>
        </>
    );
}
