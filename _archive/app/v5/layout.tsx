import { Bodoni_Moda, Jost } from "next/font/google";
import { signature } from "@/components/fonts";
import "./v5.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-v5-display",
  display: "swap",
});
const text = Jost({
  subsets: ["latin"],
  variable: "--font-v5-text",
  display: "swap",
});

export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`v5 ${display.variable} ${text.variable} ${signature.variable}`}
    >
      {children}
    </div>
  );
}
