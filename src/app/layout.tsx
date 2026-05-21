import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chat to Code - AI Code Generator",
  description: "Generate code from natural language using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
