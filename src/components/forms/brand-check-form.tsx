'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { BrandCheckModal } from "./brand-check-modal";

const formSchema = z.object({
    brand: z.string({
        required_error: 'Nome da sua marca é obrigatório'
    }).min(1, "Tamanho mínimo de 1 caractere"),
})

type FormValues = z.infer<typeof formSchema>

export function BrandCheckForm({ articleUri }: { articleUri: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [brandName, setBrandName] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormValues) => {
        setBrandName(data.brand);
        setIsModalOpen(true);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 border border-[#E5E7EB] border-solid flex flex-col gap-4">
                <h2 className="title-5 text-center">Sua marca pode está correndo perigo!</h2>

                <p className="text-4 text-center">
                    Você sabia que muitos empresários não sabem que a qualquer momento, podem ter sua marca roubada?
                </p>

                <div>
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
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="bg-[#0047ff] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0047ff]/90 transition-colors max-md:w-full"
                >
                    Verificar se minha marca foi roubada
                </Button>
            </form>

            <BrandCheckModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                brandName={brandName}
                articleUri={articleUri}
            />
        </>
    )
} 