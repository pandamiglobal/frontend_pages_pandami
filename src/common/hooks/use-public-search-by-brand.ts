import { useState } from "react";
import { useLeadCache } from "./use-lead-cache";
import toast from "react-hot-toast";
import api from "../config/api";

interface IFormValues {
    name: string;
    email: string;
    brand: string;
    isRadical: boolean;
}

export default function usePublicSearchByBrand() {
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const { saveData } = useLeadCache();

    const execPublicSearchByBrand = async (data: IFormValues) => {
        try {
            setLoading(true);
            setLoadingMessage("Preparando a consulta...");

            await new Promise(resolve => setTimeout(resolve, 1500));
            setLoadingMessage("Acessando INPI...");

            await new Promise(resolve => setTimeout(resolve, 3000));
            setLoadingMessage("Consultando base de dados...");

            await new Promise(resolve => setTimeout(resolve, 2000));
            setLoadingMessage("Só mais um pouquinho...");

            const response = await api.post(
                `/brand/public-brand-find/${data.brand}`,
                {
                    name: data.name,
                    email: data.email,
                    radical: data.isRadical,
                }
            );

            setLoadingMessage("Gerando resultado...");
            await new Promise(resolve => setTimeout(resolve, 1500));

            if (response.data.raws && Array.isArray(response.data.raws)) {
                const allResults = response.data.raws;
                if (allResults.length > 0) {
                    toast.success(`Marca ${data.brand} consultada com sucesso. ${allResults.length} resultados encontrados.`);
                } else {
                    toast.error(`Marca ${data.brand} não encontrada`);
                }

                saveData({
                    email: data.email,
                    name: data.name,
                    brand: data.brand,
                });

                setLoading(false);
                setIsDisabled(false);
                setLoadingMessage("");

                return { ...response.data, raws: allResults };
            } else {
                toast.error("A consulta não retornou resultados válidos");
            }

            return null;
        } catch (error) {
            toast.error("Falha em consultar base do INPI");
        } finally {
            setLoading(false);
            setIsDisabled(false);
            setLoadingMessage("");
        }
    };

    return { execPublicSearchByBrand, loading, loadingMessage, isDisabled };
}
