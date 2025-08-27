"use client";
import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";

const LoginDetails = () => {
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-row">
            <span className="font-bold">Welcome, {user.username}</span>
        </div>
    );
};

export default LoginDetails;
