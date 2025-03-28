import { ICreateLead } from "@/@types/@lead"
import { useState } from "react";
import toast from "react-hot-toast";
import createLeadAction from "../actions/create-lead-action";

export default function useCreateLead() {
    const [loading, setLoading] = useState(false);

    const execCreateLead = async (data: ICreateLead, sucessMessage = 'Mensagem enviada com sucesso, logo um de nossos consultores entrará em contato!') => {
        try {
            setLoading(true);

            const result = await createLeadAction(data);

            if (result) {
                toast.success(sucessMessage)
                return true;
            }

            throw new Error("Não foi possível criar registrar o seu contato, tente novamente.")
        } catch (error) {
            toast.error("Não foi possível criar registrar o seu contato, tente novamente.")
        } finally {
            setLoading(false);
            return false;
        }
    }

    return { execCreateLead }
}