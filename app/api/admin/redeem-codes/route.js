import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import RedeemCode from "@/models/RedeemCode";

async function verifyOwner(req) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (user && user.userType === "owner") return user;
        return null;
    } catch (err) {
        return null;
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized: Owner access required" }, { status: 401 });
        }

        const { amount, quantity, prefix = "TK-", isSeries = false, customCode = "", maxUses = 1 } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ success: false, message: "Invalid amount" }, { status: 400 });
        }

        if (isSeries) {
            if (!customCode || customCode.trim().length < 4) {
                return NextResponse.json({ success: false, message: "Series code must be at least 4 characters" }, { status: 400 });
            }
            if (!maxUses || maxUses <= 0) {
                return NextResponse.json({ success: false, message: "Max uses must be greater than 0" }, { status: 400 });
            }

            const code = customCode.trim().toUpperCase();

            // Check if code already exists
            const existing = await RedeemCode.findOne({ code });
            if (existing) {
                return NextResponse.json({ success: false, message: "This code already exists" }, { status: 400 });
            }

            const newCode = await RedeemCode.create({
                code,
                value: amount,
                isSeries: true,
                maxUses: maxUses,
                createdBy: owner._id,
                status: "active"
            });

            return NextResponse.json({
                success: true,
                message: `Series coupon ${code} created for ${maxUses} users.`,
                codes: [newCode.code]
            });

        } else {
            // Original logic for unique codes
            if (!quantity || quantity <= 0) {
                return NextResponse.json({ success: false, message: "Invalid quantity" }, { status: 400 });
            }

            const generatedCodes = [];
            for (let i = 0; i < quantity; i++) {
                const randomString = crypto.randomBytes(8).toString("hex").toUpperCase();
                const code = `${prefix}${randomString}`;

                generatedCodes.push({
                    code,
                    value: amount,
                    createdBy: owner._id,
                    status: "active"
                });
            }

            const result = await RedeemCode.insertMany(generatedCodes);

            return NextResponse.json({
                success: true,
                message: `Successfully generated ${quantity} unique codes of ₹${amount} each.`,
                codes: result.map(c => c.code)
            });
        }
    } catch (error) {
        console.error("Generate Codes Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const [codes, totals, totalCount] = await Promise.all([
            RedeemCode.find({})
                .populate("usedBy", "name userId")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            RedeemCode.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]),
            RedeemCode.countDocuments({})
        ]);

        const totalUsed = totals.find(t => t._id === "used")?.count || 0;

        return NextResponse.json({
            success: true,
            codes,
            summary: {
                totalUsed,
                total: totals.reduce((acc, curr) => acc + curr.count, 0)
            },
            pagination: {
                total: totalCount,
                pages: Math.ceil(totalCount / limit),
                currentPage: page,
                limit
            }
        });
    } catch (error) {
        console.error("Fetch Codes Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        await connectDB();
        const owner = await verifyOwner(req);
        if (!owner) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const codeId = searchParams.get("id");

        if (!codeId) {
            return NextResponse.json({ success: false, message: "Code ID required" }, { status: 400 });
        }

        // We can either delete or mark as expired. Mark as expired is safer for records.
        // But for "expiring" in a simple tool, deletion is often preferred to clean up.
        // Let's go with deletion as requested "option to expire those".
        await RedeemCode.findByIdAndDelete(codeId);

        return NextResponse.json({
            success: true,
            message: "Redeem code expired/removed successfully"
        });
    } catch (error) {
        console.error("Delete Code Error:", error);
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}
