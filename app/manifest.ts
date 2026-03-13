import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Bluebuff | Buy MLBB Diamonds Instantly in India",
        short_name: "Bluebuff",
        description: "Instant MLBB diamond top-up in India. Secure payments, fast delivery, and best prices at Bluebuff.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
            {
                src: "/logoBB.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
