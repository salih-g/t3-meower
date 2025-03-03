import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Meower",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ClerkProvider>
          <Toaster position="bottom-right" />
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
