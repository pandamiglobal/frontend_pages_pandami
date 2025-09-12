// Tipos auxiliares compatíveis com Next.js 15
// Referência: PageProps do Next 15 aceita searchParams com valores possivelmente undefined

// Tipo padrão para searchParams em páginas App Router
export type SearchParams = Record<string, string | string[] | undefined>;

// Tipos específicos para páginas com parâmetros dinâmicos
export interface DynamicPageProps {
  params: Record<string, string | string[]>;
  searchParams?: SearchParams;
}

// Uso específico para rota catch-all [...slug]
export interface SlugPageProps {
  params: {
    slug: string[];
  };
  searchParams?: SearchParams;
}