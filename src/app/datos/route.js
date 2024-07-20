import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("tienda_test");

    const products = await db.collection("productos").find({}).toArray();

    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function POST() {
  return null;
}
