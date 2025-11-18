import { ICreateLead } from "@/common/types/ILead";
import api from "@/common/config/api";

export async function createLead(lead: ICreateLead) {
    try {
        const response = await api.post<{ id: number }>(`/brand/lead`, {
            ...lead
        })
        return true;
    } catch (error: any) {
        console.error('Error creating lead:', error.response?.data || error.message);
        return null;
    }
}
