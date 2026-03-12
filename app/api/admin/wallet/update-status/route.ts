import { connectDB } from "@/lib/mongodb";
import WalletTransaction from "@/models/WalletTransaction";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return Response.json(
                { success: false, message: "Missing required fields" },
                { status: 400 }
            );
        }

        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer "))
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        const token = auth.split(" ")[1];
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        } catch (e) {
            return Response.json({ message: "Forbidden" }, { status: 403 });
        }

        if (decoded.userType !== "owner")
            return Response.json({ message: "Forbidden" }, { status: 403 });


        /* ================= FIND TRANSACTION ================= */
        const transaction = await WalletTransaction.findById(id);
        if (!transaction) {
            return Response.json(
                { success: false, message: "Transaction not found" },
                { status: 404 }
            );
        }

        if (transaction.status === status) {
            return Response.json(
                { success: false, message: "Status is already " + status },
                { status: 400 }
            );
        }

        /* ================= UPDATE TRANSACTION & WALLET ================= */
        // If changing to SUCCESS and type is CREDIT, add to user wallet
        if (status === "success" && transaction.type === "credit") {
            const user = await User.findOneAndUpdate(
                { _id: transaction.userObjectId },
                { $inc: { wallet: transaction.amount } },
                { new: true }
            );

            if (user) {
                // Update balanceAfter in transaction record
                transaction.balanceAfter = user.wallet;
            }
        } else if (transaction.status === "success" && status !== "success" && transaction.type === "credit") {
            // If reverting a successful transaction (e.g. refund/void), deduct from user wallet
            const user = await User.findOneAndUpdate(
                { _id: transaction.userObjectId },
                { $inc: { wallet: -transaction.amount } },
                { new: true }
            );

            if (user) {
                transaction.balanceAfter = user.wallet;
            }
        }

        transaction.status = status;
        await transaction.save();

        return Response.json({
            success: true,
            message: `Transaction verified & updated to ${status}`,
            data: transaction
        });

    } catch (err) {
        console.error("Status update failed", err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
