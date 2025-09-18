'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { PrimaryButton } from "@/components/ui/primary-button";
import { useState } from "react";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/@types/@lead";

const formSchema = z.object({
    brand: z.string({
        required_error: 'Nome do seu salão é obrigatório'
    }).min(1, "Tamanho mínimo de 1 caractere"),
    phone: z.string({
        message: 'Telefone é obrigatório'
    })
        .min(14, "Telefone inválido")
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
        .transform((val) => val.replace(/[^\d]/g, "")),
})

type FormValues = z.infer<typeof formSchema>

export function LeadFormBlog({ articleUri }: { articleUri: string }) {
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
            data: {
                brand: data.brand,
                name: 'Nome não informado',
                phone_number: data.phone,
                description: `Lead interessado em soluções de visagismo por IA para salão de beleza. Artigo: ${articleUri}`,
                origin: EOriginLead.seo_archive,
                origin_font: 'visagismo-form'
            }
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
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] border-solid flex flex-col gap-4 mt-10">
                <h2 className="title-5 text-center">Transforme seu salão com visagismo por IA</h2>
                <p className="text-center text-sm text-neutral-600 mb-2">Democratize o visagismo e aumente suas vendas com nossa tecnologia</p>

                <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-[#374151] mb-2">
                        Nome do seu salão
                    </label>
                    <Input
                        id="brand"
                        name="brand"
                        placeholder="Digite o nome do seu salão"
                        register={register}
                        className={errors.brand ? "border-red-500" : ""}
                    />
                    {errors.brand && (
                        <span className="text-red-500 text-sm mt-1">{errors.brand.message}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-2">
                        Telefone do salão
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

                <PrimaryButton
                    type="submit"
                    disabled={isSubmitting}
                    size="default"
                    className="w-full py-4"
                >
                    Quero Pandami no meu salão
                </PrimaryButton>
            </form>
        </>
    )
}