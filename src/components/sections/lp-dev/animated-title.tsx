'use client'

import { useEffect, useRef } from "react"
import Typed from "typed.js"

export function AnimatedTitle() {
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Empresas', 'Dados', 'Produtos', 'Marcas'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <h1 className="text-gray-900 text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
      Proteção Inteligente para <span className="text-[#f47834]"><span ref={typedRef}>Marcas</span></span>
    </h1>
  );
} 