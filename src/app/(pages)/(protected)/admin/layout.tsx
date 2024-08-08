"use client";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import { isAdmin } from "@/components/utils/auth";
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
  return <div>{children}</div>;
}
export default isAdmin(HomeLayout);
