/** Validate the trimmed values that the CRM's insert policy receives. */
export function contactValidationError(name: string, message: string): string | null {
  const nameLength = name.trim().length;
  const messageLength = message.trim().length;
  if (nameLength < 2) return 'Veuillez saisir un nom d’au moins 2 caractères.';
  if (nameLength > 200) return 'Le nom ne doit pas dépasser 200 caractères.';
  if (messageLength < 5) return 'Veuillez saisir un message d’au moins 5 caractères, hors espaces au début et à la fin.';
  if (messageLength > 5000) return 'Le message ne doit pas dépasser 5 000 caractères.';
  return null;
}
