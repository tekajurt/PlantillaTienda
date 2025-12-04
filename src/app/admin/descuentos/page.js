"use client";
import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import { Modal } from "@/components/Modal";
import style from "@/components/admin-crud.module.css";

export default function DescuentosPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_type: "percentage",
    discount_value: "",
    valid_from: "",
    valid_until: "",
    is_active: true,
    applicable_to: "all",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const supabase = getSupabase();
      const { data, error: err } = await supabase
        .from("discounts")
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
        discount_type: item.discount_type,
        discount_value: item.discount_value,
        valid_from: item.valid_from || "",
        valid_until: item.valid_until || "",
        is_active: item.is_active || true,
        applicable_to: item.applicable_to || "all",
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        valid_from: "",
        valid_until: "",
        is_active: true,
        applicable_to: "all",
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
        discount_value: parseFloat(formData.discount_value),
      };

      if (editingId) {
        const { error: err } = await supabase
          .from("discounts")
          .update(dataToSave)
          .eq("id", editingId);
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await supabase
          .from("discounts")
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
    if (!confirm("¿Estás seguro de que deseas eliminar este descuento?"))
      return;
    try {
      const supabase = getSupabase();
      const { error: err } = await supabase
        .from("discounts")
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

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("es-ES");
  };

  if (loading) return <p className={style.loading}>Cargando descuentos...</p>;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Gestión de Descuentos</h1>
        <button onClick={() => handleOpenModal()} className={style.btnNew}>
          + Nuevo Descuento
        </button>
      </div>

      {error && <p className={style.error}>{error}</p>}

      <div className={style.search}>
        <input
          type="text"
          placeholder="Buscar descuentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Válido desde</th>
              <th>Válido hasta</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.discount_type === "percentage" ? "%" : "$"}</td>
                <td>{item.discount_value}</td>
                <td>{formatDate(item.valid_from)}</td>
                <td>{formatDate(item.valid_until)}</td>
                <td>{item.is_active ? "✓" : "✗"}</td>
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
        title={editingId ? "Editar Descuento" : "Nuevo Descuento"}
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
            rows="2"
          />
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label>Tipo de Descuento *</label>
            <select
              value={formData.discount_type}
              onChange={(e) =>
                setFormData({ ...formData, discount_type: e.target.value })
              }
            >
              <option value="percentage">Porcentaje (%)</option>
              <option value="fixed">Monto Fijo ($)</option>
            </select>
          </div>
          <div className={style.formGroup}>
            <label>Valor *</label>
            <input
              type="number"
              value={formData.discount_value}
              onChange={(e) =>
                setFormData({ ...formData, discount_value: e.target.value })
              }
              placeholder="0"
              required
            />
          </div>
        </div>
        <div className={style.formRow}>
          <div className={style.formGroup}>
            <label>Válido desde</label>
            <input
              type="date"
              value={formData.valid_from}
              onChange={(e) =>
                setFormData({ ...formData, valid_from: e.target.value })
              }
            />
          </div>
          <div className={style.formGroup}>
            <label>Válido hasta</label>
            <input
              type="date"
              value={formData.valid_until}
              onChange={(e) =>
                setFormData({ ...formData, valid_until: e.target.value })
              }
            />
          </div>
        </div>
        <div className={style.formGroup}>
          <label>
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
            />{" "}
            Descuento Activo
          </label>
        </div>
      </Modal>
    </div>
  );
}
