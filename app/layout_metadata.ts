
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        default: "Bluebuff | Buy MLBB Diamonds Instantly",
        template: "%s | Bluebuff",
    },
    description:
        "Bluebuff – Buy Mobile Legends diamonds instantly with fast delivery, secure payments, and best prices. India's trusted gaming top-up platform.",
    keywords: [
        "mlbb topup",
        "mlbb topup india",
        "mlbb diamond topup",
        "mlbb diamond recharge",
        "buy mlbb diamonds",
        "mobile legends topup",
        "mlbb diamonds india",
        "bluebuff",
        "bluebuff topup",
    ],
    metadataBase: new URL("https://bluebuff.in"),
    openGraph: {
        title: "Bluebuff | Buy MLBB Diamonds Instantly",
        description:
            "Instant MLBB diamond top-up in India. Secure payments, fast delivery, and best prices at Bluebuff.",
        url: "https://bluebuff.in",
        siteName: "Bluebuff",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};
