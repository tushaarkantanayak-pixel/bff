
/**
 * Mewji API v1 Fulfillment Library
 * Handles BGMI top-up orders automatically via the Mewji platform.
 */
export async function placeMewjiOrder({ playerId, itemSlug, orderId }) {
    const API_KEY = process.env.MEWJI_API_KEY;
    const BASE_URL = process.env.MEWJI_API_URL || "https://mewji.com/api/v1";
    const MEWJI_API_URL = `${BASE_URL}/order/create`;

    // ✅ Normalization: Mewji uses bgmi-60, while we use bgmi-60-uc
    const mappedSlug = itemSlug.endsWith("-uc") ? itemSlug.slice(0, -3) : itemSlug;

    try {
        const response = await fetch(MEWJI_API_URL, {

            method: "POST",
            headers: {
                "X-API-KEY": API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                gameSlug: "bgmi-manual",
                itemSlug: mappedSlug,
                playerId: String(playerId),
                phone: null, // Optional
            }),
        });

        const data = await response.json();
        
        return {
            success: response.ok && data.success === true,
            data
        };
    } catch (error) {
        console.error("[mewji-api] Order transmission failed:", error.message);
        return {
            success: false,
            data: { message: "Network Error: Could not connect to Mewji API" }
        };
    }
}
