import { Josefin_Sans, Poiret_One } from "next/font/google";
import { signature } from "@/components/fonts";
import "./v6.css";

const deco = Poiret_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v6-deco",
  display: "swap",
});
const text = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-v6-text",
  display: "swap",
});

export default function V6Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`v6 ${deco.variable} ${text.variable} ${signature.variable}`}
    >
      {children}
    </div>
  );
}
