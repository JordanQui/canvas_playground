"use client";

import { useEffect } from "react";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
     src: "./fonts/GeistVF.woff",
     variable: "--font-geist-sans",
     weight: "100 900",
});
const geistMono = localFont({
     src: "./fonts/GeistMonoVF.woff",
     variable: "--font-geist-mono",
     weight: "100 900",
});


export default function RootLayout({ children }) {
     useEffect(() => {
          document.body.classList.add("loaded");
     }, []);

     return (
          <html lang="en">
               <head>
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta
                         name="apple-mobile-web-app-status-bar-style"
                         content="black-translucent"
                    />
               </head>
               <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
               >
                    {children}
               </body>
          </html>
     );
}
