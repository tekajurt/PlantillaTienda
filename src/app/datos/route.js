import { NextResponse } from "next/server";
import { getSupabase } from "../../lib/supabase";
/*
Endpoint GET: obtiene productos desde Supabase tabla `products`.
Soporta parámetros opcionales: `q`, `category`, `limit`, `offset`.
*/
export async function GET(request) {
  try {
    const supabase = getSupabase();
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category") || "";
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    let query = supabase
      .from("products")
      .select("*", { count: "exact" })
      .range(offset, offset + limit - 1);

    if (category) query = query.eq("category", category);
    if (q) query = query.ilike("title", `%${q}%`);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
