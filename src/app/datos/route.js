import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";
/* 
Conectando a la db, devuelve sino Error
*/
const DBConnect = async (dbName) => {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    return db;
  } catch (error) {
    throw new Error("Error al conectar con la DB");
  }
};
/* 
Solo get por ahora
el resto lanza un error de BAD METHOD o algo por el estilo
*/
export async function GET() {
  /*
Función GET, conecta al db, obtiene todos los documentos en una colección
y los transforma en arreglo
*/
  try {
    const db = await DBConnect("tienda_test");
    const products = await db.collection("productos").find({}).toArray();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse.json({ error: error.message, status: 500 });
  }
}
