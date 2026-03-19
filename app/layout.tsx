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
    default: "Bluebuff | Buy MLBB Diamonds Instantly in India",
    template: "%s | Bluebuff",
  },
  description:
    "Bluebuff is India's most trusted gaming top-up platform. Buy Mobile Legends (MLBB) diamonds, BGMI UCs, and other game credits instantly with fast delivery, secure payments, and best prices.",
  keywords: [
    "game topup",
    "game recharge india",
    "mlbb topup",
    "mlbb topup india",
    "mlbb diamond topup",
    "mlbb diamond recharge",
    "buy mlbb diamonds",
    "mobile legends topup",
    "mlbb diamonds india",
    "bgmi uc topup",
    "cheap topup website",
    "bluebuff",
    "bluebuff india",
    "bluebuff mlbb",
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
