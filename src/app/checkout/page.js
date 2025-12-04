"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import style from "./checkout.module.css";

export default function CheckoutPage() {
  const { carrito, totalPrecio, vaciarCarrito } = useCart();
  const router = useRouter();
  const [confirmado, setConfirmado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
  });
  const [errores, setErrores] = useState({});

  if (carrito.length === 0 && !confirmado) {
    return (
      <div className={style.container}>
        <p className={style.vacio}>No hay productos en el carrito.</p>
        <button
          onClick={() => router.push("/tienda")}
          className={style.btnVolver}
        >
          Ir a la tienda
        </button>
      </div>
    );
  }

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.nombre.trim()) nuevosErrores.nombre = "Nombre requerido";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      nuevosErrores.email = "Email válido requerido";
    if (!formData.telefono.trim())
      nuevosErrores.telefono = "Teléfono requerido";
    if (!formData.direccion.trim())
      nuevosErrores.direccion = "Dirección requerida";
    if (!formData.ciudad.trim()) nuevosErrores.ciudad = "Ciudad requerida";
    if (!formData.codigoPostal.trim())
      nuevosErrores.codigoPostal = "Código postal requerido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    // Aquí iría la lógica de envío (email, webhook, etc.)
    setConfirmado(true);
    vaciarCarrito();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (confirmado) {
    return (
      <div className={style.container}>
        <div className={style.confirmacion}>
          <h1>¡Pedido Confirmado!</h1>
          <p>Gracias por tu compra, {formData.nombre}.</p>
          <p>
            Recibirás un email de confirmación en{" "}
            <strong>{formData.email}</strong>.
          </p>
          <div className={style.resumenFinal}>
            <h3>Resumen del pedido:</h3>
            <p>
              Total: <strong>${totalPrecio.toFixed(2)}</strong>
            </p>
            <p>
              Dirección de envío: {formData.direccion}, {formData.ciudad},{" "}
              {formData.codigoPostal}
            </p>
          </div>
          <button onClick={() => router.push("/")} className={style.btnVolver}>
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h1>Checkout</h1>
      <div className={style.contenido}>
        <div className={style.formulario}>
          <h2>Datos de envío</h2>
          <form onSubmit={handleSubmit}>
            <div className={style.campo}>
              <label>Nombre completo *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errores.nombre ? style.inputError : ""}
              />
              {errores.nombre && (
                <span className={style.error}>{errores.nombre}</span>
              )}
            </div>
            <div className={style.campo}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errores.email ? style.inputError : ""}
              />
              {errores.email && (
                <span className={style.error}>{errores.email}</span>
              )}
            </div>
            <div className={style.campo}>
              <label>Teléfono *</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errores.telefono ? style.inputError : ""}
              />
              {errores.telefono && (
                <span className={style.error}>{errores.telefono}</span>
              )}
            </div>
            <div className={style.campo}>
              <label>Dirección *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className={errores.direccion ? style.inputError : ""}
              />
              {errores.direccion && (
                <span className={style.error}>{errores.direccion}</span>
              )}
            </div>
            <div className={style.campo}>
              <label>Ciudad *</label>
              <input
                type="text"
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                className={errores.ciudad ? style.inputError : ""}
              />
              {errores.ciudad && (
                <span className={style.error}>{errores.ciudad}</span>
              )}
            </div>
            <div className={style.campo}>
              <label>Código Postal *</label>
              <input
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleChange}
                className={errores.codigoPostal ? style.inputError : ""}
              />
              {errores.codigoPostal && (
                <span className={style.error}>{errores.codigoPostal}</span>
              )}
            </div>
            <button type="submit" className={style.btnConfirmar}>
              Confirmar Pedido
            </button>
          </form>
        </div>
        <div className={style.resumen}>
          <h2>Resumen</h2>
          <div className={style.items}>
            {carrito.map((item) => (
              <div key={item.id} className={style.itemResumen}>
                <span>
                  {item.title} x {item.cantidad}
                </span>
                <span>${(item.price * item.cantidad).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={style.total}>
            <strong>Total:</strong>
            <strong>${totalPrecio.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
