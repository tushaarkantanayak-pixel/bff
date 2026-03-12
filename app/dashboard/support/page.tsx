"use client";

import QueryTab from "../../../components/Dashboard/QueryTab";
import AuthGuard from "../../../components/AuthGuard";

export default function SupportPage() {
    return (
        <AuthGuard>
            <QueryTab />
        </AuthGuard>
    );
}
