import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { EventFilterProvider } from "./components/contexts/event-filters/event-filter.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendar",
  description: "Calendar for scheduling events and classes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EventFilterProvider>
            <Header></Header>
            {children}
          </EventFilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
