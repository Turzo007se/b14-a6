import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanContext";

export const metadata = {
  title: "FitLog - Train With Intent",
  description: "A dark, no-nonsense gym companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-[#09090b] text-white min-h-screen flex flex-col antialiased">
        <PlanProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer></Footer>
        </PlanProvider>
      </body>
    </html>
  );
}
