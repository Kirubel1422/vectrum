import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins-mono",
  subsets: ["latin"],
  weight: ["500", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vectrum AI",
  description: "Resume to Job Description Matcher AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${poppins.className}  antialiased min-h-screen`}
      >
        <ThemeProvider
          defaultTheme="dark"
          enableSystem={true}
          attribute={"class"}
          disableTransitionOnChange={true}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
