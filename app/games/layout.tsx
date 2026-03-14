export const metadata = {
    title: "All Games & Subscriptions | Bluebuff Game Topup India",
    description: "Browse our catalog of games, OTT subscriptions, and memberships. Get instant top-ups for MLBB, BGMI, and more at the best prices in India on Bluebuff.",
    keywords: [
        "game topup catalog",
        "buy game credits india",
        "bluebuff games",
        "mlbb topup",
        "bgmi uc topup",
        "buy ott subscription in india",
    ],
    alternates: {
        canonical: "https://bluebuff.in/games",
    },
    openGraph: {
        title: "All Games & Subscriptions | Bluebuff Game Topup India",
        description: "Browse our catalog of games, OTT subscriptions, and memberships. Get instant top-ups for MLBB, BGMI, and more at the best prices in India on Bluebuff.",
        url: "https://bluebuff.in/games",
        siteName: "Bluebuff",
        images: ["/logoBB.png"],
        locale: "en_IN",
        type: "website",
    },
};

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
