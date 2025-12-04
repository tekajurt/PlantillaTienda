"use client";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import style from "./dashboard.module.css";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lowStockProducts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const supabase = getSupabase();

      // Contar productos
      const { count: productCount } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      // Contar pedidos (si la tabla existe)
      const { count: orderCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .catch(() => ({ count: 0 }));

      // Productos con stock bajo
      const { data: lowStockData } = await supabase
        .from("products")
        .select("*")
        .lt("stock", 5);

      setStats({
        totalProducts: productCount || 0,
        totalOrders: orderCount || 0,
        lowStockProducts: lowStockData?.length || 0,
        totalRevenue: 0, // Se calculará cuando haya pedidos con precio
      });
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando dashboard...</p>;

  return (
    <div className={style.dashboard}>
      <h1>Dashboard</h1>
      <div className={style.statsGrid}>
        <div className={style.stat}>
          <h3>Total Productos</h3>
          <p className={style.statValue}>{stats.totalProducts}</p>
        </div>
        <div className={style.stat}>
          <h3>Pedidos</h3>
          <p className={style.statValue}>{stats.totalOrders}</p>
        </div>
        <div className={`${style.stat} ${style.alert}`}>
          <h3>Stock Bajo</h3>
          <p className={style.statValue}>{stats.lowStockProducts}</p>
        </div>
        <div className={style.stat}>
          <h3>Ingresos</h3>
          <p className={style.statValue}>${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
      <div className={style.section}>
        <h2>Próximos Pasos</h2>
        <ul>
          <li>✓ Dashboard implementado</li>
          <li>⏳ Gestión de productos</li>
          <li>⏳ Gestión de pedidos</li>
          <li>⏳ Descuentos y ofertas</li>
        </ul>
      </div>
    </div>
  );
}
