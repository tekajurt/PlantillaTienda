"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import style from "./detalle.module.css";

export default function ProductoDetalle() {
  const params = useParams();
  const router = useRouter();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProducto(params.id);
    }
  }, [params.id]);

  const fetchProducto = async (id) => {
    try {
      const res = await fetch(`/datos/${id}`);
      if (!res.ok) throw new Error("Producto no encontrado");
      const json = await res.json();
      setProducto(json.producto);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const agregarAlCarrito = () => {
    if (!producto) return;
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carrito.push({ ...producto, cantidad });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    window.dispatchEvent(new Event("carritoActualizado"));
    alert("Producto agregado al carrito");
  };

  if (loading)
    return (
      <div className={style.container}>
        <p>Cargando...</p>
      </div>
    );
  if (error)
    return (
      <div className={style.container}>
        <p className={style.error}>Error: {error}</p>
      </div>
    );
  if (!producto)
    return (
      <div className={style.container}>
        <p>Producto no encontrado</p>
      </div>
    );

  const enStock = producto.stock > 0;

  return (
    <div className={style.container}>
      <button onClick={() => router.back()} className={style.backBtn}>
        ← Volver
      </button>
      <div className={style.detalle}>
        <div className={style.galeria}>
          {producto.images && producto.images.length > 0 ? (
            producto.images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                width={400}
                height={400}
                alt={producto.title}
                style={{ objectFit: "cover" }}
              />
            ))
          ) : (
            <div className={style.placeholderImg}>Sin imagen</div>
          )}
        </div>
        <div className={style.info}>
          <h1>{producto.title}</h1>
          <p className={style.categoria}>{producto.category}</p>
          <p className={style.descripcion}>{producto.description}</p>
          <p className={style.precio}>${producto.price}</p>
          <p className={style.stock}>Stock disponible: {producto.stock}</p>
          {enStock ? (
            <div className={style.compra}>
              <label>
                Cantidad:
                <input
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) =>
                    setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className={style.cantidadInput}
                />
              </label>
              <button onClick={agregarAlCarrito} className={style.btnAgregar}>
                Agregar al carrito
              </button>
            </div>
          ) : (
            <p className={style.sinStock}>Sin stock</p>
          )}
        </div>
      </div>
    </div>
  );
}
