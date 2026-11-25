import { Italiana, Jost } from "next/font/google";
import "./v7.css";

const display = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v7-display",
  display: "swap",
});
const text = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-v7-text",
  display: "swap",
});

export default function V7Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v7 ${display.variable} ${text.variable}`}>{children}</div>
  );
}
