'use client';

import React, { useState, useRef } from 'react';
import { MorphingModal, BackdropType, ModalPosition } from '../../components/modal'; 
import {useTheme} from 'next-themes'

export default function MultiModalExample() {
  const { theme, setTheme } = useTheme();

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
        onClick={(e) => handleOpenModal({ id: '1', title: 'Boton2', color: 'bg-emerald-500', }, e)}
        className="px-6 py-3 rounded-full text-black font-semibold "
      >
        Boton 1
      </button>

      <button
        onClick={(e) => handleOpenModal({ id: '2', title: 'Modal 2', color: 'bg-indigo-600' }, e)}
        className="px-6 py-3 bg-card rounded-full text-white font-semibold"
      >
        Boton 2
      </button>
      <button onClick={()=> setTheme("celeste-oscuro")}>
        xd
      </button>
      <button onClick={()=> setTheme("light")}>
        xd
      </button>

      {/* RENDERIZADO SIEMPRE ACTIVO CUANDO HAYA SIDO CONFIGURADO */}
      {lastConfig && (
        <MorphingModal
          isOpen={activeModalId === lastConfig.id}
          onClose={handleClose}
          triggerRef={activeTriggerRef}
          buttonContent={lastConfig.title}
          buttonColor={lastConfig.color}
          position="trigger"
          backdropType='transparent'
          
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