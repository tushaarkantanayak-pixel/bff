"use client";

import OrdersTab from "../../../components/Dashboard/OrdersTab";
import AuthGuard from "../../../components/AuthGuard";

export default function OrdersPage() {
    return (
        <AuthGuard>
            <OrdersTab />
        </AuthGuard>
    );
}
