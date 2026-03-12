"use client";

import RedeemTab from "../../../components/Dashboard/RedeemTab";
import { useUser } from "../layout";
import AuthGuard from "../../../components/AuthGuard";

export default function RedeemPage() {
    const { setWalletBalance } = useUser();
    return (
        <AuthGuard>
            <RedeemTab setWalletBalance={setWalletBalance} />
        </AuthGuard>
    );
}
