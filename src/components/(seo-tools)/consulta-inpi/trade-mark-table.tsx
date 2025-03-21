import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import despachoData from "@/common/lib/mapper-despachos.json";

interface TradeMarkTable {
  data: any;
}

export default function TrademarkTable({ data }: TradeMarkTable) {
  const [formattedData, setFormattedData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error('Invalid data format: expected an array');
      return;
    }

    try {
      const updatedData = data.map((row: any) => {
        if (!row?.despacho?.[0]?.despacho?.[0]?.$?.codigo) {
          return { ...row, situacao: "Não encontrado" };
        }

        const despachoCode = row.despacho[0].despacho[0].$.codigo;
        const matchedDespacho = despachoData.find(
          (d: any) => `IPAS${d.codigo}` === despachoCode
        );
        return {
          ...row,
          situacao: matchedDespacho ? matchedDespacho.titulo : "Não encontrado",
        };
      });
      setFormattedData(updatedData);
    } catch (error) {
      console.error('Error formatting data:', error);
      setFormattedData([]);
    }
  }, [data]);

  const totalPages = Math.ceil(formattedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = formattedData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="rounded-md border border-gray-700/15 mt-5 bg-gray-600/10 w-full overflow-x-auto min-h-[400px]">
      <Table className="w-full relative">
        <TableHeader className="sticky top-0 z-10 bg-white">
          <TableRow className="border-b border-slate-700/5">
            <TableHead className="font-bold text-gray-900 text-sm md:text-base w-[20%]">Marca</TableHead>
            <TableHead className="font-bold text-gray-900 text-sm md:text-base w-[20%]">Situação</TableHead>
            <TableHead className="font-bold text-gray-900 text-sm md:text-base w-[25%]">Titular</TableHead>
            <TableHead className="font-bold text-gray-900 text-sm md:text-base w-[20%]">Data de Inclusão</TableHead>
            <TableHead className="font-bold text-gray-900 text-sm md:text-base w-[15%]">Classe Nice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row: any, index: number) => (
            <TableRow key={index} className="odd:bg-slate-200 even:bg-white border-b border-slate-900/15 hover:bg-slate-700/50 transition-colors">
              <TableCell className="h-16 text-gray-700 text-sm md:text-base">{row.brand}</TableCell>
              <TableCell className="h-16 text-gray-700 text-sm md:text-base">{row.situacao}</TableCell>
              <TableCell className="h-16 text-gray-700 text-sm md:text-base">{row.titular[0].titular[0].$["nome-razao-social"]}</TableCell>
              <TableCell className="h-16 text-gray-700 text-sm md:text-base">{new Date(row.created_at).toLocaleDateString()}</TableCell>
              <TableCell className="h-16 text-gray-700 text-sm md:text-base">{row.classe_nice === null && "--"}{row.classe_nice !== null && `NCL${row.classe_nice[0]['classe-nice'][0].$.codigo}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 px-3 md:px-4">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="h-8 md:h-10 px-2 md:px-3 rounded-md border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 text-sm md:text-base w-full sm:w-auto"
        >
          <option value="5">5 / página</option>
          <option value="10">10 / página</option>
          <option value="25">25 / página</option>
          <option value="50">50 / página</option>
        </select>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="h-8 md:h-10 w-8 md:w-10 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronsLeft className="h-4 md:h-5 w-4 md:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 md:h-10 w-8 md:w-10 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronLeft className="h-4 md:h-5 w-4 md:w-5" />
          </Button>
          <span className="text-sm md:text-base text-slate-300 whitespace-nowrap">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="h-8 md:h-10 w-8 md:w-10 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronRight className="h-4 md:h-5 w-4 md:w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="h-8 md:h-10 w-8 md:w-10 border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-200"
          >
            <ChevronsRight className="h-4 md:h-5 w-4 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
