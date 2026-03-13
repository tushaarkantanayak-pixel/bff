import { Metadata } from "next";
import JsonLd from "@/components/Seo/JsonLd";

interface Props {
    params: { slug: string };
    children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;

    try {
        const response = await fetch(`https://game-off-ten.vercel.app/api/v1/game/${slug}`, {
            headers: { "x-api-key": process.env.API_SECRET_KEY || "" },
            next: { revalidate: 3600 }
        });

        const data = await response.json();
        const game = data?.data;

        if (!game) {
            return {
                title: "Game Topup | Bluebuff",
                description: "Buy game items and top-ups instantly."
            };
        }

        const title = `${game.gameName} Topup India | Buy ${game.gameName} Diamonds Instantly`;
        const description = `Get ${game.gameName} diamonds and top-ups instantly in India. Secure payment, fast delivery, and the best prices for ${game.gameName} at Bluebuff.`;

        return {
            title,
            description,
            keywords: [
                `${game.gameName} topup`,
                `${game.gameName} topup india`,
                `${game.gameName} diamond recharge`,
                `buy ${game.gameName} diamonds`,
                "bluebuff topup",
                "cheap game topup india",
            ],
            openGraph: {
                title,
                description,
                url: `https://bluebuff.in/games/${slug}`,
                siteName: "Bluebuff",
                images: [
                    {
                        url: game.gameImageId?.image || "/logoBB.png",
                        width: 800,
                        height: 800,
                        alt: game.gameName,
                    },
                ],
                locale: "en_IN",
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [game.gameImageId?.image || "/logoBB.png"],
            },
            alternates: {
                canonical: `https://bluebuff.in/games/${slug}`,
            },
        };
    } catch (error) {
        console.error("Metadata generation error:", error);
        return {
            title: "Game Topup India | Bluebuff",
            description: "Buy game items and top-ups instantly at Bluebuff."
        };
    }
}

export default async function GameLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let productSchema = null;

    try {
        const response = await fetch(`https://game-off-ten.vercel.app/api/v1/game/${slug}`, {
            headers: { "x-api-key": process.env.API_SECRET_KEY || "" },
            next: { revalidate: 3600 }
        });
        const data = await response.json();
        const game = data?.data;

        if (game) {
            productSchema = {
                "@context": "https://schema.org",
                "@type": "Product",
                "name": game.gameName,
                "image": game.gameImageId?.image || "https://bluebuff.in/logoBB.png",
                "description": `Get ${game.gameName} diamonds and top-ups instantly in India. Secure payment, fast delivery, and the best prices for ${game.gameName} at Bluebuff.`,
                "brand": {
                    "@type": "Brand",
                    "name": "Bluebuff"
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "url": `https://bluebuff.in/games/${slug}`,
                    "priceCurrency": "INR",
                    "lowPrice": game.itemId?.length > 0 ? Math.min(...game.itemId.map((i: any) => i.sellingPrice)) : "0",
                    "highPrice": game.itemId?.length > 0 ? Math.max(...game.itemId.map((i: any) => i.sellingPrice)) : "0",
                    "offerCount": game.itemId?.length || "0",
                    "availability": "https://schema.org/InStock"
                }
            };
        }
    } catch (e) {
        console.error("Error fetching for product schema:", e);
    }

    return (
        <>
            {productSchema && <JsonLd data={productSchema} />}
            {children}
        </>
    );
}
