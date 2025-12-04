"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./tienda.module.css";

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, [search, category]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("q", search);
      if (category) params.append("category", category);
      params.append("limit", "20");
      const res = await fetch(`/datos?${params.toString()}`);
      if (!res.ok) throw new Error("Error al cargar productos");
      const json = await res.json();
      setProductos(json.data || []);
      // Extraer categorías únicas
      const cats = [
        ...new Set((json.data || []).map((p) => p.category).filter(Boolean)),
      ];
      setCategories(cats);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.tiendaContent}>
      <div className={style.filters}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={style.searchInput}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={style.categorySelect}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Cargando productos...</p>}
      {error && <p className={style.error}>Error: {error}</p>}
      {!loading && productos.length === 0 && (
        <p>No se encontraron productos.</p>
      )}
      <div className={style.productos}>
        {productos.map((producto) => (
          <Link
            key={producto.id}
            href={`/tienda/${producto.id}`}
            className={style.producto}
          >
            <div className={style.imgProducto}>
              {producto.images && producto.images[0] ? (
                <Image
                  src={producto.images[0]}
                  width={200}
                  height={200}
                  alt={producto.title}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={style.placeholderImg}>Sin imagen</div>
              )}
            </div>
            <div className={style.bodyProducto}>
              <h3>{producto.title}</h3>
              <p className={style.price}>${producto.price}</p>
              {producto.stock <= 0 && (
                <span className={style.outOfStock}>Sin stock</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Tienda;
