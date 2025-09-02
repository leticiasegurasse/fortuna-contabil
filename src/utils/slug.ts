// Utilitários para geração de slugs

/**
 * Gera um slug a partir de um texto
 * @param text - Texto para converter em slug
 * @returns Slug gerado
 */
export const generateSlug = (text: string): string => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove hífens no início e fim
};

/**
 * Gera um slug único adicionando um contador se necessário
 * @param text - Texto para converter em slug
 * @param existingSlugs - Array de slugs existentes
 * @returns Slug único
 */
export const generateUniqueSlug = (text: string, existingSlugs: string[]): string => {
  let slug = generateSlug(text);
  let counter = 1;
  let uniqueSlug = slug;

  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};

/**
 * Valida se um slug é válido
 * @param slug - Slug para validar
 * @returns true se válido, false caso contrário
 */
export const isValidSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug) && slug.length >= 1 && slug.length <= 200;
};

/**
 * Formata um slug para exibição
 * @param slug - Slug para formatar
 * @returns Slug formatado
 */
export const formatSlug = (slug: string): string => {
  return slug.replace(/-/g, ' ');
};
