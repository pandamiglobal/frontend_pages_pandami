'use server'

import { ICreateLead } from "@/common/types/ILead";
import { createLead } from "@/server/services/lead/create-lead";

export default async function createLeadAction(leadData: ICreateLead) {
    const lead = await createLead(leadData)
    return lead;
}
