import type { Metadata } from "next";
import { IBM_Plex_Sans, Bebas_Neue } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description:
    "BookWise is a book borrowing university library management solution.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
