import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
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
/* función GET
  obtiene y verifica id y devuelve el producto
*/
export async function GET(request, { params }) {
  try {
    const db = await DBConnect("tienda_test");
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No se insertó id valida" });
    }
    const productos = await db
      .collection("productos")
      .findOne({ _id: new ObjectId(id) });

    return NextResponse.json({ productos });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
/* 
función POST, inserta datos en un nuevo documento

*/
export async function POST(request) {
  try {
    /*
      acá request.json() explota cuando request es nulo, por eso está dentro del try
      por ahora no se como solucionarlo sin aumentar la dificultad :V 
    */
    const body = await request.json();
    /* manejar respuesta de json, puede ser cualquier estupidez siempre y cuando sea json xd */

    try {
      /*  
      try dentro de try? es lo mejor?
      */
      const db = await DBConnect("tienda_test");
      const result = await db.collection("productos").insertOne({ name: body });
      return NextResponse.json({ result });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function PATCH(request, { params }) {
  try {
    /*
      acá request.json() explota cuando request es nulo, por eso está dentro del try
      por ahora no se como solucionarlo sin aumentar la dificultad :V 
    */
    const body = await request.json();
    /* manejar respuesta de json, puede ser cualquier estupidez siempre y cuando sea json xd */
    let { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No se insertó id valida" });
    }

    try {
      /*  
      try dentro de try? es lo mejor?
      */
      const db = await DBConnect("tienda_test");
      const result = await db
        .collection("productos")
        .updateOne({ _id: new ObjectId(id) }, { $set: { name: body } });
      return NextResponse.json({ result });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function DELETE(request, { params }) {
  try {
    let { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "No se insertó id valida" });
    }

    try {
      /*  
      try dentro de try? es lo mejor?
      */
      const db = await DBConnect("tienda_test");
      const result = await db
        .collection("productos")
        .deleteOne({ _id: new ObjectId(id) });
      return NextResponse.json({ result });
    } catch (error) {
      return NextResponse.json({ error: error.message });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
