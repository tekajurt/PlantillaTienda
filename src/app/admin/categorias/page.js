"use client";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import { Modal } from "@/components/Modal";
import style from "@/components/admin-crud.module.css";

export default function CategoriasPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const supabase = getSupabase();
      const { data, error: err } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw new Error(err.message);
      setItems(data || []);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        name: item.name,
        description: item.description || "",
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supabase = getSupabase();

      if (editingId) {
        const { error: err } = await supabase
          .from("categories")
          .update(formData)
          .eq("id", editingId);
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await supabase
          .from("categories")
          .insert([formData]);
        if (err) throw new Error(err.message);
      }

      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta categoría?"))
      return;
    try {
      const supabase = getSupabase();
      const { error: err } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
      if (err) throw new Error(err.message);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className={style.loading}>Cargando categorías...</p>;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Gestión de Categorías</h1>
        <button onClick={() => handleOpenModal()} className={style.btnNew}>
          + Nueva Categoría
        </button>
      </div>

      {error && <p className={style.error}>{error}</p>}

      <div className={style.search}>
        <input
          type="text"
          placeholder="Buscar categorías..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description || "-"}</td>
                <td className={style.actions}>
                  <button
                    onClick={() => handleOpenModal(item)}
                    className={style.btnEdit}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={style.btnDelete}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        title={editingId ? "Editar Categoría" : "Nueva Categoría"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className={style.formGroup}>
          <label>Nombre *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label>Descripción</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="4"
          />
        </div>
      </Modal>
    </div>
  );
}
