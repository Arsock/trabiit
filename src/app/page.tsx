'use client';

import React, { useState, useRef } from 'react';
import { MorphingModal, BackdropType, ModalPosition } from '../components/modal'; 

export default function MultiModalExample() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  
  // Guardamos la configuración del último modal abierto para no perder su contenido
  // mientras hace la animación de cierre de 400ms.
  const [lastConfig, setLastConfig] = useState<any>(null);
  
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);

  const handleOpenModal = (config: any, e: React.MouseEvent<HTMLButtonElement>) => {
    activeTriggerRef.current = e.currentTarget;
    setLastConfig(config);
    setActiveModalId(config.id);
  };

  const handleClose = () => {
    setActiveModalId(null);
  };

  return (
    <div className="p-10 flex gap-4">
      <button
        onClick={(e) => handleOpenModal({ id: '1', title: 'Modal 1', color: 'bg-emerald-500' }, e)}
        className="px-6 py-3 bg-emerald-500 rounded-full text-black font-semibold"
      >
        Boton 1
      </button>

      <button
        onClick={(e) => handleOpenModal({ id: '2', title: 'Modal 2', color: 'bg-indigo-600' }, e)}
        className="px-6 py-3 bg-indigo-600 rounded-full text-white font-semibold"
      >
        Boton 2
      </button>

      {/* RENDERIZADO SIEMPRE ACTIVO CUANDO HAYA SIDO CONFIGURADO */}
      {lastConfig && (
        <MorphingModal
          isOpen={activeModalId === lastConfig.id}
          onClose={handleClose}
          triggerRef={activeTriggerRef}
          buttonContent={lastConfig.title}
          buttonColor={lastConfig.color}
          
        >
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{lastConfig.title}</h2>
            <p>Contenido dinamico ejecutandose suavemente sin bugs al cerrar.</p>
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-white/20 rounded-md"
            >
              Cerrar
            </button>
          </div>
        </MorphingModal>
      )}
    </div>
  );
}