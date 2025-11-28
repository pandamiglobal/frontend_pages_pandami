"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/app/_components/atoms/ui/dialog";
import { Calendar } from "@/app/_components/atoms/ui/calendar";
import { PrimaryButton } from "@/app/_components/molecules/branded-button";
import { buildWhatsAppUrl } from "@/lib/utils/public-profile-helpers";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WhatsAppScheduleModalProps {
	isOpen: boolean;
	onClose: () => void;
	whatsappLink: string;
	profileName?: string;
}

export const WhatsAppScheduleModal = ({
	isOpen,
	onClose,
	whatsappLink,
	profileName = "profissional",
}: WhatsAppScheduleModalProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
	const [selectedTime, setSelectedTime] = useState<string>("");

	const handleClose = () => {
		setSelectedDate(undefined);
		setSelectedTime("");
		onClose();
	};

	// Helper para desabilitar datas passadas (comparando apenas data, sem hora)
	const isDateDisabled = (date: Date) => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const compareDate = new Date(date);
		compareDate.setHours(0, 0, 0, 0);
		return compareDate < today;
	};

	const handleScheduleAppointment = () => {
		if (!selectedDate || !selectedTime) {
			return;
		}

		const formattedDate = format(selectedDate, "dd/MM/yyyy", { locale: ptBR });
		const dayName = format(selectedDate, "EEEE", { locale: ptBR });
		const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

		const message = `Olá! Gostaria de agendar um horário para ${capitalizedDayName}, ${formattedDate} às ${selectedTime}.`;

		const whatsappUrl = buildWhatsAppUrl(whatsappLink, message);
		window.open(whatsappUrl, "_blank");
		handleClose();
	};

	const handleDirectContact = () => {
		const message = `Olá! Vim pelo site de vocês e quero entrar em contato.`;
		const whatsappUrl = buildWhatsAppUrl(whatsappLink, message);
		window.open(whatsappUrl, "_blank");
		handleClose();
	};

	const isScheduleDisabled = !selectedDate || !selectedTime;

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-center">
						Agendar pelo WhatsApp
					</DialogTitle>
					<DialogDescription className="text-center">
						Escolha a data e horário desejados para o seu agendamento
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-6 py-4">
					{/* Calendar */}
					<div className="flex flex-col items-center">
						<Calendar
							mode="single"
							selected={selectedDate}
							onSelect={setSelectedDate}
							disabled={isDateDisabled}
							locale={ptBR}
							className="rounded-md border"
						/>
					</div>

					{/* Time Selector */}
					{selectedDate && (
						<div className="space-y-2">
							<label
								htmlFor="time"
								className="text-sm font-medium text-neutral-700"
							>
								Horário
							</label>
							<input
								id="time"
								type="time"
								value={selectedTime}
								onChange={(e) => setSelectedTime(e.target.value)}
								className={cn(
									"w-full h-10 px-3 rounded-lg border border-neutral-300",
									"focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
									"text-base"
								)}
							/>
						</div>
					)}

					{/* Action Buttons */}
					<div className="space-y-3 pt-2">
						<PrimaryButton
							onClick={handleScheduleAppointment}
							disabled={isScheduleDisabled}
							className={cn(
								"w-full h-12 bg-green-600 hover:bg-green-500 text-white rounded-xl",
								"flex items-center justify-center gap-2 transition-colors",
								"disabled:opacity-50 disabled:cursor-not-allowed"
							)}
						>
							<Image
								src="/svg/whatsapp-icon.svg"
								alt="WhatsApp"
								width={20}
								height={20}
								className="size-5"
							/>
							<span className="font-medium">Agendar horário pelo WhatsApp</span>
						</PrimaryButton>

						<PrimaryButton
							onClick={handleDirectContact}
							variant="outline"
							className="w-full h-12 rounded-xl border-2 border-neutral-300 hover:bg-neutral-50"
						>
							<span className="font-medium text-neutral-700">
								Entrar em contato direto
							</span>
						</PrimaryButton>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

