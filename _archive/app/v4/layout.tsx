import { Libre_Caslon_Text, Marcellus } from "next/font/google";
import { signature } from "@/components/fonts";
import "./v4.css";

const caps = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v4-caps",
  display: "swap",
});
const text = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-v4-text",
  display: "swap",
});

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`v4 ${caps.variable} ${text.variable} ${signature.variable}`}
    >
      {children}
    </div>
  );
}
