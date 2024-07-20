import Image from "next/image";
import style from "./tienda.module.css";
const getProductos = async (id) => {
  const res = await fetch(process.env.DATA_URI + "/" + id);
  if (!res.ok) {
    throw new Error(
      "Falló la obtención de datos del servidor, status: " + res.status
    );
  }
  const data = await res.json();
  return data;
};

const Tienda = async () => {
  const data = await getProductos();
  const productos = data.productos;
  if (!productos) {
    <p>No hay datos</p>;
  }
  return (
    <div className={style.tiendaContent}>
      x
      <div className={style.productos}>
        {productos.map((producto) => (
          <div key={producto._id} className={style.producto}>
            <div className={style.imgProducto}>
              <Image
                src={"/" + producto._id + ".jpg"}
                width="200"
                height="200"
                alt={producto.description}
                priority
              />
            </div>
            <div className={style.bodyProducto}>
              <h3>{producto.name}</h3>
              <p>{producto.description}</p>
              <h2>{producto.price}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tienda;
