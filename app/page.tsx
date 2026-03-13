// app/page.tsx
import HomeSection from "@/components/Home/Home";
import WhatsAppQRPopup from "@/components/WhatsAppQRPopup";

export const metadata = {
  title: "Bluebuff | Buy MLBB Diamonds Instantly at Best Price in India",
  description:
    "Bluebuff – Buy Mobile Legends diamonds instantly with fast delivery, secure payments, and best prices. India's most trusted MLBB diamond top-up platform.",
  keywords: [
    "mlbb topup",
    "mlbb topup india",
    "mlbb diamond topup",
    "buy mlbb diamonds",
    "mlbb diamond recharge",
    "mobile legends topup",
    "mlbb diamonds india",
    "cheap mlbb diamonds",
    "bluebuff",
    "bluebuff topup",
  ],
};

export default function Page() {
  return (
    <main>
      <WhatsAppQRPopup />

      <HomeSection />
    </main>
  );
}
