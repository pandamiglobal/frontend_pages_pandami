'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { BrandCheckModal } from "./brand-check-modal";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/@types/@lead";

const formSchema = z.object({
    brand: z.string({
        required_error: 'Nome da sua marca é obrigatório'
    }).min(1, "Tamanho mínimo de 1 caractere"),
    phone: z.string({
        message: 'Telefone é obrigatório'
    })
        .min(14, "Telefone inválido")
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
        .transform((val) => val.replace(/[^\d]/g, "")),
})

type FormValues = z.infer<typeof formSchema>

export function BrandCheckForm({ articleUri }: { articleUri: string }) {
    const { execCreateLead } = useCreateLead();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brandName, setBrandName] = useState("");

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormValues) => {
        execCreateLead({
            brand: data.brand,
            name: 'Nome não informado',
            phone_number: data.phone,
            description: `Lead coletado no modal de verificação de marca no artigo ${articleUri}`,
            origin: EOriginLead.seo_archive,
            origin_font: 'brand-check-form'
        });

        reset({
            brand: "",
            phone: "",
        }, {
            keepDefaultValues: false
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] border-solid flex flex-col gap-4">
                <h2 className="title-5 text-center">Sua marca pode estar correndo perigo!!</h2>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-[#374151] mb-2">
                        Nome da sua marca
                    </label>
                    <Input
                        id="brand"
                        name="brand"
                        placeholder="Digite o nome da sua marca"
                        register={register}
                        className={errors.brand ? "border-red-500" : ""}
                    />
                    {errors.brand && (
                        <span className="text-red-500 text-sm mt-1">{errors.brand.message}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-2">
                        Seu número de telefone
                    </label>
                    <Input
                        id="phone"
                        control={control}
                        name="phone"
                        placeholder="(00) 00000-0000"
                        inputMask="(99) 99999-9999"
                        register={register}
                        className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                        <span className="text-red-500 text-sm mt-1">{errors.phone.message}</span>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-[#0047ff] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0047ff]/90 transition-colors max-md:w-full"
                >
                    Verificar se minha marca foi roubada
                </Button>
            </form>
        </>
    )
} 