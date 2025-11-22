import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/header/Navbar";
import QueryProvider from "./providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Blog",
  description: "A beautiful blog built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <QueryProvider>
              <main className="container mx-auto max-w-6xl px-4 py-8">
                {children}
              </main>
            </QueryProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
