'use client';

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

export type BackdropType = 'dark' | 'blur' | 'dark-blur' | 'transparent';
export type ModalSize = 'custom' | 'full';
export type ModalPosition = 'center' | 'trigger';

export interface MorphingModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  
  buttonContent?: React.ReactNode;
  buttonColor?: string;
  textColor?: string;
  backdropType?: BackdropType;
  size?: ModalSize;
  position?: ModalPosition;
  
  maxWidth?: 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl';
  customWidthPx?: number | string;
  heightPx?: number | string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export function MorphingModal({
  isOpen,
  onClose,
  triggerRef,
  buttonContent = 'Abrir',
  buttonColor = 'bg-emerald-500',
  textColor = 'text-black',
  backdropType = 'dark-blur',
  size = 'custom',
  position = 'center',
  maxWidth = 'max-w-md',
  customWidthPx,
  heightPx,
  backgroundColor = '#121212',
  children,
}: MorphingModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [rect, setRect] = useState<DOMRect | null>(null);
  
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const maxWidthMap: Record<string, number> = {
    'max-w-sm': 384,
    'max-w-md': 448,
    'max-w-lg': 512,
    'max-w-xl': 576,
    'max-w-2xl': 672,
  };

  // Helper para convertir clases de Tailwind o valores numéricos/strings a píxeles numéricos para el cálculo de posicionamiento
  const parseDimension = (value: number | string | undefined, fallback: number): number => {
    if (value === undefined) return fallback;
    if (typeof value === 'number') return value;
    
    // Si viene en formato px (ej: "500px")
    if (value.endsWith('px')) return parseFloat(value) || fallback;
    
    // Si viene una clase de Tailwind como w-[500px] o h-[300px]
    const arbitraryMatch = value.match(/\[([0-9.]+)px\]/);
    if (arbitraryMatch) return parseFloat(arbitraryMatch[1]);

    // Mapeo básico de Tailwind si usan w-96, h-64, etc.
    const twScaleMap: Record<string, number> = {
      'w-64': 256, 'w-80': 320, 'w-96': 384,
      'h-64': 256, 'h-80': 320, 'h-96': 384, 'h-128': 512
    };

    return twScaleMap[value] || parseFloat(value) || fallback;
  };

  const isTailwindBg = buttonColor.startsWith('bg-');
  const isTailwindText = textColor.startsWith('text-');

  // Bloqueo de scroll incondicional
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // MEDIDA SÍNCRONA: useLayoutEffect se ejecuta ANTES de que la pantalla se pinte
  useLayoutEffect(() => {
    if (isOpen) {
      const btn = triggerRef.current;
      activeBtnRef.current = btn;

      if (btn) {
        // Medir de inmediato antes del render visual
        const currentRect = btn.getBoundingClientRect();
        setRect(currentRect);
        
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';
      }

      setIsMounted(true);
      setIsExpanded(false); // Iniciar colapsado exactamente sobre el botón

      // Transicionar al centro en el siguiente frame
      const frame = requestAnimationFrame(() => {
        setIsExpanded(true);
      });

      return () => cancelAnimationFrame(frame);
    } else {
      setIsExpanded(false);

      const currentBtn = activeBtnRef.current || triggerRef.current;

      const timer = setTimeout(() => {
        setIsMounted(false);
        setRect(null);

        if (currentBtn) {
          currentBtn.style.opacity = '1';
          currentBtn.style.pointerEvents = 'auto';
        }
        activeBtnRef.current = null;
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [isOpen, triggerRef]);

  if (!isMounted || !rect) return null;

  // Dimensiones destino
  let targetWidth: number;
  let targetHeight: number;

  if (size === 'full') {
    targetWidth = window.innerWidth - 20;
    targetHeight = window.innerHeight - 20;
  } else {
    const rawWidthPx = parseDimension(customWidthPx, maxWidthMap[maxWidth] || 448);
    const rawHeightPx = parseDimension(heightPx, contentRef.current ? contentRef.current.scrollHeight : 500);

    targetWidth = Math.min(rawWidthPx, window.innerWidth - 32);
    targetHeight = rawHeightPx;
  }

  // Posicionamiento inteligente
  let targetLeft: number;
  let targetTop: number;

  const PADDING = 16;

  if (position === 'trigger') {
    if (rect.left + targetWidth > window.innerWidth - PADDING) {
      targetLeft = rect.right - targetWidth;
      if (targetLeft < PADDING) targetLeft = PADDING;
    } else {
      targetLeft = Math.max(PADDING, rect.left);
    }

    if (rect.top + targetHeight > window.innerHeight - PADDING) {
      targetTop = rect.bottom - targetHeight;
      if (targetTop < PADDING) targetTop = PADDING;
    } else {
      targetTop = Math.max(PADDING, rect.top);
    }
  } else {
    targetLeft = (window.innerWidth - targetWidth) / 2;
    targetTop = (window.innerHeight - targetHeight) / 2;
  }

  const initialRadius = `${rect.height / 2}px`;

  const currentStyles: React.CSSProperties = isExpanded
    ? {
        position: 'fixed',
        left: `${targetLeft}px`,
        top: `${targetTop}px`,
        width: `${targetWidth}px`,
        height: `${targetHeight}px`,
        borderRadius: size === 'full' ? '20px' : '28px',
      }
    : {
        position: 'fixed',
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        borderRadius: initialRadius,
      };

  const backdropClasses = {
    'dark': 'bg-black/70',
    'blur': 'backdrop-blur-lg bg-transparent',
    'dark-blur': 'bg-black/60 backdrop-blur-md',
    'transparent': 'bg-transparent',
  }[backdropType];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        isExpanded ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-400 ease-out ${backdropClasses} ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Contenedor Modal */}
      <div
        style={{
          ...currentStyles,
          backgroundColor: backgroundColor,
          willChange: 'width, height, left, top, border-radius',
        }}
        className="relative z-10 overflow-hidden border border-white/10 shadow-2xl transition-all duration-400 cubic-bezier(0.32,0.72,0,1)"
      >
        {/* Capa de color del botón */}
        <div
          style={!isTailwindBg ? { backgroundColor: buttonColor } : undefined}
          className={`absolute inset-0 transition-opacity duration-300 ${
            isTailwindBg ? buttonColor : ''
          } ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />

        {/* Contenido/Ícono del botón */}
        <div
          style={!isTailwindText ? { color: textColor } : undefined}
          className={`absolute inset-0 flex items-center justify-center w-full px-4 font-semibold whitespace-nowrap transition-opacity duration-200 ${
            isTailwindText ? textColor : ''
          } ${!isExpanded ? 'opacity-100 delay-200' : 'opacity-0 delay-0'}`}
        >
          {buttonContent}
        </div>

        {/* Contenido interno del modal */}
        <div
          ref={contentRef}
          className={`relative z-10 h-full w-full p-6 pt-12 text-white transition-opacity duration-150 ${
            isExpanded ? 'opacity-100 delay-150' : 'opacity-0 delay-0'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-zinc-400 transition-colors hover:bg-white/20 hover:text-white z-20"
          >
            ✕
          </button>

          {children}
        </div>
      </div>
    </div>
  );
}