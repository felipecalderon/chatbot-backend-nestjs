import * as pluralize from 'pluralize';

/**
 * Convierte cada palabra en una cadena de texto a su forma singular.
 * Mantiene los espacios y el orden original de las palabras.
 *
 * @param text El texto a convertir.
 * @returns El texto con las palabras en singular.
 */
export function toSingular(text: string): string {
  if (!text) {
    return '';
  }

  // La librería pluralize funciona principalmente en inglés,
  // pero su regla de 's' al final es un buen punto de partida
  // y se puede extender si es necesario.
  // Por ahora, aplicaremos su lógica por defecto.

  const words = text.split(' ');
  const singularWords = words.map((word) => pluralize.singular(word));

  return singularWords.join(' ');
}
