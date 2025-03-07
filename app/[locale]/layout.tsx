import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Viewport } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { useMessages } from "next-intl";
import "./global.css";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

interface LayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "My Discord Bot",
    template: "%s | My Discord Bot",
  },
  description:
    "Bienvenue sur My Discord Bot ! Un site pour vous aider à trouver le bot Discord de vos rêves.",
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }: LayoutProps) {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <html lang={locale || "fr"} className={inter.className}>
      <head>
        
      </head>

      <NextIntlClientProvider locale={locale || "fr"} messages={messages}>
        <body suppressHydrationWarning>
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <div className="container">
            <Header locale={locale || "fr"} />
            {children}
            <Footer />
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}