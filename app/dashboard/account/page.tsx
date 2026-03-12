"use client";

import AccountTab from "../../../components/Dashboard/AccountTab";
import { useUser } from "../layout";
import AuthGuard from "../../../components/AuthGuard";

export default function AccountPage() {
    const { userDetails } = useUser();
    return (
        <AuthGuard>
            <AccountTab userDetails={userDetails} />
        </AuthGuard>
    );
}
