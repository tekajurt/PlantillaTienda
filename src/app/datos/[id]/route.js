import { NextResponse } from "next/server";
import { getSupabase } from "../../../lib/supabase";
/* 
Conectando a la db, devuelve sino Error
*/
// Supabase se conecta vía `getSupabase()`
/* función GET
  obtiene y verifica id y devuelve el producto
*/
export async function GET(request, { params }) {
  try {
    const supabase = getSupabase();
    const { id } = params;
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw new Error(error.message);
    return NextResponse.json({ producto: data });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
/* 
función POST, inserta datos en un nuevo documento

*/
export async function POST(request) {
  try {
    const body = await request.json();
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("products")
      .insert(body)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const { id } = params;
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("products")
      .update(body)
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message });
    return NextResponse.json({ result: data });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
