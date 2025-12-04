import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./estructura/navbar/navbar";
import Footer from "./estructura/footer/footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compu Mundo Hyper Mega Red",
  description: "Plantilla para usar como ecommerce, requisitos en logseq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="estructura">
              <Navbar />
              {children}
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
