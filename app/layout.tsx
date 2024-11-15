import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});
export const metadata: Metadata = {
  title: "Finance AI",
  description: "Dashboard Financeira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} antialiased dark`}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </ClerkProvider>

        <Toaster />
      </body>
    </html>
  );
}
