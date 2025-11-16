import type { Metadata } from "next";

import { Inter } from 'next/font/google'
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next.js Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"  className={inter.className}>
     <body className="" cz-shortcut-listen="true">
      <AuthProvider>
         <ToastContainer/>
        <div className=" max-w-full   bg-white overflow-hidden ">
          {children}
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
