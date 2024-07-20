import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

const getbyId = async (db, id) => {
  if (!ObjectId.isValid(id)) {
    return { error: "ID no válida", status: 400 };
  }
  const DbId = new ObjectId(id);
  if (!db) {
    return null;
  }
  const data = await db?.collection("productos").find(DbId).toArray();

  return data;
};
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("tienda_test");

    const { id } = params;
    const productos = await getbyId(db, id);
    return NextResponse.json({ productos });
  } catch {
    return NextResponse.json({
      error: "Error en el servidor",
      status: 500,
    });
  }
}
