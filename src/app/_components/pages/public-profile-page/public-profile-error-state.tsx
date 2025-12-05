"use client";

import Link from "next/link";
import { XCircle, Search, AlertCircle, LucideIcon } from "lucide-react";
import { BrandedButton } from "@/app/_components/molecules/branded-button";

export type PublicProfileErrorType =
	| "invalid_slug"
	| "not_found"
	| "generic_error";

interface PublicProfileErrorStateProps {
	type: PublicProfileErrorType;
	message?: string;
	onRetry?: () => void;
}

const CONFIG: Record<
	PublicProfileErrorType,
	{
		icon: LucideIcon;
		iconColor: string;
		iconBg: string;
		title: string;
		defaultMessage: string;
	}
> = {
	invalid_slug: {
		icon: XCircle,
		iconColor: "text-red-600",
		iconBg: "bg-red-100",
		title: "Busca inválida",
		defaultMessage:
			"O endereço digitado contém caracteres inválidos. Verifique o link e tente novamente.",
	},
	not_found: {
		icon: Search,
		iconColor: "text-neutral-600",
		iconBg: "bg-neutral-100",
		title: "Perfil não encontrado",
		defaultMessage:
			"O perfil que você está procurando não existe ou foi removido. Verifique o endereço digitado.",
	},
	generic_error: {
		icon: AlertCircle,
		iconColor: "text-red-600",
		iconBg: "bg-red-100",
		title: "Erro ao carregar perfil",
		defaultMessage: "Ocorreu um erro inesperado. Tente novamente.",
	},
};

/**
 * Unified error state component for Public Profile pages
 * Handles Invalid Slug, Not Found, and Generic Error states
 */
export function PublicProfileErrorState({
	type,
	message,
	onRetry,
}: PublicProfileErrorStateProps) {
	const config = CONFIG[type];
	const Icon = config.icon;

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
			<div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm">
				<div
					className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${config.iconBg}`}
				>
					<Icon className={`w-6 h-6 ${config.iconColor}`} />
				</div>

				<h2 className="text-xl font-bold text-neutral-900 mb-2">
					{config.title}
				</h2>

				<p className="text-neutral-600 mb-6">
					{message || config.defaultMessage}
				</p>

				<div className="space-y-3">
					{type === "generic_error" && onRetry && (
						<BrandedButton onClick={onRetry} className="w-full justify-center">
							Tentar novamente
						</BrandedButton>
					)}

					<BrandedButton
							href="/"
							variant={type === "generic_error" ? "outline" : "default"}
							className="w-full justify-center"
						>
							Voltar para o início
						</BrandedButton>

					{type === "not_found" && (
						<p className="text-xs text-neutral-500">
							Ou procure por outros profissionais na Pandami
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
