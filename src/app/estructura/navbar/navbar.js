"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import style from "./navbar.module.css";

const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <div className={style.menuContainer}>
      <Link href="/" className={style.logo}>
        PlantillaTienda
      </Link>
      <div className={style.menu}>
        <Link href="/" className={style.menuItem}>
          Home
        </Link>
        <Link href="/tienda" className={style.menuItem}>
          Tienda
        </Link>
        <Link href="/carrito" className={style.menuItem}>
          Carrito{" "}
          {totalItems > 0 && <span className={style.badge}>{totalItems}</span>}
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
