import Link from "next/link";
import style from "./Home.module.css";

const Home = () => {
  return (
    <div className={style.contenido}>
      <div className={style.hero}>
        <h1>Bienvenido a PlantillaTienda</h1>
        <p>Tu tienda online de productos tecnológicos</p>
        <Link href="/tienda" className={style.cta}>
          Explorar Productos
        </Link>
      </div>
    </div>
  );
};
export default Home;
