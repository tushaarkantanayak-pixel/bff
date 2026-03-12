import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import RedeemCode from "@/models/RedeemCode";
import WalletTransaction from "@/models/WalletTransaction";
import crypto from "crypto";

async function getUser(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return await User.findById(decoded.userId);
    } catch (err) {
        return null;
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const user = await getUser(req);
        if (!user) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { code } = await req.json();
        if (!code) {
            return NextResponse.json({ success: false, message: "Code is required" }, { status: 400 });
        }

        const normalizedCode = code.trim().toUpperCase();

        // 1. Find the code
        const redeemCode = await RedeemCode.findOne({ code: normalizedCode });

        if (!redeemCode) {
            return NextResponse.json({ success: false, message: "Invalid redeem code" }, { status: 404 });
        }

        // 2. Check if expired or inactive
        if (redeemCode.status !== "active") {
            return NextResponse.json({ success: false, message: "This code is no longer active" }, { status: 400 });
        }

        if (redeemCode.isSeries) {
            // MULTI-USE SERIES LOGIC

            // a. Check if user already claimed
            const alreadyClaimed = redeemCode.claimedBy.some(claim => claim.user.toString() === user._id.toString());
            if (alreadyClaimed) {
                return NextResponse.json({ success: false, message: "You have already used this code once. Try some other code." }, { status: 400 });
            }

            // b. Check if total uses reached
            if (redeemCode.claimedBy.length >= redeemCode.maxUses) {
                return NextResponse.json({ success: false, message: "This code has reached its usage limit. Try some other code." }, { status: 400 });
            }

            // c. Atomic Update for Series
            const updated = await RedeemCode.findOneAndUpdate(
                {
                    _id: redeemCode._id,
                    status: "active",
                    "claimedBy.user": { $ne: user._id } // Not claimed by this user
                },
                {
                    $push: { claimedBy: { user: user._id, at: new Date() } }
                },
                { new: true }
            );

            if (!updated) {
                return NextResponse.json({ success: false, message: "Failed to claim coupon. It might have reached its limit or you've already claimed it." }, { status: 400 });
            }

            // If it was the last use, we could mark as used, but not strictly necessary for series since we check length
            if (updated.claimedBy.length >= updated.maxUses) {
                await RedeemCode.findByIdAndUpdate(updated._id, { $set: { status: "used" } });
            }

        } else {
            // SINGLE-USE LOGIC (Original)
            if (redeemCode.status === "used") {
                return NextResponse.json({ success: false, message: "This code has already been used. Try some other code." }, { status: 400 });
            }

            const updated = await RedeemCode.findOneAndUpdate(
                { _id: redeemCode._id, status: "active" },
                {
                    $set: {
                        status: "used",
                        usedBy: user._id,
                        usedAt: new Date()
                    }
                },
                { new: true }
            );

            if (!updated) {
                return NextResponse.json({ success: false, message: "Failed to redeem code. It might have been used just now." }, { status: 400 });
            }
        }

        // 3. Update User Wallet
        const balanceBefore = user.wallet || 0;
        const balanceAfter = balanceBefore + redeemCode.value;

        await User.findByIdAndUpdate(user._id, {
            $inc: { wallet: redeemCode.value }
        });

        // 4. Log Transaction
        const transactionId = `TXN-REDEEM-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
        await WalletTransaction.create({
            transactionId,
            userId: user.userId,
            userObjectId: user._id,
            type: "credit",
            amount: redeemCode.value,
            balanceBefore,
            balanceAfter,
            description: `Gift Code Redeemed: ${redeemCode.code}`,
            status: "success",
            performedBy: "user",
            referenceId: redeemCode._id.toString()
        });

        return NextResponse.json({
            success: true,
            message: `Successfully redeemed ₹${redeemCode.value}`,
            newBalance: balanceAfter
        });

    } catch (error) {
        console.error("Redeem Code Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
