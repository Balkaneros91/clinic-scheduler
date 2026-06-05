import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Clinic Scheduler",
    template: "%s | Clinic Scheduler",
  },
  description:
    "Clinic Scheduler is a staff scheduling system for managing employees, absences, departments and automated schedule assignments.",
  applicationName: "Clinic Scheduler",
  keywords: [
    "clinic scheduler",
    "staff scheduling",
    "employee scheduling",
    "next.js",
    "prisma",
    "typescript",
  ],
  authors: [
    {
      name: "Antonio-Claudio Andelic",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", inter.variable)}>
      <body className="min-h-full bg-slate-50 text-slate-900 flex flex-col">
        {children}
      </body>
    </html>
  );
}
