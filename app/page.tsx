// app/page.tsx
import HomeSection from "@/components/Home/Home";
import WhatsAppQRPopup from "@/components/WhatsAppQRPopup";

export const metadata = {
  title: "MLBB Topup India | Buy MLBB Diamonds Instantly at Best Price",
  description:
    "MLBB Topup India – Buy Mobile Legends diamonds instantly with fast delivery, secure payments, and best prices. Trusted MLBB diamond top-up platform in India.",
  keywords: [
    "mlbb topup",
    "mlbb topup india",
    "mlbb diamond topup",
    "buy mlbb diamonds",
    "mlbb diamond recharge",
    "mobile legends topup",
    "mlbb diamonds india",
    "cheap mlbb diamonds",
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
