// app/page.tsx
import HomeSection from "@/components/Home/Home";
import WhatsAppQRPopup from "@/components/WhatsAppQRPopup";

export const metadata = {
  title: "Bluebuff - Buy MLBB Diamonds Instantly in India | Best Game Topup Platform",
  description:
    "Bluebuff is India's most trusted gaming top-up platform. Buy Mobile Legends (MLBB) diamonds, BGMI UC, and other game credits instantly with fast delivery, secure payments, and the best prices.",
  keywords: [
    "mlbb topup",
    "mlbb topup india",
    "mlbb diamond topup",
    "buy mlbb diamonds",
    "mlbb diamond recharge",
    "mobile legends topup",
    "mlbb diamonds india",
    "cheap mlbb diamonds",
    "bgmi uc topup",
    "buy bgmi uc india",
    "game topup india",
    "bluebuff",
    "bluebuff topup",
    "bluebuff in",
  ],
  alternates: {
    canonical: "https://bluebuff.in/",
  },
  openGraph: {
    title: "Bluebuff - Buy MLBB Diamonds & Game Topups in India",
    description: "Instant gaming top-ups for MLBB, BGMI, and more in India. Secure payments, instant delivery at Bluebuff.",
    url: "https://bluebuff.in",
    siteName: "Bluebuff",
    images: [
      {
        url: "/logoBB.png",
        width: 1200,
        height: 630,
        alt: "Bluebuff - Gaming Topup India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluebuff - Buy MLBB Diamonds Instantly in India",
    description: "Instant gaming top-ups for MLBB, BGMI, and more in India. Secure payments, instant delivery at Bluebuff.",
    images: ["/logoBB.png"],
  },
};

export default function Page() {
  return (
    <main>
      <WhatsAppQRPopup />

      <HomeSection />
    </main>
  );
}
