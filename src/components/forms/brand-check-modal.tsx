'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/@types/@lead";

const formSchema = z.object({
    name: z.string({
        required_error: 'Nome é obrigatório'
    }).min(3, "Nome deve ter no mínimo 3 caracteres"),
    phone: z.string({
        message: 'Telefone é obrigatório'
    })
        .min(14, "Telefone inválido")
        .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
        .transform((val) => val.replace(/[^\d]/g, "")),
})

type FormValues = z.infer<typeof formSchema>

interface BrandCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
    brandName: string;
    articleUri: string;
}

export function BrandCheckModal({ isOpen, onClose, brandName, articleUri }: BrandCheckModalProps) {
    const { execCreateLead } = useCreateLead();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        control
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormValues) => {
        execCreateLead({
            brand: brandName,
            name: data.name,
            phone_number: data.phone,
            description: `Lead coletado no modal de verificação de marca no artigo ${articleUri}`,
            origin: EOriginLead.seo_archive
        });

        reset();
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center title-4">
                        A qualquer momento a sua marca pode ser roubada!
                    </DialogTitle>
                    <DialogDescription className="text-4 text-center">
                        Marque uma consulta totalmente GRATUITA com um de nossos especialistas e saiba como proteger sua marca.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#374151] mb-2">
                            Seu nome
                        </label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Digite seu nome completo"
                            register={register}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
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
                        className="bg-[#0047ff] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0047ff]/90 transition-colors w-full"
                    >
                        {isSubmitting ? "Enviando..." : "Quero minha consultoria gratuita"}
                    </Button>
                </form>
                <span className="text-xs text-gray-600 text-center">
                    Ao submeter esse formulário, você autoriza que a 3PI. entrar em contato e declara estar ciente da <Link href={'/politica-de-privacidade'} className="text-blue-500">Política de Privacidade.</Link>
                </span>
            </DialogContent>
        </Dialog>
    )
} 