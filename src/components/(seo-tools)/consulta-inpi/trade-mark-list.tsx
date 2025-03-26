"use client";

import { useLeadCache } from "@/common/hooks/use-lead-cache";
import TradeMarkForm from "./trade-mark-form";
import TradeMarkModal from "./trade-mark-modal";
import TrademarkTable from "./trade-mark-table";

import { useState } from "react";
import usePublicSearchByBrand from "@/common/hooks/use-public-search-by-brand";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/@types/@lead";

export default function TradeMarkList() {
  const [searchData, setSearchData] = useState({} as any);
  const [data, setData] = useState({
    raws: []
  });
  const [isOpen, setIsOpen] = useState(false);

  const { data: leadData, refreshData: refreshLeadData } = useLeadCache();
  const { execPublicSearchByBrand, loading, loadingMessage } = usePublicSearchByBrand();


  const openModal = () => {
    setIsOpen(true);
  };

  const handleFormSubmit = async (values: any) => {
    const objectFormated = {
      brand: values.brandSearch,
      isRadical: values.searchType === "exact" ? false : true,
      isInternational: values.searchType === "international" ? true : false,
    };

    refreshLeadData();
    setSearchData(objectFormated);

    if (leadData && leadData.email && leadData.name) {
      const result = await execPublicSearchByBrand({
        brand: values.brandSearch,
        isRadical: values.searchType === "exact" ? false : true,
        isInternational: values.searchType === "international" ? true : false,
        email: leadData.email,
        name: leadData.name,
      });

      setData(result);
      return;
    }

    openModal();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 z-20">
      <TradeMarkForm onSubmit={handleFormSubmit} isDisabled={loading} />
      {
        loading && (
          <p>{loadingMessage}</p>
        )
      }
      {data?.raws && Array.isArray(data.raws) && data.raws.length > 0 && (
        <TrademarkTable data={data.raws} searchData={searchData} />
      )}
      <TradeMarkModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchData={searchData}
        setData={setData}
      />
    </div>
  );
}
