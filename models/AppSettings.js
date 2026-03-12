import mongoose from "mongoose";

const AppSettingsSchema = new mongoose.Schema(
    {
        maintenanceMode: {
            type: Boolean,
            default: false,
        },
        mlbbWeeklyProvider: {
            type: String,
            enum: ["1game", "smileone"],
            default: "1game",
        },
        // We can add more settings here in the future
    },
    { timestamps: true }
);

// We only want one settings document
if (mongoose.models.AppSettings) {
    delete mongoose.models.AppSettings;
}

export default mongoose.model("AppSettings", AppSettingsSchema);
