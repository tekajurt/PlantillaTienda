"use client";
import { useState } from "react";
import style from "./modal.module.css";

export function Modal({ isOpen, title, onClose, onSubmit, children }) {
  if (!isOpen) return null;

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2>{title}</h2>
          <button onClick={onClose} className={style.closeBtn}>
            ×
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={style.modalBody}>{children}</div>
          <div className={style.modalFooter}>
            <button type="button" onClick={onClose} className={style.btnCancel}>
              Cancelar
            </button>
            <button type="submit" className={style.btnSubmit}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
