import style from "./footer.module.css";

const Footer = () => {
  return (
    <div className={style.footerContainer}>
      <p>
        &copy; {new Date().getFullYear()} PlantillaTienda. Todos los derechos
        reservados.
      </p>
      <p className={style.info}>
        MVP sin plataforma de pago • Supabase + Next.js
      </p>
    </div>
  );
};
export default Footer;
