"use client"

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import * as React from "react"

interface ClientPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ClientPagination({ currentPage, totalPages }: ClientPaginationProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1)

  const goToPage = async (page: number) => {
    if (page >= 1 && page <= totalPages && !isLoading) {
      setIsLoading(true)
      await router.push(`/blog?page=${page}`)
      setIsLoading(false)
    }
  }

  return (
    <nav className="flex justify-center items-center space-x-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20"}`}
        aria-label="Previous page"
      >
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ChevronLeft className="w-6 h-6" />}
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => goToPage(number)}
          className={`px-4 py-2 rounded-full ${currentPage === number ? "bg-cyan-400 text-white" : "text-white hover:bg-cyan-400 hover:bg-opacity-20"} ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={isLoading}
        >
          {isLoading && currentPage === number ? <Loader2 className="w-4 h-4 animate-spin" /> : number}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20"}`}
        aria-label="Next page"
      >
        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ChevronRight className="w-6 h-6" />}
      </button>
    </nav>
  )
}