"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import style from "./admin.module.css";

export default function AdminLayout({ children }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className={style.loading}>Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className={style.container}>
      <aside className={style.sidebar}>
        <div className={style.logo}>Admin Panel</div>
        <nav className={style.menu}>
          <a href="/admin" className={style.menuItem}>
            📊 Dashboard
          </a>
          <a href="/admin/productos" className={style.menuItem}>
            📦 Productos
          </a>
          <a href="/admin/pedidos" className={style.menuItem}>
            📋 Pedidos
          </a>
          <a href="/admin/categorias" className={style.menuItem}>
            🏷️ Categorías
          </a>
          <a href="/admin/descuentos" className={style.menuItem}>
            💰 Descuentos
          </a>
        </nav>
        <button onClick={handleLogout} className={style.logoutBtn}>
          Logout
        </button>
      </aside>
      <main className={style.content}>{children}</main>
    </div>
  );
}
