import { Check, Lock, Shield } from "lucide-react"
import { siVisa, siMastercard } from "simple-icons"
import { Container } from "./ui/container"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-16 bg-white border-t border-gray-200">
      <Container>
        {/* Top section with copyright and links */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 text-sm text-gray-600">
          <div className="mb-4 lg:mb-0">© 2024 PPPI - Todos os direitos reservados.</div>

          <div className="mb-4 lg:mb-0 text-center">Este site não é vinculado ao Facebook, Instagram ou Meta Inc.</div>

          <div className="flex gap-4">
            <Link href="/termos-de-uso" className="hover:text-[#2563eb] transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-[#2563eb] transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-6"></div>

        {/* Bottom section with trust badges and payment methods */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-6 mb-6 lg:mb-0 max-md:flex-col">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Verificado PPPI</span>
            </div>

            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">SSL Seguro</span>
            </div>

            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-gray-600" />
              <span className="text-sm text-gray-600">Site Confiável</span>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Visa logo from Simple Icons */}
            <div className="flex items-center justify-center w-16 h-12">
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-12 h-12"
                fill="#1434CB"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Visa</title>
                <path d={siVisa.path} />
              </svg>
            </div>

            {/* Mastercard logo from Simple Icons */}
            <div className="flex items-center justify-center w-16 h-12">
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-12 h-12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mastercard</title>
                <circle cx="8" cy="12" r="6.5" fill="#EB001B"/>
                <circle cx="16" cy="12" r="6.5" fill="#F79E1B"/>
                <path d="M12 17.124S9.5 15.5 9.5 12 12 6.876 12 6.876 14.5 8.5 14.5 12 12 17.124 12 17.124z" fill="#FF5F00"/>
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

