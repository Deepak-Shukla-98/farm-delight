"use client";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { SharedContextProvider } from "@/components/context/sharedContext";
import Loader from "@/components/uicomponents/spinner";
import { NextUIProvider } from "@nextui-org/react";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/utils/themeProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Plura",
  description: "Created by Plura",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Loader />
        <NextUIProvider>
          <TooltipProvider>
            <SharedContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Suspense fallback={<Loader display={"grid"} />}>
                  {children}
                  <Toaster position="top-right" />
                </Suspense>
              </ThemeProvider>
            </SharedContextProvider>
          </TooltipProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
export default RootLayout;
