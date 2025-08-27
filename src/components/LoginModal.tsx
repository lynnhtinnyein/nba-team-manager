"use client";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/features/auth/authSlice";
import { v4 as uuid } from "uuid";
import { useRef, useState } from "react";

export default function LoginModal() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [showError, setShowError] = useState(false);

    const handleSignIn = () => {
        if (!usernameRef?.current?.value) {
            setShowError(true);
            return;
        }

        setShowError(false);

        const id = uuid();
        dispatch(
            login({
                id,
                username: usernameRef.current?.value
            })
        );
    };

    return (
        <Modal
            isOpen={!isAuthenticated}
            placement="top-center"
            backdrop="blur"
            isDismissable={false}
        >
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                    <Input
                        ref={usernameRef}
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        variant="bordered"
                        endContent={
                            <User className="text-2xl text-default-400 pointer-events-none shrink-0" />
                        }
                        errorMessage="Please enter a username"
                        isInvalid={showError}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onPress={handleSignIn}>
                        Sign in
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
