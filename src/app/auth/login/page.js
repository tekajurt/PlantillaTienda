"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import style from "./auth.module.css";

export default function LoginPage() {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      router.push("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.card}>
        <h1>{isSignup ? "Crear Cuenta Admin" : "Login Admin"}</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.campo}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={style.campo}>
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={style.error}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : isSignup ? "Crear Cuenta" : "Entrar"}
          </button>
        </form>
        <p className={style.toggle}>
          {isSignup ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className={style.toggleBtn}
          >
            {isSignup ? "Login" : "Registro"}
          </button>
        </p>
      </div>
    </div>
  );
}
