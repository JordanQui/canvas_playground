"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation";

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
     const pathname = usePathname();

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
                    <AnimatePresence mode="wait">
                         <motion.div
                              key={pathname}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15, ease: "easeInOut" }}
                         >
                              {children}
                         </motion.div>
                    </AnimatePresence>
               </body>
          </html>
     );
}
