import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import TradeMarkList from "./trade-mark-list";
import { Container } from "@/components/ui/container";


export function Hero() {
    return (
        <>
            <section
                className="min-h-[60vh] md:min-h-[70vh] flex"
            >
                <Container section={true} className="flex flex-col items-center justify-center gap-6 md:gap-8">  {/** py-20 px-4 relative backdrop-blur-xs */}
                    <div className="flex flex-col items-center justify-center gap-3">
                        <motion.h2
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="title-2"
                        >
                            Consulta INPI
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-1 text-center text-gray-600!"
                        >
                            Ferramenta gratuita para buscar e verificar disponibilidade de marcas no INPI. Proteja sua propriedade intelectual e evite conflitos de marca.
                        </motion.p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="w-full max-[500px]:"
                    >
                        <TradeMarkList />
                    </motion.div>
                </Container>
            </section>
        </>
    );
}
