import type { Metadata } from "next";
import Script from "next/script";

export const dynamic = "auto";
export const revalidate = 300; // Enable ISR for the whole site (5 minutes)

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SocialFloat from "@/components/SocialFloat/SocialFloat";
import { GoogleAnalytics } from '@next/third-parties/google';
import ChristmasPopup from "@/components/Seasonal/ChristmasPopup";
import { Poppins } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import ChatBot from "@/components/SocialFloat/Chatbot"; // Removed as we use wrapper
import ChatbotWrapper from "@/components/Layout/ChatbotWrapper";
import ValentinePopup from "@/components/Seasonal/ValentinePopup";
import ValentineEffect from "@/components/Seasonal/ValentineEffect";
import Maintaince from "@/components/Seasonal/Maintaince";
import MaintenanceWrapper from "@/components/Layout/MaintenanceWrapper";
import { FEATURE_FLAGS } from "@/lib/featureFlags";
import { getAppSettings } from "@/lib/settings";
import BottomNav from "@/components/Layout/BottomNav";
import JsonLd from "@/components/Seo/JsonLd";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bluebuff",
  "url": "https://bluebuff.in",
  "logo": "https://bluebuff.in/logoBB.png",
  "sameAs": [
    "https://facebook.com/bluebuff", // Replace with real links if available
    "https://instagram.com/bluebuff.in",
    "https://twitter.com/bluebuff_in"
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Bluebuff",
  "url": "https://bluebuff.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://bluebuff.in/games?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  title: {
    default: "Bluebuff | Cheapest MLBB Diamonds & Game Topup In India",
    template: "%s | Bluebuff",
  },
  description:
    "Top up MLBB diamonds, BGMI UC, and gaming credits with instant delivery via UID. Bluebuff offers India's most secure and affordable top-up service for Honor of Kings, Genshin Impact, and more.",
  keywords: [
    "mlbb recharge india cheap",
    "mlbb top up india instant",
    "buy ml diamonds india low price",
    "mlbb recharge with upi",
    "cheapest mlbb recharge website",
    "mlbb recharge trusted site india",
    "mlbb diamonds instant delivery india",
    "mobile legends recharge india fast",
    "mlbb top up india no login",
    "mlbb recharge website india cheap",
    "mlbb topup",
    "mlbb diamond topup",
    "mlbb diamond recharge",
    "buy mlbb diamonds",
    "mobile legends topup",
    "mlbb diamonds india",
    "mlbb recharge under 50 rs",
    "mlbb recharge under 80 rs india",
    "mlbb recharge under 100 rs india",
    "cheap mlbb diamonds 2024 india",
    "lowest price mlbb diamonds india",
    "mlbb diamond price list india",
    "mlbb recharge best price india",
    "mlbb diamond rate india today",
    "mlbb topup discount india",
    "mlbb recharge offer india today",
    "buy 86 diamonds mlbb india",
    "buy 172 diamonds mlbb india",
    "mlbb weekly pass recharge india",
    "mlbb twilight pass recharge india",
    "mlbb small diamond pack india",
    "mlbb mini pack recharge instant",
    "mlbb weekly pass cheapest india",
    "mlbb diamond bundle recharge india",
    "mlbb subscription recharge india",
    "mlbb starlight recharge india",
    "mlbb recharge by id server india",
    "mlbb topup uid only india",
    "instant mlbb recharge without login",
    "mlbb auto topup website india",
    "mlbb instant diamonds delivery",
    "fastest mlbb recharge india",
    "mlbb recharge in seconds india",
    "mlbb topup instant payment india",
    "mlbb recharge direct account india",
    "legit mlbb recharge india",
    "trusted mlbb diamond seller india",
    "safe mlbb topup site india",
    "real mlbb recharge website india",
    "genuine mlbb diamond store india",
    "secure mlbb recharge with upi",
    "best site to buy mlbb diamonds india",
    "how to buy mlbb diamonds with upi",
    "mlbb recharge guide india",
    "mlbb diamond recharge steps",
    "mobile legends payment methods india",
    "how instant mlbb topup works",
    "mlbb weekly pass worth it india",
    "mlbb cheapest recharge method india",
    "mlbb topup without moonton login",
    "mlbb recharge india paytm",
    "mlbb top up india phonepe",
    "mlbb diamonds google pay india",
    "bluebuff",
    "bluebuff topup",
    "bluebuff mlbb diamonds",
    "game topup india",
    "bgmi uc topup",
    "buy bgmi uc india",
    "hok topup india",
    "honor of kings topup tokens",
    "genshin impact topup india",
    "buy genesis crystals india cheap",
    "magic chess topup bang bang",
    "where winds meet game recharge",
    "wuthering waves topup india",
    "wuthering waves recharge cheap",
    "buy lunites wuthering waves"
  ],
  metadataBase: new URL("https://bluebuff.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bluebuff | Buy MLBB Diamonds Instantly in India",
    description:
      "Instant MLBB diamond top-up in India. Secure payments, fast delivery, and best prices at Bluebuff.",
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
    title: "Bluebuff | Buy MLBB Diamonds Instantly in India",
    description: "Instant MLBB diamond top-up in India. Secure payments, fast delivery, and best prices at Bluebuff.",
    images: ["/logoBB.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logoBB.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "QWK_nNCNa9UOVWVpaOf5Ux5GkTuUKhRZndHGDNfMoj8",
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getAppSettings();

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://cdn.onesignal.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>


      <body className="bg-black text-white">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Header />

          {/* <div className="snow" />
  <span className="big-snow"></span>
  <span className="big-snow"></span>
  <span className="big-snow"></span>  */}
          {/* <div className="hearts" />

          {/* <ChristmasPopup />  */}
          {/* <ValentineEffect />

           */}
          {/* <ValentineEffect /> */}
          {/* <ValentinePopup /> */}
          <MaintenanceWrapper maintenanceMode={settings.maintenanceMode} />
          <main className="pt-16 pb-24 md:pb-0">{children}</main>




          <Footer />
          <SocialFloat />
          <ChatbotWrapper />
          <BottomNav />



        </GoogleOAuthProvider>


        {/* OneSignal SDK */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />

        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "b7844eac-b557-40e4-ad01-11546347a279",
                safari_web_id: "web.onesignal.auto.5ccade99-0f35-4775-9ae0-5e2c3bfd110b",
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                  enable: false, // Turned off the persistent bell icon
                },
              });

              // Automatically show the slidedown prompt if not subscribed
              if (!OneSignal.Notifications.permission) {
                 OneSignal.Slidedown.promptPush();
              }
            });
          `}
        </Script>

      </body>
      <GoogleAnalytics gaId="G-CKCKWLGJ9N" />
      {/* <script src="https://quge5.com/88/tag.min.js" data-zone="191906" async data-cfasync="false"></script> */}
    </html>
  );
}
