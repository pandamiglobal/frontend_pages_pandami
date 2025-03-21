"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "../../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { InfoIcon } from "lucide-react";

const formSchema = z.object({
	brandSearch: z.string().min(2, "O nome da marca é obrigatório").max(50),
	searchType: z.enum(["exact", "radical"], {
		required_error: "Você deve escolher um tipo de busca",
	}),
});

type FormValues = z.infer<typeof formSchema>;

interface TradeMarkFormProps {
	onSubmit?: (values: FormValues) => void;
	isDisabled?: boolean;
}

export default function TradeMarkForm({ onSubmit, isDisabled = false }: TradeMarkFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			brandSearch: "",
			searchType: "exact",
		}
	});

	const searchType = watch("searchType");

	return (
		<div className="relative w-full z-10">
			<fieldset>
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-12">
					<div className="flex items-center gap-2 relative">
						<input
							type="radio"
							value="exact"
							id="exact"
							{...register("searchType")}
							checked={searchType === "exact"}
							onChange={() => setValue("searchType", "exact")}
							className="form-radio"
						/>
						<Label htmlFor="exact" className="text-gray-600 text-sm md:text-base">
							Buscar por nome exato
						</Label>
						<Popover>
							<PopoverTrigger className="text-gray-500 cursor-pointer">
								<InfoIcon size={15} />
							</PopoverTrigger>
							<PopoverContent className="p-2 md:p-3 bg-white shadow-lg text-gray-500 text-sm md:text-base">
								A busca por nome exato encontra registros com o nome exatamente
								igual ao que foi informado.
							</PopoverContent>
						</Popover>
					</div>
					<div className="flex items-center gap-2 relative">
						<input
							type="radio"
							value="radical"
							id="radical"
							{...register("searchType")}
							checked={searchType === "radical"}
							onChange={() => setValue("searchType", "radical")}
							className="form-radio"
						/>
						<Label htmlFor="radical" className="text-slate-600 text-sm md:text-base">
							Buscar nome por radical
						</Label>
						<Popover>
							<PopoverTrigger className="text-gray-500 cursor-pointer">
								<InfoIcon size={15} />
							</PopoverTrigger>
							<PopoverContent className="p-2 md:p-3 bg-white shadow-lg text-gray-500 text-sm md:text-base">
								A busca por radical considera variações do nome, encontrando
								registros que tenham raízes ou partes do nome informados.
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</fieldset>

			<form
				onSubmit={handleSubmit((values) => {
					if (onSubmit) onSubmit(values);
				})}
				className="flex flex-col sm:flex-row gap-3 mt-5 w-full"
				role="search"
			>
				<label htmlFor="brand-search" className="sr-only">
					Digite o nome da marca para consulta INPI
				</label>
				<Input
					id="brand-search"
					type="text"
					placeholder="Digite o nome da marca para consulta inpi"
					className="md:min-w-[calc(100%-200px)] h-[50px] sm:h-[62px] backdrop-blur-sm border-[#afb1b2] placeholder-slate-400 focus:border-[#2845EF] focus:ring-[#2845EF] shadow-none transition-all duration-300"
					{...register("brandSearch")}
				/>

				<Button
					type="submit"
					disabled={isDisabled}
					className="bg-[#2845EF] shadow-none font-bold hover:bg-[#2845EF]/90 h-[50px] sm:h-[62px] cursor-pointer rounded-[12px] text-sm md:text-base w-full sm:w-[200px] whitespace-nowrap px-4 md:px-8"
				>
					Buscar Marca
				</Button>
			</form>
			{errors.brandSearch && (
				<div className="flex font-medium items-center justify-start py-2 text-red-600 text-sm mt-1">
					{errors.brandSearch.message}
				</div>
			)}
		</div>
	);
}
