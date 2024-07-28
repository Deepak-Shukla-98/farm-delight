"use client";
import { Inter as FontSans } from "next/font/google";
import { Metadata } from "next";
import isAuth from "@/components/utils/auth";
import Header from "./_header/page";
import { Suspense } from "react";
import Loader from "@/components/uicomponents/spinner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const metadata: Metadata = {
  title: "Plura",
  description: "Created by Plura",
};

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loader display={"grid"} />}>
        <div>{children}</div>
      </Suspense>
    </div>
  );
}
export default isAuth(HomeLayout);
