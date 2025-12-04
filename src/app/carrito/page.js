"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import style from "./carrito.module.css";

export default function CarritoPage() {
  const { carrito, actualizarCantidad, eliminarProducto, totalPrecio } =
    useCart();
  const router = useRouter();

  if (carrito.length === 0) {
    return (
      <div className={style.container}>
        <h1>Carrito de Compras</h1>
        <p className={style.vacio}>Tu carrito está vacío.</p>
        <button
          onClick={() => router.push("/tienda")}
          className={style.btnContinuar}
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1>Carrito de Compras</h1>
      <div className={style.items}>
        {carrito.map((item) => (
          <div key={item.id} className={style.item}>
            <div className={style.itemImg}>
              {item.images && item.images[0] ? (
                <Image
                  src={item.images[0]}
                  width={80}
                  height={80}
                  alt={item.title}
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div className={style.placeholderImg}>Sin imagen</div>
              )}
            </div>
            <div className={style.itemInfo}>
              <h3>{item.title}</h3>
              <p className={style.precio}>${item.price}</p>
            </div>
            <div className={style.itemCantidad}>
              <label>Cantidad:</label>
              <input
                type="number"
                min="1"
                value={item.cantidad}
                onChange={(e) =>
                  actualizarCantidad(item.id, parseInt(e.target.value) || 1)
                }
                className={style.cantidadInput}
              />
            </div>
            <div className={style.itemSubtotal}>
              <p>${(item.price * item.cantidad).toFixed(2)}</p>
            </div>
            <button
              onClick={() => eliminarProducto(item.id)}
              className={style.btnEliminar}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className={style.resumen}>
        <h2>Total: ${totalPrecio.toFixed(2)}</h2>
        <button
          onClick={() => router.push("/checkout")}
          className={style.btnCheckout}
        >
          Proceder al Checkout
        </button>
      </div>
    </div>
  );
}
