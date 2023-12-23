import { Roboto } from "next/font/google";

import "./globals.css";
import { Toaster } from "/components/ui/toaster";

const inter = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata = {
  title: "WidgetCraft Studio - Unleash creativity effortlessly",
  description:
    "WidgetCraft Studio transforms your projects into interactive masterpieces with streamlined creation, customization, and deployment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
