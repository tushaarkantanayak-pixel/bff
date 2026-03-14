export const metadata = {
    title: "Bluebuff Blog | MLBB Guides, Pricing & Safety Tips",
    description: "Read the latest guides, pricing updates, and safety tips for Mobile Legends (MLBB) and other game top-ups in India.",
    keywords: [
        "mlbb blog",
        "mlbb guides",
        "buy mlbb diamonds safely",
        "mlbb diamond prices",
        "game topup guides",
        "mobile legends articles",
        "bluebuff blog"
    ],
    alternates: {
        canonical: "https://bluebuff.in/blog",
    },
    openGraph: {
        title: "Bluebuff Blog | MLBB Guides, Pricing & Safety Tips",
        description: "Read the latest guides, pricing updates, and safety tips for Mobile Legends (MLBB) and other game top-ups in India.",
        url: "https://bluebuff.in/blog",
        siteName: "Bluebuff",
        images: [
            {
                url: "/logoBB.png",
                width: 1200,
                height: 630,
                alt: "Bluebuff Blog",
            },
        ],
        locale: "en_IN",
        type: "website",
    },
};

export default function BlogLayout({ children }) {
    return <>{children}</>;
}
