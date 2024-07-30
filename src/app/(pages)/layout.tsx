"use client";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import Header from "./_header/page";
import { Suspense } from "react";
import Loader from "@/components/uicomponents/spinner";
import { useState, useEffect } from "react";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Plura",
  description: "Created by Plura",
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader display={"grid"} />}>
        <div className="bg-white">{children}</div>
      </Suspense>
    </div>
  );
}
export default HomeLayout;
