import crypto from "crypto";
import { connectDB } from "./mongodb";
import ApiKey from "@/models/ApiKey";
import User from "@/models/User";

export async function validateApiKey(req) {
    try {
        await connectDB();
        const apiKey = req.headers.get("x-api-key") || req.nextUrl?.searchParams?.get("api_key");

        if (!apiKey) {
            return { success: false, message: "API key is missing" };
        }

        const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
        const keyDoc = await ApiKey.findOne({ keyHash, status: "active" });

        if (!keyDoc) {
            return { success: false, message: "Invalid or revoked API key" };
        }

        const user = await User.findById(keyDoc.userId);
        if (!user) {
            return { success: false, message: "Associated user not found" };
        }

        const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0] ||
            req.headers.get("x-real-ip") ||
            "unknown";

        // 1. IP Whitelisting
        if (keyDoc.allowedIps && keyDoc.allowedIps.length > 0) {
            if (!keyDoc.allowedIps.includes(clientIp)) {
                return { success: false, message: `Access denied. Authorized IPs only.` };
            }
        }

        // 2. Daily Limit Tracking (Validation Removed)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastReset = keyDoc.lastResetDate
            ? new Date(keyDoc.lastResetDate).setHours(0, 0, 0, 0)
            : 0;

        let usedToday = keyDoc.usedToday || 0;
        const isNewDay = today.getTime() > lastReset;

        if (isNewDay) {
            usedToday = 0;
        }

        const dailyLimit = keyDoc.dailyLimit || 25000;
        // Validation removed as per request to allow orders regardless of limit


        // 3. Update last-used metadata & handle reset if new day
        const updateData = {
            lastUsed: new Date(),
            lastUsedIp: clientIp,
        };

        if (isNewDay) {
            updateData.usedToday = 0;
            updateData.lastResetDate = today;
            // For a reset, we AWAIT to ensure the order route's $inc starts from correct base
            await ApiKey.findByIdAndUpdate(keyDoc._id, updateData);
        } else {
            // For regular audit update, fire-and-forget is fine
            ApiKey.findByIdAndUpdate(keyDoc._id, updateData).exec();
        }

        return {
            success: true,
            user: {
                id: user._id,
                userId: user.userId,
                userType: user.userType,
                wallet: user.wallet,
                name: user.name,
            },
            key: {
                id: keyDoc._id,
                name: keyDoc.name,
                dailyLimit,
                usedToday,
            }
        };
    } catch (error) {
        console.error("API Key Validation error:", error);
        return { success: false, message: "Identification failure" };
    }
}
