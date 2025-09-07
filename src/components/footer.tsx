import { Mail, Phone, Clock } from "lucide-react"
import { Container } from "./ui/container"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
		<footer className="py-16 bg-white border-t border-gray-200">
			<Container>
				<div className="flex flex-col md:flex-row justify-between">
					{/* Logo e descrição */}
					<div className="mb-8 md:mb-0 md:w-1/3">
						<div className="flex items-center mb-6">
							<Image
								src="/logo.svg"
								alt="Pandami Logo"
								width={50}
								height={50}
								className="h-10 w-auto"
							/>
						</div>
						<p className="text-sm text-gray-600 mb-6 max-w-sm">
							Nutracêuticos premium para cabelos radiantes. Fórmulas exclusivas
							desenvolvidas para realçar sua beleza natural com ingredientes de
							alta qualidade.
						</p>
						<p className="text-xs text-gray-500">
							© 2025 Pandami - Todos os direitos reservados.
						</p>
					</div>

					{/* Links de Navegação */}
					<div className="mb-8 md:mb-0">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Pandami
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link href="/" className="hover:text-primary transition-colors">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/sobre-nos"
									className="hover:text-primary transition-colors"
								>
									Sobre nós
								</Link>
							</li>
							<li>
								<Link
									href="/planos-e-precos"
									className="hover:text-primary transition-colors"
								>
									Planos e preços
								</Link>
							</li>
							<li>
								<Link
									href="/beneficios"
									className="hover:text-primary transition-colors"
								>
									Benefícios
								</Link>
							</li>
							<li>
								<Link
									href="/seja-um-parceiro"
									className="hover:text-primary transition-colors"
								>
									Seja um parceiro
								</Link>
							</li>
						</ul>
					</div>

					{/* Links de Informações */}
					<div className="mb-8 md:mb-0">
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Informações
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li>
								<Link
									href="/politicas-de-privacidade"
									className="hover:text-primary transition-colors"
								>
									Políticas de Privacidade
								</Link>
							</li>
							<li>
								<Link
									href="/termos-de-uso"
									className="hover:text-primary transition-colors"
								>
									Termos de Uso
								</Link>
							</li>
						</ul>
					</div>

					{/* Informações de Contato */}
					<div>
						<h3 className="text-base font-medium mb-4 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-10 after:h-[3px] after:bg-primary after:rounded-full">
							Atendimento
						</h3>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-center gap-2">
								<Mail className="h-4 w-4" />
								<a
									href="mailto:suporte@pandami.com.br"
									className="hover:text-primary transition-colors"
								>
									suporte@pandami.com.br
								</a>
							</li>
							<li className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								<a
									href="tel:08008789746"
									className="hover:text-primary transition-colors"
								>
									0800 878 9746
								</a>
							</li>
							<li className="flex items-center gap-2">
								<Clock className="h-4 w-4" />
								<span>Seg-Sex: 8h às 18h</span>
							</li>
						</ul>
					</div>
				</div>
				{/* logo title */}
				<div className="mt-16">
					<Image
						src="/pandami-logo-title-footer.svg"
						alt="Pandami"
						width={1200}
						height={200}
						className="w-full h-auto"
						aria-hidden="true"
					/>
				</div>
			</Container>
		</footer>
	);
}

