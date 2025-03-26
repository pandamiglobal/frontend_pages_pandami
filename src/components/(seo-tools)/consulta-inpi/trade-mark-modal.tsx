import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle, Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/ui/form-input";
import { z } from "zod";
import usePublicSearchByBrand from "@/common/hooks/use-public-search-by-brand";

const formSchema = z.object({
	name: z.string().min(2, "Nome é obrigatório").max(100),
	email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
});

type FormValues = z.infer<typeof formSchema>;

interface TradeMarkModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	searchData: any;
	setData: any;
}

export default function TradeMarkModal({
	isOpen,
	setIsOpen,
	searchData,
	setData,
}: TradeMarkModalProps) {
	const { execPublicSearchByBrand, loading, loadingMessage, isDisabled } = usePublicSearchByBrand();
	const [timeLeft, setTimeLeft] = useState(300);
	const [progress, setProgress] = useState(0);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema)
	});

	useEffect(() => {
		if (!loading) {
			setProgress(0);
			return;
		}

		const startTime = Date.now();
		const duration = 60000;
		const thirtySeconds = 30000;

		const updateProgress = () => {
			const elapsed = Date.now() - startTime;
			if (elapsed >= duration) {
				setProgress(100);
				return;
			}

			if (elapsed >= thirtySeconds) {
				// Calculate progress between 90% and 99% for the remaining 15 seconds
				const remainingTime = duration - thirtySeconds; // 15 seconds
				const elapsedAfterThirty = elapsed - thirtySeconds;
				const additionalProgress = Math.min(9, (elapsedAfterThirty / remainingTime) * 9);
				setProgress(Math.round(90 + additionalProgress));
			} else {
				const calculatedProgress = Math.min(90, (elapsed / thirtySeconds) * 90);
				setProgress(Math.round(calculatedProgress));
			}

			requestAnimationFrame(updateProgress);
		};

		const animation = requestAnimationFrame(updateProgress);
		return () => cancelAnimationFrame(animation);
	}, [loading]);

	useEffect(() => {
		if (!loading && progress > 0) {
			setProgress(100);
		}
	}, [loading]);

	useEffect(() => {
		if (!isOpen) return;

		const timer = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(timer);
	}, [isOpen]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	const handleGetBrandResult = async (data: FormValues) => {
		
		const response = await execPublicSearchByBrand({
			...data,
			brand: searchData.brand,
			isRadical: searchData.isRadical,
			isInternational: searchData.searchType === "international" ? true : false,
		})

		if (response) {
			setData(response);
		}

		setIsOpen(false);
		reset();
	}

	const handleClose = () => {
		if (!loading) {
			setIsOpen(false);
			reset();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-2xl md:max-w-3xl border-2 rounded-xl border-slate-800 bg-slate-900/95 backdrop-blur-sm grid-cols-1 max-sm:p-2">
				<DialogClose className="absolute right-4 top-4 stroke-white text-white hover:text-white focus:text-white hover:opacity-90 focus:opacity-90 focus:ring-0 focus:outline-none z-50">
					<X className="h-4 w-4 border-white text-white stroke-white hover:text-white focus:text-white" />
					<span className="sr-only">Close</span>
				</DialogClose>
				<div className="p-3 md:p-4">
					<div className="flex flex-col gap-4 text-center">
						<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white whitespace-normal break-words">
							Resultado: {searchData.brand}
						</h2>
						<p className="text-white font-medium text-sm md:text-base lg:text-lg whitespace-normal">
							O resultado da sua consulta INPI expira em
							<span className="inline-block bg-orange-600 text-white px-2 md:px-3 py-1 rounded-full mx-2">
								{minutes}:{seconds < 10 ? `0${seconds}` : seconds} minutos
							</span>
							para visualizar. Digite seu e-mail abaixo para que possamos enviar
							também por lá
						</p>

						<form
							onSubmit={handleSubmit(handleGetBrandResult)}
							className="flex flex-col gap-4 mt-2"
						>
							<FormInput
								id="name"
								label="Nome"
								placeholder="Seu nome"
								labelClassName="text-gray-200 text-left"
								className="text-gray-900 bg-white"
								{...register("name")}
								error={errors.name?.message}
							/>

							<FormInput
								id="email"
								label="E-mail"
								type="email"
								labelClassName="text-gray-200 text-left"
								placeholder="Seu e-mail"
								className="text-gray-900 bg-white"
								{...register("email")}
								error={errors.email?.message}
							/>

							<DialogFooter className="flex flex-col w-full mt-2">
								{loading ? (
									<div className="space-y-2 w-full">
										<Button
											className="bg-blue-600 gap-2 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg w-full text-sm md:text-base h-10 md:h-12 flex items-center justify-center"
											disabled
										>
											<Loader2 className="animate-spin h-4 md:h-5 w-4 md:w-5" />
											<span className="whitespace-nowrap">
												{loadingMessage}
											</span>
										</Button>
										<div className="flex flex-row items-center justify-between w-full gap-1">
											<div className="flex-1 bg-slate-700 rounded-full h-2 overflow-hidden">
												<div
													className="h-full w-full bg-blue-500 transition-all duration-1000 ease-linear"
													style={{ width: `${progress}%` }}
												/>
											</div>
											<p className="text-blue-400 text-sm min-w-[40px] text-right">
												{progress}%
											</p>
										</div>
									</div>
								) : (
									<Button
										type="submit"
										className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-3 md:px-4 rounded-lg w-full text-sm md:text-base h-10 md:h-12"
									>
										Visualizar consulta
									</Button>
								)}
							</DialogFooter>
						</form>
					</div>
				</div>
				<div className="px-4 md:px-5 pb-4 md:pb-5">
					<div className="relative w-full border-2 border-slate-700 bg-slate-800 rounded-lg overflow-hidden">
						<div className="p-3 md:p-4 space-y-3">
							<h2 className="text-lg md:text-xl font-bold text-white text-center">
								Oferta Especial: Tenha um relatório de marca profissional
							</h2>
							<p className="text-slate-200 text-sm md:text-base max-sm:text-center">
								<span className="text-red-500 font-bold">
									🚀 PRESENTE ESPECIAL:{" "}
								</span>
								Descubra se sua marca está dentro das diretrizes de registro!
								Com nosso
								<span className="font-bold"> Relatório Profissional</span>, você
								recebe uma análise completa de viabilidade e brand-fit para
								evitar problemas no futuro.
							</p>
							<Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 h-15 sm:h-10 md:h-12 rounded-lg flex items-center justify-center gap-2">
								<CheckCircle className="h-4 md:h-5 w-4 md:w-5 max-sm:hidden" />
								<span className="whitespace-nowrap text-sm md:text-base max-sm:whitespace-normal">
									Desbloquear Agora por Apenas R$ 29,90!
								</span>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
