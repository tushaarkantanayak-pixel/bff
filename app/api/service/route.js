import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        success: true,
        message: "Welcome to bluebuff.in API Service",
        version: "1.0.0",
        docs: "https://bluebuff.in/api-docs.html",
        status: "operational",
        endpoints: {
            balance: "/api/service/balance",
            games: "/api/service/games",
            order: "/api/service/order",
            status: "/api/service/status",
            validate: "/api/service/validate",
        }
    });
}
