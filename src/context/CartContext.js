"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    // Cargar carrito desde localStorage al montar
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    // Escuchar actualizaciones desde otros componentes
    const handleActualizacion = () => {
      const carritoActual = localStorage.getItem("carrito");
      if (carritoActual) {
        setCarrito(JSON.parse(carritoActual));
      }
    };
    window.addEventListener("carritoActualizado", handleActualizacion);
    return () =>
      window.removeEventListener("carritoActualizado", handleActualizacion);
  }, []);

  const agregarProducto = (producto, cantidad = 1) => {
    const nuevoCarrito = [...carrito];
    const existente = nuevoCarrito.find((item) => item.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      nuevoCarrito.push({ ...producto, cantidad });
    }
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const actualizarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map((item) =>
      item.id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
    window.dispatchEvent(new Event("carritoActualizado"));
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        actualizarCantidad,
        eliminarProducto,
        vaciarCarrito,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
