import mongoose from "mongoose";

const RedeemCodeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
        },
        value: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["active", "used", "expired"],
            default: "active",
        },
        // For single-use unique codes
        usedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        usedAt: {
            type: Date,
            default: null,
        },
        // For multi-use series coupons
        isSeries: {
            type: Boolean,
            default: false,
        },
        maxUses: {
            type: Number,
            default: 1,
        },
        claimedBy: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            at: {
                type: Date,
                default: Date.now
            }
        }],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// Virtual to check if code is fully claimed
RedeemCodeSchema.virtual('isFullyClaimed').get(function () {
    if (this.isSeries) {
        return this.claimedBy.length >= this.maxUses;
    }
    return this.status === "used";
});

export default mongoose.models.RedeemCode || mongoose.model("RedeemCode", RedeemCodeSchema);
