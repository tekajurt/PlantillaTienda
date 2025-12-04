"use client";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import { Modal } from "@/components/Modal";
import style from "@/components/admin-crud.module.css";

export default function ProductosPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    images: "[]",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const supabase = getSupabase();
      const { data, error: err } = await supabase
        .from("products")
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
        title: item.title,
        description: item.description || "",
        price: item.price,
        stock: item.stock,
        category: item.category || "",
        images: JSON.stringify(item.images || []),
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        images: "[]",
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const supabase = getSupabase();
      const dataToSave = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: JSON.parse(formData.images),
      };

      if (editingId) {
        const { error: err } = await supabase
          .from("products")
          .update(dataToSave)
          .eq("id", editingId);
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await supabase
          .from("products")
          .insert([dataToSave]);
        if (err) throw new Error(err.message);
      }

      setModalOpen(false);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
    try {
      const supabase = getSupabase();
      const { error: err } = await supabase
        .from("products")
        .delete()
        .eq("id", id);
      if (err) throw new Error(err.message);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className={style.loading}>Cargando productos...</p>;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Gestión de Productos</h1>
        <button onClick={() => handleOpenModal()} className={style.btnNew}>
          + Nuevo Producto
        </button>
      </div>

      {error && <p className={style.error}>{error}</p>}

      <div className={style.search}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td className={item.stock <= 5 ? style.lowStock : ""}>
                  {item.stock}
                </td>
                <td>{item.category || "-"}</td>
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
        title={editingId ? "Editar Producto" : "Nuevo Producto"}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      >
        <div className={style.formGroup}>
          <label>Título *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label>Precio *</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
          <div className={style.formGroup}>
            <label>Stock *</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, stock: e.target.value })
              }
              required
            />
          </div>
        </div>
        <div className={style.formGroup}>
          <label>Categoría</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="ej: perifericos"
          />
        </div>
        <div className={style.formGroup}>
          <label>Imágenes (JSON array)</label>
          <textarea
            value={formData.images}
            onChange={(e) =>
              setFormData({ ...formData, images: e.target.value })
            }
            rows="3"
            placeholder='["/images/producto.svg"]'
          />
        </div>
      </Modal>
    </div>
  );
}
