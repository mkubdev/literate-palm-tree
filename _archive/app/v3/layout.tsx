import { Bricolage_Grotesque, Knewave } from "next/font/google";
import "./v3.css";

const mast = Knewave({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v3-mast",
  display: "swap",
});
const text = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-v3-text",
  display: "swap",
});

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`v3 ${mast.variable} ${text.variable}`}>{children}</div>
  );
}
