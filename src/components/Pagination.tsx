import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemName?: string; // Nome do item (ex: "tags", "categorias")
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  itemName = "itens",
  className = ""
}) => {
  if (totalPages <= 1) return null;

  // Função para gerar os números das páginas a serem exibidos
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Se há 5 páginas ou menos, mostra todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas com elipses
      if (currentPage <= 3) {
        // Páginas iniciais: 1, 2, 3, 4, 5
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Páginas finais: totalPages-4, totalPages-3, totalPages-2, totalPages-1, totalPages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Páginas do meio: currentPage-2, currentPage-1, currentPage, currentPage+1, currentPage+2
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div className={`w-full mt-8 flex items-center justify-between ${className}`}>
      {/* Informações da página */}
      <div className="ml-4 text-sm text-neutral-600">
        Página {currentPage} de {totalPages} • {totalItems} {itemName} no total
      </div>

      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-neutral-200 px-4 py-2">
        {/* Botão Anterior */}
        <button
          onClick={() => {
            console.log('Clicou em anterior, página atual:', currentPage, 'nova página:', Math.max(1, currentPage - 1));
            onPageChange(Math.max(1, currentPage - 1));
          }}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
          aria-label="Página anterior"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Números das páginas */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => {
                console.log('Clicou na página:', pageNum, 'página atual:', currentPage);
                onPageChange(pageNum);
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary-500 text-white'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
              aria-label={`Página ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Botão Próximo */}
        <button
          onClick={() => {
            console.log('Clicou em próximo, página atual:', currentPage, 'nova página:', Math.min(totalPages, currentPage + 1));
            onPageChange(Math.min(totalPages, currentPage + 1));
          }}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
          aria-label="Próxima página"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
